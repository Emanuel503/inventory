'use client'

import { changePasswordFirstLoginAction } from "@/app/account/utils/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "@prisma/client"
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface ChangePasswordAlertProps{
    user: Users
}

export default function ChangePasswordAlert({user}: ChangePasswordAlertProps) {

    const [state, formAction, pending] = useActionState(changePasswordFirstLoginAction, { success: false, message: "", errors: undefined });

    useEffect(() => {
        if (state.success) {
        toast.success(`${state.message}`, {
            closeButton: true,
            description: `Fecha de modificación ${new Date().toLocaleString()}`,
        });

        }else if(!state.success && state.errors !== undefined){
        toast.warning(`${state.message}`, {
            closeButton: true,
        });
        }
    }, [state]);

    return (
        <AlertDialog defaultOpen={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Cambio de contraseña</AlertDialogTitle>
                    <AlertDialogDescription>Debes cambiar tu contraseña</AlertDialogDescription>
                </AlertDialogHeader>
                <form action={formAction}>
                    <input type="hidden" name="id" defaultValue={user.id} />

                    <div className="grid w-full items-center gap-4 my-5">
                        <div className="flex flex-col space-y-1.5">
                            <Label>
                                Contraseña actual 
                            </Label>
                            <Input type="password" name='oldPassword' />
                            {state?.errors?.oldPassword && (
                                <div className="grid text-red-500">{state.errors.oldPassword}</div>
                            )}
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label>
                                Contraseña nueva
                            </Label>
                            <Input type="password" name='password' />
                            {state?.errors?.password && (
                                <div className="grid text-red-500">{state.errors.password}</div>
                            )}
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label>
                                Confirmar contraseña 
                            </Label>
                            <Input type="password" name='confirm_password'/>
                            {state?.errors?.confirm_password && (
                                <div className="grid text-red-500">{state.errors.confirm_password}</div>
                            )}
                        </div>
                        <div className="flex justify-between mt-5">
                            <Button className="w-full" disabled={pending}>Guardar cambios</Button>
                        </div>
                    </div>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
