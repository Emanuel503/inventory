import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Title } from '@/components/ui/title'
import { prisma } from '@/utils/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function RolShow({params}: {params : Promise<{ id: string}>}) {
    const id = parseInt((await params).id)
    const rol = await prisma.roles.findUnique({where:{ id}});

    if (!rol) notFound()

    return (
      <>
        <Title>Detalles rol</Title>

          <Card>
            <CardHeader>
                <CardDescription>Detalles del rol </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-12 gap-6'>
                  <div className='col-span-12 lg:col-span-6'>
                    <Label>Nombre</Label>
                    <Input disabled value={rol?.name}/>
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Label>Descripción</Label>
                    <Textarea value={rol?.description} disabled/>
                  </div>
                  

                  <div className='col-span-12 lg:col-span-6'>
                    <Label>Fecha de creación</Label>
                    <Input disabled value={rol?.createdAt.toLocaleString()}/>
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Label>Fecha de modificion</Label>
                    <Input disabled value={rol?.updatedAt.toLocaleString()}/>
                  </div>

                  {/* TODO: motrar menus asignados a ese rol */}
                
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button asChild variant="outline">
                  <Link href='/administration/roles'>Regresar</Link>
                </Button>
            </CardFooter>
          </Card>
      </>
    )
}
