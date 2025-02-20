import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Title } from '@/components/ui/title'
import { prisma } from '@/utils/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function UsersShow({params}: {params : Promise<{ id: string}>}) {
    const id = parseInt((await params).id)
    const user = await prisma.users.findUnique({
      include: {role:{
        select:{
          name: true,
        }
      }}, 
      where: {id}
    });

    if (!user) notFound()

    return (
      <>
        <Title>Detalles usuario</Title>

          <Card>
            <CardHeader>
                <CardDescription>Detalles del usuario</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-12 gap-6'>
                  <div className='col-span-12 lg:col-span-6'>
                    <Label>Nombre</Label>
                    <Input disabled value={user?.names}/>
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Label>Apellidos</Label>
                    <Input disabled value={user?.surnames}/>
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Label>Email</Label>
                    <Input disabled value={user?.email}/>
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Label>Nombre de usuario</Label>
                    <Input disabled value={user?.username}/>
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Label>Rol</Label>
                    <Input disabled value={user?.role.name}/>
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Label>Estado</Label>
                    <br/>
                    <Badge variant={user?.enabled ? "default": "destructive"}>
                      {user?.enabled ? "Activo": "Desactivado"}
                    </Badge>
                  </div>
                  
                  <div className='col-span-12 lg:col-span-6'>
                    <Label>Fecha de creación</Label>
                    <Input disabled value={user?.createdAt.toLocaleString()}/>
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Label>Fecha de modificion</Label>
                    <Input disabled value={user?.updatedAt.toLocaleString()}/>
                  </div>                
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button asChild variant="outline">
                  <Link href='/administration/users'>Regresar</Link>
                </Button>
            </CardFooter>
          </Card>
      </>
    )
}
