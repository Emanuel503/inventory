"use server";

import { prisma } from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import { idMenuSchema, idRolSchema, idSchema } from "./validations";

export async function saveAccessAction(prevState: unknown, formData: FormData) {
    
    const data = Object.fromEntries(formData) as Record<string, string>;

    //Validations
    const createAccessSchema = idRolSchema.merge(idMenuSchema);

    const validations = createAccessSchema.safeParse(Object.fromEntries(formData))

    if (!validations.success) {
        return {
            success: false,
            message: "Completa todos los campos",
            errors: validations.error.flatten().fieldErrors,
            fields: data
        };
    }

    const existingAcceso = await prisma.access.findFirst({
        where: { 
            idRol: Number(validations.data.idRol), 
            idMenu: Number(validations.data.idMenu) 
        },
    });

    if (existingAcceso) {
        return {
            success: false,
            message: `El acceso ya existe.`,
            errors: {
                email: ["El acceso ya existe"]
            },
            fields: data
        };
    }

    const role = await prisma.roles.findFirst({
        where: { id: Number(validations.data.idRol) },
    });

    if(!role){
        return {
            success: false,
            message: `El rol ingresado no existe`,
            errors: {
                idRol: ["El rol ingresado no existe"]
            },
            fields: data
        };
    }

    const menu = await prisma.menus.findFirst({
        where: { id: Number(validations.data.idMenu) },
    });

    if(!menu){
        return {
            success: false,
            message: `El menu ingresado no existe`,
            errors: {
                idRol: ["El menu ingresado no existe"]
            },
            fields: data
        };
    }

    //Save the model 
    await prisma.access.create({
        data: {
            ...validations.data,
            idMenu: menu.id,
            idRol: role.id
        },
    });

    return { success: true, message: `Acceso creado correctamente` }; 
}

export async function deleteAccessAction(prevState: unknown, formData: FormData){

    const createAccessSchema = idSchema;
    const validations = createAccessSchema.safeParse(Object.fromEntries(formData))

    if (!validations.success) {
        return {
            success: false,
            message: "Completa todos los campos",
            errors: { 
                ...validations.error.flatten().fieldErrors,
                delete: false
            }
        };
    }

    const existingAccess = await prisma.access.findUnique({
        where: { id: Number(validations.data.id) },
    });

    if (!existingAccess) {
        return {
            success: false,
            message: `No se encontrol el acceso`,
            errors: null,
        };
    }
    
    //Delete the model 
    try{
        await prisma.access.delete({
            where: { id: Number(validations.data.id)}
        })
    }catch(error: unknown){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') {
                console.error(error.message)
                return {
                    success: false,
                    message: `No se puede eliminar el acceso, esta siendo utilizado`,
                    errors: {
                        delete: true
                    },
                };
            }
        }
    }
        
    return { success: true, message: `Acceso eliminado correctamente` }; 
}

export async function editAccessAction(prevState: unknown, formData: FormData) {

    const data = Object.fromEntries(formData) as Record<string, string>;

    //Validations
    const createAccessSchema = idMenuSchema
                                .merge(idRolSchema)
                                .merge(idSchema);

    const validations = createAccessSchema.safeParse(Object.fromEntries(formData))

    if (!validations.success) {
        return {
            success: false,
            message: "Completa todos los campos",
            errors: validations.error.flatten().fieldErrors,
        };
    }

    const existingAccess = await prisma.access.findFirst({
        where: { 
            idRol: Number(validations.data.idRol), 
            idMenu: Number(validations.data.idMenu) },
    });

    if (existingAccess && existingAccess.id !== Number(validations.data.id)) {
        return {
            success: false,
            message: `El acceso ya existe.`,
            errors: null,
            fields: data
        };
    }

    const role = await prisma.roles.findFirst({
        where: { id: Number(validations.data.idRol) },
    });

    
    if(!role){
        return {
            success: false,
            message: `El rol ingresado no existe`,
            errors: null,
            fields: data
        };
    }

    const menu = await prisma.menus.findFirst({
        where: { id: Number(validations.data.idMenu) },
    });

    if(!menu){
        return {
            success: false,
            message: `El menu ingresado no existe`,
            errors: {
                idRol: ["El menu ingresado no existe"]
            },
            fields: data
        };
    }

    //Update the model 
    await prisma.access.update({
        data: {
            idMenu: menu.id,
            idRol: role.id,
        },
        where: { id: Number(validations.data.id)}
    });
        
    return { success: true, message: `Acceso modificado correctamente` }; 
}