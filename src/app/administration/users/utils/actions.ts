"use server";

import { prisma } from "@/utils/prisma";
import { emailSchema, enabledSchema, idRolSchema, idSchema, namesSchema, surnamesSchema, usernameSchema } from "./validations";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateSecurePassword } from "@/utils/functions";
import { sendEmail } from "@/utils/serverFunctions";
import { buildCreatedUserEmail } from "@/emails/buildEmails";

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

    const generatedPassword = generateSecurePassword();
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    //Save the model 
    const user = await prisma.users.create({
        data: {
            ...validations.data,
            idRol: role.id,
            enabled: validations.data?.enabled ? true : false,
            password: hashedPassword
        },
    });


    //Send Email
    const to = [{
        name: `${validations.data.names} ${validations.data.surnames}`,
        email: validations.data.email
    }];

    const { subject, htmlContent } = buildCreatedUserEmail({...user, password: generatedPassword});

    try{
        await sendEmail(subject, htmlContent, to)
    }catch(error){
        console.error(JSON.stringify(error))
    }

    return { success: true, message: `Usuario "${validations.data.username}" creado correctamente` }; 
}

export async function desactiveUserAction(prevState: unknown, formData: FormData){

    const createUserSchema = idSchema;
    const validations = createUserSchema.safeParse(Object.fromEntries(formData))

    if (!validations.success) {
        return {
            success: false,
            message: "Completa todos los campos",
            errors: validations.error.flatten().fieldErrors,
        };
    }

    const existingUser = await prisma.users.findUnique({
        where: { id: Number(validations.data.id) },
    });

    if (!existingUser) {
        return {
            success: false,
            message: `No se encontrol el usuario`,
            errors: null,
        };
    }
    
    //Desactive the model 
    await prisma.users.update({
        data:{
            enabled: false
        },
        where: { id: Number(validations.data.id)}
    })

    await prisma.sessions.updateMany({
        where: { 
            idUser: Number(validations.data.id) 
        },
        data: { 
            revokedAt: new Date() 
        }
    })
        
    return { success: true, message: `Usuario desactivado correctamente` }; 
}

export async function deleteUserAction(prevState: unknown, formData: FormData){

    const createUserSchema = idSchema;
    const validations = createUserSchema.safeParse(Object.fromEntries(formData))

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

    const existingUser = await prisma.users.findUnique({
        where: { id: Number(validations.data.id) },
    });

    if (!existingUser) {
        return {
            success: false,
            message: `No se encontrol el usuario`,
            errors: null,
        };
    }
    
    //Delete the model 
    try{
        await prisma.$transaction(async () => {
            await prisma.sessions.deleteMany({
                where: { idUser: Number(validations.data.id)}
            })

            await prisma.users.delete({
                where: { id: Number(validations.data.id)}
            })
        });
    }catch(error: unknown){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') {
                console.error(error.message)
                return {
                    success: false,
                    message: `No se puede eliminar el usuario, esta siendo utilizado`,
                    errors: {
                        delete: true
                    },
                };
            }
        }
    }
        
    return { success: true, message: `Usuario "${existingUser.username}" eliminado correctamente` }; 
}

export async function editUserAction(prevState: unknown, formData: FormData) {

    const data = Object.fromEntries(formData) as Record<string, string>;

    //Validations
    const createUserSchema = namesSchema
                                .merge(surnamesSchema)
                                .merge(emailSchema)
                                .merge(usernameSchema)
                                .merge(idRolSchema)
                                .merge(enabledSchema)
                                .merge(idSchema);

    const validations = createUserSchema.safeParse(Object.fromEntries(formData))

    if (!validations.success) {
        return {
            success: false,
            message: "Completa todos los campos",
            errors: validations.error.flatten().fieldErrors,
        };
    }

    const existingUserEmail = await prisma.users.findFirst({
        where: { email: validations.data.email },
    });

    if (existingUserEmail && existingUserEmail.id !== Number(validations.data.id)) {
        return {
            success: false,
            message: `El email "${validations.data.email}" ya existe.`,
            errors: null,
            fields: data
        };
    }

    const existingUserUsername = await prisma.users.findFirst({
        where: { username: validations.data.username },
    });

    if (existingUserUsername && existingUserUsername.id !==  Number(validations.data.id)) {
        return {
            success: false,
            message: `El nombre de usuario "${validations.data.username}" ya existe.`,
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

    //Update the model 
    await prisma.users.update({
        data: {
            names: validations.data.names,
            surnames: validations.data.surnames,
            username: validations.data.username,
            email: validations.data.email,
            idRol: role.id,
            enabled: validations.data?.enabled ? true : false
        },
        where: { id: Number(validations.data.id)}
    });
        
    return { success: true, message: `Usuario "${validations.data.username}" modificado correctamente` }; 
}