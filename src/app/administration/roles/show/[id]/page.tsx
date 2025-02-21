import { ColumnsDataTableUsers } from '@/app/administration/users/components/ColumnsDataTableUsers'
import DataTableUsers from '@/app/administration/users/components/DataTableUsers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Title } from '@/components/ui/title'
import { prisma } from '@/utils/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function RolShow({params}: {params : Promise<{ id: string}>}) {
    const id = parseInt((await params).id)
    const rol = await prisma.roles.findUnique({
      where: {id},
      include:{
        users: {
          include: {
            role:{
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    if (!rol) notFound()

    return (
      <>
        <Title>Detalles rol</Title>
        
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
        </div>

        <Title classNames='my-6'>Usuarios con el rol</Title>

        <DataTableUsers columns={ColumnsDataTableUsers} data={rol.users}/>
        
        <div className="flex justify-between mt-10">
            <Button asChild variant="outline">
              <Link href='/administration/roles'>Regresar</Link>
            </Button>
        </div>
      </>
    )
}
