/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client'

import RequiredField from '@/app/components/RequiredField'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Title } from '@/components/ui/title'
import { Label } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from "next/navigation";
import { Switch } from '@/components/ui/switch'
import { saveUserAction } from '../../utils/actions'
import { Roles } from '@prisma/client'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FormAddUsers({roles} : {roles: Roles[]}) {
    const [state, formAction, pending] = useActionState(saveUserAction, { success: false, message: "", errors: undefined, fields: undefined });
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    
    useEffect(() => {
      if (state.success) {
        toast.success(`${state.message}`, {
          closeButton: true,
          description: `Fecha de creación ${new Date().toLocaleString()}`,
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
          <Title>Agregar usuario</Title>

          <form action={formAction}>
              <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label>
                      Nombre 
                      <RequiredField/>
                    </Label>
                    <Input type="text" name='names' placeholder="Emanuel Jose" defaultValue={state.fields?.names}/>
                    {state?.errors?.names && (
                        <div className="grid text-red-500">{state.errors.names}</div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>
                      Apellidos 
                      <RequiredField/>
                    </Label>
                    <Input type="text" name='surnames' placeholder="Molina Zúniga" defaultValue={state.fields?.surnames}/>
                    {state?.errors?.surnames && (
                        <div className="grid text-red-500">{state.errors.surnames}</div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>
                      Email 
                      <RequiredField/>
                    </Label>
                    <Input type="email" name='email' placeholder="emanuel@gmail.com" defaultValue={state.fields?.email}/>
                    {state?.errors?.email && (
                        <div className="grid text-red-500">{state.errors.email}</div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>
                      Nombre de usuario 
                      <RequiredField/>
                    </Label>
                    <Input type="text" name='username' placeholder="emolina" defaultValue={state.fields?.username}/>
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
                          
                          <input name="idRol" defaultValue={value} hidden/>

                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className=" lg:w-96 justify-between"
                              >
                                {value ? roles.find((rol) => rol.name === value)?.name : "Selecciona un Rol"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="lg:w-96 p-0">
                              {/* @ts-expect-error */}
                              <Command>
                                <CommandInput />
                                {/* @ts-expect-error */}
                                <CommandList>
                                  {/* @ts-expect-error */}
                                  <CommandEmpty>No se han encontrado roles.</CommandEmpty>
                                  {/* @ts-expect-error */}
                                  <CommandGroup>
                                    {roles.map((rol) => (
                                      // @ts-expect-error
                                      <CommandItem
                                        key={rol.id}
                                        value={rol.id}
                                        onSelect={(currentValue: string) => {                                          
                                          setValue(currentValue === value ? "" : currentValue)
                                          setOpen(false)
                                        }}
                                      >
                                        <Check className={cn( "mr-2 h-4 w-4", value === rol.name ? "opacity-100" : "opacity-0" )} />
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
                        <Switch defaultChecked name='enabled'/>
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
                <Button disabled={pending}>Guardar</Button>
              </div>
          </form>
        </>
    )
}
