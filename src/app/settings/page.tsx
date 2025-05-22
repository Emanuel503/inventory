import { Title } from '@/components/ui/title'
import { prisma } from '@/utils/prisma'
import CardContextMenu from "../components/CardContextMenu"

export default async function SettingsPage() {

  const menus = await prisma.menus.findMany({
      where: {
        idFather: 5,
      },
      include: {
        children: {
          orderBy:{
            id: "asc"
          }
        }
      }
  })  

  return (
    <>
      <Title>Configuración</Title>

      <div className='flex flex-wrap justify-center gap-6 p-5'>
          {
              menus.map((menu) => (
                <CardContextMenu key={menu.url} {...menu} />
              ))
          }
      </div>
    </>
  )
}
