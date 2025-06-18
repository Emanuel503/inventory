"server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SessionPayload } from "@/app/types";
import { Users } from "@prisma/client";
import { headers } from "next/headers";
import { UAParser } from 'ua-parser-js';
import { prisma } from '@/utils/prisma'
import { buildLoginEmail, buildTwoFactorAuthEmail } from "@/emails/buildEmails";
import { sendEmail } from "@/utils/serverFunctions";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(user: Users, access: string[]) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ user, expiresAt, access });

    (await cookies()).set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });
    
    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';
    const ua = (await headers()).get('user-agent') ?? 'unknown';
    const uaParser = new UAParser();
    const userAgent = uaParser.setUA(ua).getResult();
    const device = `${userAgent.device.model ? userAgent.device.model : ""} ${userAgent.os.name ? userAgent.os.name : ""}`.trim()
    
    await prisma.sessions.create({
      data: {
        idUser: user.id,
        ipAddress: ip,
        userAgent: JSON.stringify(userAgent),
        device: device,
        token: session,
        expiresAt: expiresAt
      }
    });

    const notificationsConfigure = await prisma.notificationsConfigure.findUnique({
      select: {
        emailSessions: true
      },
      where: {
        idUser: user.id
      }
    });

    //Envio de notificacion de correo
    if(notificationsConfigure === null || notificationsConfigure.emailSessions){
      const to = [{
          name: `${user.names} ${user.surnames}`,
          email: user.email
      }];

      const fechaActual = new Date()
      const datos = {
        username: user.username, 
        names: user.names, 
        surnames: user.surnames, 
        email: user.email, 
        ip: ip, 
        navegador: userAgent.browser.toString(), 
        sistema: device,
        fecha: fechaActual.toLocaleDateString()
      }

      const { subject, htmlContent } = buildLoginEmail(datos);
  
      try{
          await sendEmail(subject, htmlContent, to)
      }catch(error){
          console.error(JSON.stringify(error))
      }
    }
}

export async function updateSession(user: Users){

    const cookie = (await cookies()).get("session")!.value;
    const session = await decrypt(cookie);

    //Actualizar cookie
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const updatedToken = await encrypt({ user, expiresAt, access: session!.access });

    (await cookies()).set("session", updatedToken, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });

    //Actualizar la sesion de la base
    const sessionDb = await prisma.sessions.update({
      data: {
        token: updatedToken,
        expiresAt: expiresAt
      },
      where:{
        token: cookie
      }
    });

    const notificationsConfigure = await prisma.notificationsConfigure.findUnique({
      select: {
        emailSessions: true
      },
      where: {
        idUser: user.id
      }
    });

    //Envio de notificacion de correo
    if(notificationsConfigure === null || notificationsConfigure.emailSessions){
      const to = [{
          name: `${user.names} ${user.surnames}`,
          email: user.email
      }];

      const fechaActual = new Date()
      const uaParser = new UAParser();
      const userAgent = uaParser.setUA(sessionDb.userAgent).getResult();

      const datos = {
        username: user.username, 
        names: user.names, 
        surnames: user.surnames, 
        email: user.email, 
        ip: sessionDb.ipAddress, 
        navegador: userAgent.browser.toString(), 
        sistema: sessionDb.device ?? 'Desconocido',
        fecha: fechaActual.toLocaleDateString()
      }

      const { subject, htmlContent } = buildLoginEmail(datos);
  
      try{
          await sendEmail(subject, htmlContent, to)
      }catch(error){
          console.error(JSON.stringify(error))
      }
    }
}

export async function deleteSession() {

  const token = (await cookies()).get("session");
  const session = token ? await decrypt(token.value) : null;

  await prisma.sessions.update({
    where: {
      token: token!.value
    },
    data: {
      revokedAt: new Date(),
    }
  });
  
  await prisma.users.update({
    data: {
      twoFactorConfirm: null,
      twoFactorCode: null,
    },
    where: {
      id: session!.user.id
    }
  });
  
  (await cookies()).delete("session");
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {    
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.error(`Failed to verify session ${error}`);
  }
}

export async function createSessionTwoFactorAuth(user: Users) {
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutos
    const session = await encrypt({ user, expiresAt, access: [] });

    (await cookies()).set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });

    const code = Math.floor(100000 + Math.random() * 900000);

    await prisma.users.update({
      data: {
        twoFactorCode: String(code),
        twoFactorConfirm: null
      },
      where: {
        id: user.id
      }
    })

    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';
    const ua = (await headers()).get('user-agent') ?? 'unknown';
    const uaParser = new UAParser();
    const userAgent = uaParser.setUA(ua).getResult();
    const device = `${userAgent.device.model ? userAgent.device.model : ""} ${userAgent.os.name ? userAgent.os.name : ""}`.trim()
    
    await prisma.sessions.create({
      data: {
        idUser: user.id,
        ipAddress: ip,
        userAgent: JSON.stringify(userAgent),
        device: device,
        token: session,
        expiresAt: expiresAt
      }
    });
    
    //Envio de codigo de doble autenticacion
    const to = [{
        name: `${user.names} ${user.surnames}`,
        email: user.email
    }];
    
    const fechaActual = new Date()
    const datos = {
      username: user.username, 
      names: user.names, 
      surnames: user.surnames, 
      email: user.email, 
      code: code, 
      fecha: fechaActual.toLocaleDateString()
    }

    const { subject, htmlContent } = buildTwoFactorAuthEmail(datos);

    try{
        await sendEmail(subject, htmlContent, to)
    }catch(error){
        console.error(JSON.stringify(error))
    }
}