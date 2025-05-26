'use client'

import { editUserAction } from '@/app/administration/users/utils/actions';
import RequiredField from '@/app/components/RequiredField'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner';

export default function FormEditProfile() {

  const [state, formAction, pending] = useActionState(editUserAction, { success: false, message: "", errors: undefined });

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
    <>
      <form action={formAction}>          
        <div className="grid w-full items-center gap-4">
          <input name='id'hidden/>

          <div className="flex flex-col space-y-1.5">
              <Label>
                Nombre
                <RequiredField/>
              </Label>
              <Input type="text" name='names' placeholder="Emanuel Jose"/>
              {state?.errors?.names && (
                <div className="grid text-red-500">{state?.errors?.names}</div>
              )}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>
              Apellidos 
              <RequiredField/>
            </Label>
            <Input type="text" name='surnames' placeholder="Molina Zúniga" />
            {state?.errors?.surnames && (
              <div className="grid text-red-500">{state.errors.surnames}</div>
            )}
          </div>

          <div className='bg-gray-300 opacity-50 w-40 h-52 hover:opacity-90 flex items-center justify-center'>
            Subir foto
          </div>

          <div className="flex flex-col space-y-1.5">
              <Label>
                Contraseña 
              </Label>
              <Input type="text" name='password' />
              {state?.errors?.surnames && (
                  <div className="grid text-red-500">{state.errors.surnames}</div>
              )}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>
              Confirmar contraseña 
            </Label>
            <Input type="text" name='confirm_password'/>
            {state?.errors?.surnames && (
              <div className="grid text-red-500">{state.errors.surnames}</div>
            )}
          </div>


          <div className="flex justify-between mt-10">
            <Button disabled={pending}>Guardar cambios</Button>
          </div>
        </div>
      </form>
    </>
  )
}
