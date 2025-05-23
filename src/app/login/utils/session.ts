import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SessionPayload } from "@/app/types";
import { Users } from "@prisma/client";
import { headers } from "next/headers";
import { UAParser } from 'ua-parser-js';
import { prisma } from '@/utils/prisma'

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
    })
}

export async function deleteSession() {

  const session = (await cookies()).get("session");

  await prisma.sessions.update({
    where: {
      token: session!.value
    },
    data: {
      revokedAt: new Date()
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