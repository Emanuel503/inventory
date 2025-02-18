"use server";

import { descriptionSchema, idSchema, rolSchema } from "./validations";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function saveRolAction(prevState: unknown, formData: FormData) {
    
    //Validations
    const createUserSchema = rolSchema.merge(descriptionSchema);
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

export async function editRolAction(prevState: unknown, formData: FormData) {

    //Validations
    const createUserSchema = rolSchema.merge(descriptionSchema).merge(idSchema);
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

    if (existingRole && existingRole.id !== Number(validations.data.id)) {
        return {
            success: false,
            message: `El rol "${validations.data.rol}" ya existe.`,
            errors: null,
        };
    }
    
    //Update the model 
    await prisma.roles.update({
        data: {
        name: validations.data.rol,
        description: validations.data.description,
        },
        where: { id: Number(validations.data.id)}
    });

    await prisma.$disconnect();
        
    return { success: true, message: `Rol "${validations.data.rol}" modificado correctamente` }; 
}

export async function deleteRolAction(prevState: unknown, formData: FormData) {

    //Validations
    const createUserSchema = idSchema;
    const validations = createUserSchema.safeParse(Object.fromEntries(formData))

    if (!validations.success) {
        return {
            success: false,
            message: "Completa todos los campos",
            errors: validations.error.flatten().fieldErrors,
        };
    }

    const existingRole = await prisma.roles.findUnique({
        where: { id: Number(validations.data.id) },
    });

    if (!existingRole) {
        return {
            success: false,
            message: `No se encontrol el rol`,
            errors: null,
        };
    }
    
    //Update the model 
    await prisma.roles.delete({
        where: { id: Number(validations.data.id)}
    });

    await prisma.$disconnect();
        
    return { success: true, message: `Rol "${existingRole.name}" eliminado correctamente` }; 
}