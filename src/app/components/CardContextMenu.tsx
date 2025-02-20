import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import Link from "next/link"
import LegendMoreOptions from "../components/LegendMoreOptions"
import { LucideIcon } from "lucide-react"

interface MenuItem {
    name: string;
    icon: LucideIcon;
    path: string;
}

interface PropsCardContextMenu {
    name: string;
    icon: LucideIcon;
    path: string;
    items: MenuItem[];
}

export default function CardContextMenu(props: PropsCardContextMenu) {
    const {icon: Icon, items, name, path} = props
    return (
        <Link key={path} href={path} className="col-span-4 border hover:bg-gray-50 bg-white rounded-lg w-80 cursor-pointer">
            <ContextMenu>
                <ContextMenuTrigger className="flex flex-col items-center justify-center gap-3 p-5">
                    <Icon size={46} />
                    <h5 className="font-semibold">{name}</h5>
                    <LegendMoreOptions/>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    {
                        items.map((submenu, index) => {
                            const SubmenuIcon = submenu.icon;

                            return (
                                <Link key={submenu.path + index} href={submenu.path}>
                                    <ContextMenuItem className="flex gap-3 cursor-pointer">
                                        <SubmenuIcon />
                                        {submenu.name}
                                    </ContextMenuItem>
                                </Link>
                            ) 
                        })
                    }
                </ContextMenuContent>
            </ContextMenu>
        </Link>
    )
}
