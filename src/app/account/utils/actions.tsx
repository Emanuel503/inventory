'use server'

import { prisma } from "@/utils/prisma";
import { idSchema } from "./validations";

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