"use server";

import { descriptionSchema, rolSchema } from "./validations";
import { PrismaClient } from "@prisma/client";

const createUserSchema = rolSchema.merge(descriptionSchema);
const prisma = new PrismaClient()

export async function saveUserAction(prevState: unknown, formData: FormData) {

    //Validations
    const validations = createUserSchema.safeParse(Object.fromEntries(formData))

    if (!validations.success) {
        return {
            success: false,
            message: "Completa todos los campos",
            errors: validations.error.flatten().fieldErrors,
        };
    }

    const existingRole = await prisma.roles.findFirst({
        where: { name: validations.data.rol },
    });

    if (existingRole) {
        return {
            success: false,
            message: `El rol "${validations.data.rol}" ya existe.`,
            errors: null,
        };
    }

    //Save the model 
    await prisma.roles.create({
        data: {
        name: validations.data.rol,
        description: validations.data.description,
        },
    });

    await prisma.$disconnect();
        
    return { success: true, message: `Rol "${validations.data.rol}" creado correctamente` }; 
}