import { Title } from "@/components/ui/title"
import CardContextMenu from "../components/CardContextMenu"
import { prisma } from "@/utils/prisma";

export default async function AdministrationPage() {

  const menus = await prisma.menus.findMany({
    where: {
      idFather: 2,
      AND: {
        menu: false
      }
    },
    include: {
      children: true
    }
 })

  return (
    <>
        <Title>Administración</Title>

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
