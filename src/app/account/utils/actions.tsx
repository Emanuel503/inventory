'use server'

import { prisma } from "@/utils/prisma";
import { idSchema } from "./validations";
import { confirmPasswordSchema, idUserSchema, imageSchema, namesSchema, passwordSchema, surnamesSchema } from "@/app/administration/users/utils/validations";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "@/app/login/utils/session";
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

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
                                    .merge(confirmPasswordSchema)
                                    .merge(imageSchema);

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

    const file = formData.get('image') as File;
    let filepath = '';
    let filename = '';

    if (file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const MAX_SIZE = 2 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return {
                success: false,
                message: "El archivo supera el tamaño máximo de 2 MB",
                errors: { image: ["El archivo supera el tamaño máximo de 2 MB"] },
                fields: data
            };
        }

        if(user.image){
            const oldImagePath = path.join(process.cwd(), 'public/uploads/profile', user.image);
            await fs.unlink(oldImagePath);
        }

        const uploadPath = path.join(process.cwd(), 'public', 'uploads', 'profile');
        await fs.mkdir(uploadPath, { recursive: true });
    
        filename = `${Date.now()}-${file.name}`;
        filepath = path.join(uploadPath, filename);
    
        await fs.writeFile(filepath, buffer);
    
        revalidatePath('/upload-image');
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
                password: hashedPassword,
                image: filename ? filename : user.image
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

    //Save the model
    await prisma.users.update({
        data: {
            surnames: validations.data.surnames,
            names: validations.data.names,
            password: hashedPassword, 
            image:filename ? filename : user.image
        },
        where: {
            id: Number(validations.data.id)
        }
    })

    return { success: true, message: `Perfil modificado correctamente` }; 
}

export async function editNotificationsConfigAction(prevState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData) as Record<string, string>;

    //Validations
    const createProfileSchema = idUserSchema;

    const validations = createProfileSchema.safeParse(Object.fromEntries(formData))

    if (!validations.success) {
        return {
            success: false,
            message: "Completa todos los campos",
            errors: validations.error.flatten().fieldErrors,
            fields: data
        };
    }

    const notificationsConfigure = await prisma.notificationsConfigure.findUnique({
        where: {
            idUser: Number(validations.data.idUser)
        }
    });

    const dataObjet = {
        idUser: Number(validations.data.idUser),
        emailSessions: formData.get('emailSessions') === 'on',
        passwordChange: formData.get('passwordChange') === 'on',
        updatesSystem: formData.get('updatesSystem') === 'on'
    }

    //Save the model
    if (!notificationsConfigure) {
        await prisma.notificationsConfigure.create({
            data: dataObjet
        });
    }else{
        await prisma.notificationsConfigure.update({
            data: dataObjet,
            where: {
                idUser: Number(validations.data.idUser)
            }
        });
    }

    return { success: true, message: `Preferencias de notificaciones modificado correctamente` }; 
}