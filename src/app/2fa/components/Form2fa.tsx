'use client'

import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Users } from "@prisma/client"
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { twoFactorAuth } from "../utils/actions";
import { REGEXP_ONLY_DIGITS } from "input-otp";

interface Form2faProps{
    user: Users
}

export default function Form2fa({user}: Form2faProps) {
    const [state, formAction, pending] = useActionState(twoFactorAuth, { success: false, message: "", errors: undefined });

    useEffect(() => {
        if (state.success) {
            toast.success(`${state.message}`, {
                closeButton: true,
                description: `Fecha de confirmación ${new Date().toLocaleString()}`,
            });

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 500)
        }
    }, [state]);

    return (
        <form action={formAction} className="flex flex-col items-center justify-center">
            <input type="hidden" name="idUser" defaultValue={user.id}/>
            <div className="my-10">
                <InputOTP name="code" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
                </InputOTP>
            </div>

            {state?.errors?.code && (
                <div className="grid text-red-500">{state.errors.code}</div>
            )}

            <Button disabled={pending} className="mt-10 w-full">Verificar</Button>
        </form>
    )
}
