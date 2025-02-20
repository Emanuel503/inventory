'use client'

import RequiredField from '@/app/components/RequiredField'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Title } from '@/components/ui/title'
import { Label } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { useActionState, useEffect } from 'react'
import { saveRolAction } from '../utils/actions'
import { toast } from 'sonner'
import { useRouter } from "next/navigation";

export default function RolAdd() {

    const [state, formAction, pending] = useActionState(saveRolAction, { success: false, message: "", errors: undefined, fields: undefined });
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
              <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label>
                      Nombre 
                      <RequiredField/>
                    </Label>
                    <Input type="text" name='rol' placeholder="Rol" defaultValue={state.fields?.rol} />
                    {state?.errors?.rol && (
                        <div className="grid text-red-500">{state.errors.rol}</div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>
                      Descripción 
                      <RequiredField/>
                    </Label>
                    <Textarea name='description' maxLength={255} placeholder="Escribe una descripcion del rol" defaultValue={state.fields?.description}/>
                    {state?.errors?.description && (
                        <div className="grid text-red-500">{state.errors.description}</div>
                    )}
                  </div>
              </div>
              <div className="flex justify-between mt-10">
                  <Button asChild variant="outline">
                    <Link href='/administration/roles'>Cancelar</Link>
                  </Button>
                  <Button disabled={pending}>Guardar</Button>
              </div>
          </form>
        </>
    )
}
