import { Title } from "@/components/ui/title"
import { Eye, List, LockKeyhole, Plus, Trash2, UserCog } from "lucide-react"
import CardContextMenu from "../components/CardContextMenu"

const menus = [
    {
        name: "Administración de Usuarios",
        icon: UserCog,
        path: "/administration/users",
        items: [
            {
                name: "Listado de usuarios",
                icon: List,
                path: "/administration/users",
            },
            {
                name: "Agregar usuario",
                icon: Plus,
                path: "/administration/users/add",
            },
            {
                name: "Ver usuario",
                icon: Eye,
                path: "/administration/users",
            },
            {
                name: "Eliminar usuario",
                icon: Trash2,
                path: "/administration/users",
            },
        ]
    },
    {
        name: "Administración de Roles",
        icon: LockKeyhole,
        path: "/administration/roles",
        items: [
            {
                name: "Listado de roles",
                icon: List,
                path: "/administration/roles",
            },
            {
                name: "Agregar rol",
                icon: Plus,
                path: "/administration/roles/add",
            },
            {
                name: "Ver rol",
                icon: Eye,
                path: "/administration/roles",
            },
            {
                name: "Eliminar rol",
                icon: Trash2,
                path: "/administration/roles",
            },
        ]
    },
]

export default function AdministrationPage() {
  return (
    <>
        <Title>Administración</Title>

        <div className='flex flex-wrap justify-center gap-6 p-5'>
            {
                menus.map((menu) => (
                    <CardContextMenu key={menu.path} {...menu} />
                ))
            }
        </div>
    </>
  )
}
