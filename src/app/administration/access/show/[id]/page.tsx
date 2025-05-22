import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Title } from '@/components/ui/title'
import { prisma } from '@/utils/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ColumnsDataTableMenus } from '@/app/administration/menus/components/ColumnsDataTableMenus'
import DataTableMenus from '@/app/administration/menus/components/DataTableMenus'

export default async function AccessShow({params}: {params : Promise<{ id: string}>}) {
    const id = parseInt((await params).id)
    const access = await prisma.access.findUnique({
      include: { 
          role:{
            select:{
            name: true,
            }
          },
          menu:{
            select: {
              title: true
            }
          }
        }, 
      where: {id}
    });

    if (!access) notFound()

    const submenus = await prisma.menus.findMany({
      where: {
        idFather: access.idMenu
      }
    })

    return (
      <>
        <Title>Detalles acceso</Title>

        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-12 lg:col-span-6'>
            <Label>Rol</Label>
            <Input disabled value={access?.role.name}/>
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label>Menu</Label>
            <Input disabled value={access?.menu.title}/>
          </div>
          
          <div className='col-span-12 lg:col-span-6'>
            <Label>Fecha de creación</Label>
            <Input disabled value={access?.createdAt.toLocaleString()}/>
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label>Fecha de modificion</Label>
            <Input disabled value={access?.updatedAt.toLocaleString()}/>
          </div>                
        </div>

        <div>
          <Title>Sub menus</Title>
          <DataTableMenus columns={ColumnsDataTableMenus} data={submenus}/>
        </div>

        <div className="flex justify-between mt-10">
            <Button asChild variant="outline">
              <Link href='/administration/access'>Regresar</Link>
            </Button>
        </div>
      </>
    )
}
