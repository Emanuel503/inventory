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
        include: {
            children: true
        }
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

    const submenus = menu.children.map((menu) => ({
        idMenu: menu.id,
        idRol: role.id,
    }))

    await prisma.access.createMany({
        data: submenus,
    })

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

        const submenus = await prisma.menus.findMany({
            where: {
                idFather: existingAccess.idMenu
            }
        })

        const idsSubmenus = submenus.map((menu) => (menu.id))

        await prisma.access.deleteMany({
            where: {
                idMenu: {
                    in: idsSubmenus
                }
            }
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