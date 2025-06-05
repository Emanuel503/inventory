'use client'

import RequiredField from '@/app/components/RequiredField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Title } from '@/components/ui/title';
import { Roles, Users } from '@prisma/client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner';
import { editUserAction } from '../../utils/actions';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

interface PropsFormEditUser{
  user: Users
  roles: Roles[]
}

export default function FormEditUser(props: PropsFormEditUser) {
    const {user, roles} = props
    const [state, formAction, pending] = useActionState(editUserAction, { success: false, message: "", errors: undefined });
    const router = useRouter();

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(String(user.idRol))    
    
    useEffect(() => {
      if (state.success) {
        toast.success(`${state.message}`, {
          closeButton: true,
          description: `Fecha de modificación ${new Date().toLocaleString()}`,
        });

        router.push("/administration/users")
      }else if(!state.success && state.errors !== undefined){
        toast.warning(`${state.message}`, {
          closeButton: true,
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return (
        <>
            <Title>Editar usuario</Title>

            <form action={formAction}>
                <div className="grid w-full items-center gap-4">
                    <input name='id' defaultValue={user.id} hidden/>

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
                    <Input type="text" name='surnames' placeholder="Molina Zúniga" defaultValue={user.surnames}/>
                    {state?.errors?.surnames && (
                        <div className="grid text-red-500">{state.errors.surnames}</div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>
                      Email 
                      <RequiredField/>
                    </Label>
                    <Input type="email" name='email' placeholder="emanuel@gmail.com" defaultValue={user.email}/>
                    {state?.errors?.email && (
                        <div className="grid text-red-500">{state.errors.email}</div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>
                      Nombre de usuario 
                      <RequiredField/>
                    </Label>
                    <Input type="text" name='username' placeholder="emolina" defaultValue={user.username}/>
                    {state?.errors?.username && (
                        <div className="grid text-red-500">{state.errors.username}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-12 space-y-1.5">
                      <div className='col-span-12 xl:col-span-6 flex flex-col space-y-1.5'>
                          <Label>
                              Rol
                              <RequiredField/>
                          </Label>
                          
                          <input name="idRol" readOnly value={value} hidden/>

                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className=" lg:w-96 justify-between"
                              >
                                {value ? roles.find((rol) => String(rol.id) === value)?.name : "Selecciona un Rol"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="lg:w-96 p-0">
                              <Command>
                                <CommandInput />
                                <CommandList>
                                  <CommandEmpty>No se han encontrado roles.</CommandEmpty>
                                  <CommandGroup>
                                    {roles.map((rol) => (
                                      <CommandItem
                                        key={rol.id}
                                        value={String(rol.id)}
                                        onSelect={(currentValue: string) => {                                          
                                          setValue(currentValue === value ? "" : currentValue)
                                          setOpen(false)
                                        }}
                                      >
                                        <Check className={cn( "mr-2 h-4 w-4", value === String(rol.id) ? "opacity-100" : "opacity-0" )} />
                                        {rol.name}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          {state?.errors?.idRol && (
                              <div className="grid text-red-500">{state.errors.idRol}</div>
                          )}
                      </div>
                  
                      <div className="col-span-12 xl:col-span-6 flex flex-col space-y-1.5">
                        <Label>
                            Habilitado 
                            <RequiredField/>
                        </Label>
                        <Switch defaultChecked={user.enabled} name='enabled'/>
                        {state?.errors?.enabled && (
                          <div className="grid text-red-500">{state.errors.enabled}</div>
                        )}
                      </div>
                  </div>
                </div>
                <div className="flex justify-between mt-10">
                    <Button asChild variant="outline">
                        <Link href='/administration/users'>Cancelar</Link>
                    </Button>
                    <Button disabled={pending}>Modificar</Button>
                </div>
            </form>
        </>
    )
}
