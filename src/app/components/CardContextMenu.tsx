import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import Link from "next/link"
import LegendMoreOptions from "../components/LegendMoreOptions"
import { MenusChildren } from "../types";
import { iconsMenu } from "@/utils/menu";

export default function CardContextMenu(props: MenusChildren) {
    const {icon, children, description, url} = props
    const IconMain = iconsMenu[icon];

    return (
        <Link key={url} href={url} className="col-span-4 border hover:bg-gray-50 bg-white rounded-lg w-80 cursor-pointer">
            <ContextMenu>
                <ContextMenuTrigger className="flex flex-col items-center justify-center gap-3 p-5">
                    <IconMain size={48}/>
                    <h5 className="font-semibold">{description}</h5>
                    <LegendMoreOptions/>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    {
                        children.map((submenu, index) => {
                            const IconSubmenu = iconsMenu[submenu.icon];
                            return (
                                <Link key={submenu.url + index} href={submenu.url}>
                                    <ContextMenuItem className="flex gap-3 cursor-pointer">

                                        <IconSubmenu/>
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
