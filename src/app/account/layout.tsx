import { Title } from '@/components/ui/title'
import { Separator } from "@/components/ui/separator"
import SidebarNav from './components/SidebarNav'

interface AccountLayoutProps {
  children: React.ReactNode
}

const sidebarNavItems = [
  {
    title: "Perfil",
    href: "/account/profile",
  },
  {
    title: "Sesiones",
    href: "/account/sessions",
  },
  {
    title: "Notificaciones",
    href: "/account/notifications",
  },
  {
    title: "Seguridad",
    href: "/account/security",
  }
]

export default function Accountlayout({ children }: AccountLayoutProps) {
  return (
     <div>
        <div className="space-y-0.5">
          <Title>Cuenta</Title>
          <p className='mb-5'>Maneja la configuración de tu cuenta, sesiones y preferencias</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
  )
}
