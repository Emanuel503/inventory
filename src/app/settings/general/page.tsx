import { Title } from '@/components/ui/title'
import { Separator } from "@/components/ui/separator"
import SidebarNav from '@/app/account/components/SidebarNav'
import FormConfigSystem from '../components/FormConfigSystem'
import { prisma } from '@/utils/prisma'
import { notFound } from 'next/navigation'

const sidebarNavItems = [
  {
    title: "General",
    href: "/settings/general",
  }
]

export default async function GeneralSettingPage() {

  const systemConfigAction = await prisma.systemConfigure.findUnique({
    where: {
      id: 1
    }
  });

  if (!systemConfigAction) notFound()

  return (
    <div>
        <div className="space-y-0.5">
          <Title>Configuración</Title>
          <p className='mb-5'>Maneja la configuración del sistema</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">
            <Title>General</Title>
            
            <FormConfigSystem systemConfigAction={systemConfigAction}/>
          </div>
        </div>
      </div>
  )
}
