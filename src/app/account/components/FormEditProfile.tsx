'use client'

import RequiredField from '@/app/components/RequiredField'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Users } from '@prisma/client';
import { useActionState, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';
import { editProfileAction } from '../utils/actions';
import Image from 'next/image';

interface FormEditProfileProps {
  user: Users
}

export default function FormEditProfile({user}: FormEditProfileProps) {

  const [state, formAction, pending] = useActionState(editProfileAction, { success: false, message: "", errors: undefined });
  const uploadImageInput = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
  
  const handleClick = () => {
    uploadImageInput.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };
  
  return (
    <>
      <form action={formAction}>          
        <div className="grid w-full items-center gap-4">
          <input name='id' hidden defaultValue={user.id}/>

          <div className="flex flex-col space-y-1.5">
              <Label>
                Nombre
                <RequiredField/>
              </Label>
              <Input type="text" name='names' placeholder="Emanuel Jose" defaultValue={user.names}/>
              {state?.errors?.names && (
                <div className="grid text-red-500">{state?.errors?.names}</div>
              )}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>
              Apellidos 
              <RequiredField/>
            </Label>
            <Input type="text" name='surnames' placeholder="Molina Zúniga" defaultValue={user.surnames} />
            {state?.errors?.surnames && (
              <div className="grid text-red-500">{state.errors.surnames}</div>
            )}
          </div>
          
          <div className="flex flex-col gap-3 space-y-1.5">

            <div className={`w-48 h-64 max-w-48 flex items-center justify-center ${!user.image && !preview ? 'bg-gray-300' : ''}`}>
              {preview && (
                <Image width={150} height={150} src={preview} alt="Vista previa"/>
              )}

              {
                (user.image && !preview) &&
                  <Image width={150} height={150} src={`/uploads/profile/${user.image}`} alt='Imagen de perfil'/>
              }

              {
                (!user.image && !preview) &&
                  <p className=' text-muted-foreground '>Sin imagen</p>
              }
            </div>

            <Button className='max-w-56 w-56' onClick={handleClick}  type='button' variant='secondary'>
                Cambiar imagen
            </Button>

            <input onChange={handleFileChange} ref={uploadImageInput} type="file" name="image" id='image' accept="image/*" hidden />

            {state?.errors?.image && (
              <div className="grid text-red-500">{state.errors.image}</div>
            )}
          </div>

          <div className="flex flex-col space-y-1.5">
              <Label>
                Contraseña 
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

          <div className="flex justify-between mt-10">
            <Button disabled={pending}>Guardar cambios</Button>
          </div>
        </div>
      </form>
    </>
  )
}
