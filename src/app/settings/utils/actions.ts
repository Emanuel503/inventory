'use server'

import { prisma } from "@/utils/prisma";

export async function editSystemConfigAction(prevState: unknown, formData: FormData){
    await prisma.systemConfigure.update({
        data: {
            twofactoreRequired: formData.get('twofactoreRequired') === 'on',
        },
        where: {
            id: 1
        }
    })

    return { success: true, message: `Configuracion del sistema modificada correctamente`, errors: undefined }; 
}