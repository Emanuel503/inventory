'use client'

import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Users } from "@prisma/client"
import { useActionState, useEffect } from "react";
import { twoFactorAuth } from "../utils/actions";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";

interface Form2faProps{
    user: Users
}

export default function Form2fa({user}: Form2faProps) {
    const [state, formAction, pending] = useActionState(twoFactorAuth, { success: false, message: "", errors: undefined });
    const router = useRouter();

    useEffect(() => {
        if (user.twoFactorConfirm) {
            router.push('/dashboard')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.twoFactorConfirm]);

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
