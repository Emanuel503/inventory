'use client'

import RequiredField from '@/app/components/RequiredField'
import { Button } from '@/components/ui/button'
import { Title } from '@/components/ui/title'
import { Label } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from "next/navigation";
import { saveAccessAction } from '../../utils/actions'
import { Menus, Roles } from '@prisma/client'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FormAddAccess({roles, menus} : {roles: Roles[], menus: Menus[]}) {
    const [state, formAction, pending] = useActionState(saveAccessAction, { success: false, message: "", errors: undefined, fields: undefined });
    const router = useRouter();
    const [openRol, setOpenRol] = useState(false)
    const [valueRol, setValueRol] = useState("")
    const [openMenu, setOpenMenu] = useState(false)
    const [valueMenu, setValueMenu] = useState("")
    
    useEffect(() => {
      if (state.success) {
        toast.success(`${state.message}`, {
          closeButton: true,
          description: `Fecha de creación ${new Date().toLocaleString()}`,
        });

        router.push("/administration/access")
      }else if(!state.success && state.errors !== undefined){
        toast.warning(`${state.message}`, {
          closeButton: true,
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);
    
    return (
      <>
          <Title>Agregar acceso</Title>

          <form action={formAction}>
              <div className="grid w-full items-center gap-4">
                  <div className="grid grid-cols-12 space-y-1.5">
                      <div className='col-span-12 xl:col-span-6 flex flex-col space-y-1.5'>
                          <Label>
                              Rol
                              <RequiredField/>
                          </Label>
                          
                          <input name="idRol" defaultValue={valueRol} hidden/>

                          <Popover open={openRol} onOpenChange={setOpenRol}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openRol}
                                className=" lg:w-96 justify-between"
                              >
                                {valueRol ? roles.find((rol) => String(rol.id) === valueRol)?.name : "Selecciona un Rol"}
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
                                          setValueRol(currentValue === valueRol ? "" : currentValue)
                                          setOpenRol(false)
                                        }}
                                      >
                                        <Check className={cn( "mr-2 h-4 w-4", valueRol === String(rol.id) ? "opacity-100" : "opacity-0" )} />
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

                      <div className='col-span-12 xl:col-span-6 flex flex-col space-y-1.5'>
                          <Label>
                              Menu
                              <RequiredField/>
                          </Label>
                          
                          <input name="idMenu" defaultValue={valueMenu} hidden/>

                          <Popover open={openMenu} onOpenChange={setOpenMenu}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className=" lg:w-96 justify-between"
                              >
                                {valueMenu ? menus.find((menu) => String(menu.id) === valueMenu)?.title : "Selecciona un Menu"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="lg:w-96 p-0">
                              <Command>
                                <CommandInput />
                                <CommandList>
                                  <CommandEmpty>No se han encontrado menus.</CommandEmpty>
                                  <CommandGroup>
                                    {menus.map((menu) => (
                                      <CommandItem
                                        key={menu.id}
                                        value={String(menu.id)}
                                        onSelect={(currentValue: string) => {                                          
                                          setValueMenu(currentValue === valueMenu ? "" : currentValue)
                                          setOpenMenu(false)
                                        }}
                                      >
                                        <Check className={cn( "mr-2 h-4 w-4", valueMenu === String(menu.id) ? "opacity-100" : "opacity-0" )} />
                                        {menu.title}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          {state?.errors?.idMenu && (
                              <div className="grid text-red-500">{state.errors.idMenu}</div>
                          )}
                      </div>
                  </div>
              </div>
              <div className="flex justify-between mt-10">
                <Button asChild variant="outline">
                  <Link href='/administration/access'>Cancelar</Link>
                </Button>
                <Button disabled={pending}>Guardar</Button>
              </div>
          </form>
        </>
    )
}
