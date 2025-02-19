"use server";

import { PrismaClient } from "@prisma/client";
import { emailSchema, enabledSchema, idRolSchema, namesSchema, surnamesSchema, usernameSchema } from "./validations";

const prisma = new PrismaClient()

export async function saveUserAction(prevState: unknown, formData: FormData) {
    
    const data = Object.fromEntries(formData) as Record<string, string>;

    //Validations
    const createUserSchema = namesSchema
                                .merge(surnamesSchema)
                                .merge(emailSchema)
                                .merge(usernameSchema)
                                .merge(idRolSchema)
                                .merge(enabledSchema);

    const validations = createUserSchema.safeParse(Object.fromEntries(formData))

    if (!validations.success) {
        return {
            success: false,
            message: "Completa todos los campos",
            errors: validations.error.flatten().fieldErrors,
            fields: data
        };
    }

    const existingUserEmail = await prisma.users.findFirst({
        where: { email: validations.data.email },
    });

    if (existingUserEmail) {
        return {
            success: false,
            message: `El email "${validations.data.email}" ya existe.`,
            errors: {
                email: ["El email ya existe"]
            },
            fields: data
        };
    }

    const existingUserUsername = await prisma.users.findFirst({
        where: { username: validations.data.username },
    });

    if (existingUserUsername) {
        return {
            success: false,
            message: `El nombre de usuario "${validations.data.username}" ya existe.`,
            errors: {
                username: ["El nombre de usuario ya existe"]
            },
            fields: data
        };
    }

    //Save the model 
    await prisma.users.create({
        data: {
            ...validations.data,
            idRol: Number(validations.data.idRol),
            enabled: validations.data?.enabled ? true : false
        },
    });

    await prisma.$disconnect();
        
    return { success: true, message: `Usuario "${validations.data.username}" creado correctamente` }; 
}