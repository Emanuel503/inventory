'use server'

import { prisma } from "@/utils/prisma";
import { idSchema } from "./validations";
import { confirmPasswordSchema, namesSchema, passwordSchema, surnamesSchema } from "@/app/administration/users/utils/validations";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "@/app/login/utils/session";

export async function closeSessionAction(prevState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData) as Record<string, string>;
    
    //Validations
    const createSessionSchema = idSchema;
    const validations = createSessionSchema.safeParse(Object.fromEntries(formData))

    if (!validations.success) {
        return {
            success: false,
            message: "Completa todos los campos",
            errors: validations.error.flatten().fieldErrors,
            fields: data
        };
    }

    //Save the model 
    await prisma.sessions.update({
        data: {
        revokedAt: new Date(),
        },
        where: {
            id: Number(validations.data.id)
        }
    });
        
    return { success: true, message: `Sesion cerrada correctamente` }; 
}

export async function editProfileAction(prevState: unknown, formData: FormData){
    const data = Object.fromEntries(formData) as Record<string, string>;

    //Validations
    const createProfileSchema = idSchema
                                    .merge(namesSchema)
                                    .merge(surnamesSchema)
                                    .merge(passwordSchema)
                                    .merge(confirmPasswordSchema);

    const validations = createProfileSchema.safeParse(Object.fromEntries(formData))

    if (!validations.success) {
        return {
            success: false,
            message: "Completa todos los campos",
            errors: validations.error.flatten().fieldErrors,
            fields: data
        };
    }

    const user = await prisma.users.findUnique({
        where: {
            id: Number(validations.data.id)
        }
    })

    if (!user) {
        return {
            success: false,
            message: "Usuario no encontrado",
            errors: { id: ["Usuario no encontrado"] },
            fields: data
        };
    }

    //Valida que las contraseñas coincidan
    if(validations.data.password !== validations.data.confirm_password){
        return {
            success: false,
            message: "Las contraseñas no coinciden",
            errors: { confirm_password: ["Las contraseñas no coinciden"] },
            fields: data
        };
    }
    
    let hashedPassword = null;
    if(validations.data.password){
        hashedPassword = await bcrypt.hash(validations.data.password, 10);
    }else{
        hashedPassword = user.password;
    }
    
    //Actualiza la cookie de session
    const cookie = (await cookies()).get("session")?.value;
    const session = cookie ? await decrypt(cookie): null;

    const expiresAt = new Date(session!.expiresAt);

    if (session) {
        const encryptSession = await encrypt({
            ...session,
            user: {
                ...session.user,
                surnames: validations.data.surnames,
                names: validations.data.names,
                password: hashedPassword
            }
        });

        (await cookies()).set("session", encryptSession, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
        });

         await prisma.sessions.update({
            where: {
                token: cookie
            },
            data: {
                token: encryptSession
            }
        })
    }

    const file = formData.get('image') as File;
    console.log(file);
    

    //Save the model
    await prisma.users.update({
        data: {
            surnames: validations.data.surnames,
            names: validations.data.names,
            password: hashedPassword
        },
        where: {
            id: Number(validations.data.id)
        }
    })

    return { success: true, message: `Perfil modificado correctamente` }; 
}