"use server";

import { emailSchema, passwordSchema } from "../validations/zod";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";
import { prisma } from '@/utils/prisma'
import bcrypt from "bcrypt";

const loginSchema = emailSchema.merge(passwordSchema);

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const user = await prisma.users.findUnique({
    where: {
      email: email
    }
  })

  if(!user){
    return {
      errors: {
        email: ["El correo ingresado no existe"],
      },
    };
  }
    
  const hashedPassword = await bcrypt.compare(password, user.password);

  if(hashedPassword){

    //Verifica si el usuario esta activo
    if(!user.enabled){
      return {
        errors: {
          email: ["El usuario no esta activo"],
        },
      };
    }

    //Confirmacion de correo
    if(!user.confirmedEmail){
      await prisma.users.update({
        data: {
          confirmedEmail: new Date()
        },
        where: {
          id: user.id
        }
      });
    }

    const menus = await prisma.access.findMany({
      include: {
        menu:{
          select:{
            url: true
          }
        }
      },
      where: {
        idRol: user?.idRol
      }
    })
    
    const access = menus.map((menu) => menu.menu.url);
  
    await createSession(user, access);
        
    redirect("/dashboard");
  }else{
    return {
      errors: {
        email: ["Correo o contraseña incorrectos"],
      },
    };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}