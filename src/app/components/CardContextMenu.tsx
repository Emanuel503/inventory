import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import Link from "next/link"
import LegendMoreOptions from "../components/LegendMoreOptions"
import { Eye, List, LockKeyhole, Plus, Trash2, UserCogIcon } from "lucide-react";
import { JSX } from "react";
import { MenusChildren } from "../types";

const icons:  { [key: string]: JSX.Element } = {
    "UserCog": <UserCogIcon size={48}/>,
    "LockKeyhole": <LockKeyhole size={48}/>,
    "List": <List/>,
    "Plus": <Plus/>,
    "Eye": <Eye/>,
    "Trash2": <Trash2/>,

}

export default function CardContextMenu(props: MenusChildren) {
    const {icon, children, description, url} = props
    return (
        <Link key={url} href={url} className="col-span-4 border hover:bg-gray-50 bg-white rounded-lg w-80 cursor-pointer">
            <ContextMenu>
                <ContextMenuTrigger className="flex flex-col items-center justify-center gap-3 p-5">
                    {icons[icon] }
                    <h5 className="font-semibold">{description}</h5>
                    <LegendMoreOptions/>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    {
                        children.map((submenu, index) => {

                            return (
                                <Link key={submenu.url + index} href={submenu.url}>
                                    <ContextMenuItem className="flex gap-3 cursor-pointer">

                                        {icons[submenu.icon] }
                                        {submenu.title}
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
