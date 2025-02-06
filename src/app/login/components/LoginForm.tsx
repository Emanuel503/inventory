'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"
import { login } from "../utils/actions"
import { useFormStatus } from "react-dom"

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const [state, loginAction] = useActionState(login, undefined);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Ingresa tu email y tus credenciales para acceder al sistema
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={loginAction}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="m@example.com"
                                    required
                                />
                                {state?.errors?.email && (
                                    <div className="grid text-red-500">{state.errors.email}</div>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">No recuerdo mi contraseña? </a>
                                </div>
                                <Input 
                                    id="password"
                                    name="password" 
                                    type="password" 
                                    required 
                                />
                                {state?.errors?.password && (
                                    <div className="grid text-red-500">{state.errors.password}</div>
                                )}
                            </div>
                           <SubmitButton/>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )

    function SubmitButton() {
      const { pending } = useFormStatus();
      return <Button disabled={pending} type="submit" className="w-full">Login</Button>
    }
}
