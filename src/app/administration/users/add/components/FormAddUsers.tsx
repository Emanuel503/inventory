'use client'

import RequiredField from '@/app/components/RequiredField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Title } from '@/components/ui/title'
import { Label } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from "next/navigation";
import { Switch } from '@/components/ui/switch'
import { saveUserAction } from '../../utils/actions'
import { Roles } from '@prisma/client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"

export default function FormAddUsers({roles} : {roles: Roles[]}) {
    const [state, formAction, pending] = useActionState(saveUserAction, { success: false, message: "", errors: undefined, fields: undefined });
    const router = useRouter();
    
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
              <Card>
                <CardHeader>
                    <CardDescription>Agregar un nuevo usuario</CardDescription>
                </CardHeader>
                <CardContent>
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

                        <div className="flex flex-col space-y-1.5">
                          <Label>
                            Rol
                            <RequiredField/>
                          </Label>
                          <Select name="idRol" defaultValue={state.fields?.idRol}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un rol" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Roles</SelectLabel>
                                    {
                                        roles.map((rol) => {
                                            return <SelectItem value={String(rol.id)} key={rol.id}>{rol.name}</SelectItem>
                                        })
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                          {state?.errors?.idRol && (
                              <div className="grid text-red-500">{state.errors.idRol}</div>
                          )}
                        </div>

                        <div className="flex flex-col space-y-1.5">
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
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button asChild variant="outline">
                      <Link href='/administration/users'>Cancelar</Link>
                    </Button>
                    <Button disabled={pending}>Guardar</Button>
                </CardFooter>
              </Card>
          </form>
        </>
    )
}
