'use client'

import RequiredField from '@/app/components/RequiredField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Title } from '@/components/ui/title'
import { Label } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { useActionState, useEffect } from 'react'
import { saveUserAction } from './utils/actions'
import { toast } from 'sonner'
import { useRouter } from "next/navigation";

export default function RolAdd() {

    const [state, formAction, pending] = useActionState(saveUserAction, { success: false, message: "", errors: undefined });
    const router = useRouter();
    
    useEffect(() => {
      if (state.success) {
        toast.success(`${state.message}`, {
          closeButton: true,
          description: `Fecha de creación ${new Date().toLocaleString()}`,
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
          <Title>Agregar rol</Title>

          <form action={formAction}>
              <Card>
                <CardHeader>
                    <CardDescription>Agregar un nuevo rol</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label>
                            Nombre 
                            <RequiredField/>
                          </Label>
                          <Input type="text" name='rol' placeholder="Rol" />
                          {state?.errors?.rol && (
                              <div className="grid text-red-500">{state.errors.rol}</div>
                          )}
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <Label>
                            Descripción 
                            <RequiredField/>
                          </Label>
                          <Textarea name='description' maxLength={255} placeholder="Escribe una descripcion del rol" />
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
                    <Button disabled={pending}>Guardar</Button>
                </CardFooter>
              </Card>
          </form>
        </>
    )
}
