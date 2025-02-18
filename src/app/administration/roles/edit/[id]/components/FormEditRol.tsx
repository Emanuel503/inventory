'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Title } from '@/components/ui/title'
import { Roles } from '@prisma/client'
import Link from 'next/link'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { editRolAction } from '../../../add/utils/actions'
import { useRouter } from 'next/navigation'
import RequiredField from '@/app/components/RequiredField'

export default function FormEditRol({rol}: {rol: Roles}) {

    const [state, formAction, pending] = useActionState(editRolAction, { success: false, message: "", errors: undefined });
    const router = useRouter();
    
    useEffect(() => {
      if (state.success) {
        toast.success(`${state.message}`, {
          closeButton: true,
          description: `Fecha de modificación ${new Date().toLocaleString()}`,
        });

        router.push("/administration/roles")
      }else if(!state.success && state.errors !== undefined){
        toast.warning(`${state.message}`, {
          closeButton: true,
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return (
        <>
            <Title>Editar rol</Title>

            <form action={formAction}>
                <Card>
                    <CardHeader>
                        <CardDescription>Editar el rol: {rol.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <input name='id' defaultValue={rol.id} hidden/>

                            <div className="flex flex-col space-y-1.5">
                                <Label>
                                    Nombre 
                                    <RequiredField/>
                                </Label>
                                <Input type="text" name='rol' placeholder="Rol" defaultValue={rol.name}/>
                                {state?.errors?.rol && (
                                    <div className="grid text-red-500">{state.errors.rol}</div>
                                )}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label>
                                    Descripción 
                                    <RequiredField/>
                                </Label>
                                <Textarea name='description' maxLength={255} placeholder="Escribe una descripcion del rol" defaultValue={rol.description} />
                                {state?.errors?.description && (
                                    <div className="grid text-red-500">{state.errors.description}</div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button asChild variant="outline">
                            <Link href='/administration/roles'>Cancelar</Link>
                        </Button>
                        <Button disabled={pending}>Modificar</Button>
                    </CardFooter>
                </Card>
            </form>
        </>
    )
}
