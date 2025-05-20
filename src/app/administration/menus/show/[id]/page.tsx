import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Title } from '@/components/ui/title'
import { iconsMenu } from '@/utils/menu'
import { prisma } from '@/utils/prisma'
import { notFound } from 'next/navigation'
import DataTableMenus from '../../components/DataTableMenus'
import { ColumnsDataTableMenus } from '../../components/ColumnsDataTableMenus'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function MenuShow({params}: {params : Promise<{ id: string}>}) {
    const id = parseInt((await params).id)
    const menu = await prisma.menus.findUnique({
      where: {id},
    });

    if (!menu) notFound()

    const Icono = iconsMenu[menu.icon];

    const submenus = await prisma.menus.findMany({
      where: {
        idFather: id,
        AND:{
          menu: true,
        }
      },
    });

    return (
      <>
        <Title>Detalles menu</Title>
        
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-12 lg:col-span-6'>
            <Label>Titulo</Label>
            <Input disabled value={menu?.title}/>
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label>Descripción</Label>
            <Textarea value={menu?.description} disabled/>
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label>URL</Label>
            <Input disabled value={menu?.url}/>
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label>Icono</Label>
            <Icono size={48}/>
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label>Fecha de creación</Label>
            <Input disabled value={menu?.createdAt.toLocaleString()}/>
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label>Fecha de modificion</Label>
            <Input disabled value={menu?.updatedAt.toLocaleString()}/>
          </div>
        </div>

        <Title classNames='my-6'>Sub menus</Title>

        <DataTableMenus columns={ColumnsDataTableMenus} data={submenus}/>
        
        <div className="flex justify-between mt-10">
            <Button asChild variant="outline">
              <Link href='/administration/menus'>Regresar</Link>
            </Button>
        </div>
      </>
    )
}
