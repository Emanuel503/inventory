'use server'

import { codeSchema, idUserSchema } from "@/app/administration/users/utils/validations";
import { updateSession } from "@/app/login/utils/session";
import { prisma } from "@/utils/prisma";

export async function twoFactorAuth(prevState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData) as Record<string, string>;
    
    //Validations
    const createSecuritySchema = idUserSchema.merge(codeSchema);

    const validations = createSecuritySchema.safeParse(Object.fromEntries(formData))

    if (!validations.success) {
        return {
            success: false,
            message: "Completa todos los campos",
            errors: validations.error.flatten().fieldErrors,
            fields: data
        };
    }

    
    let user = await prisma.users.findUnique({
        where: {
            id: Number(validations.data.idUser),
            twoFactorCode: validations.data.code
        }
    })

    if(!user){
        return {
            success: false,
            message: `El codigo de confirmación es incorrecto`,
            errors: {
                code: ["El codigo de confirmación es incorecto"]
            },
            fields: data
        };
    }

    user = await prisma.users.update({
        data: {
            twoFactorCode: null,
            twoFactorConfirm: new Date()
        },
        where: {
            id: Number(validations.data.idUser)
        }
    });

    await updateSession(user);

    return { success: true, message: `Confirmación de doble autenticacion correctamente` }; 
}