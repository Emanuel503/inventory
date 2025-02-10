'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { menu as menuList } from "@/utils/menu"

interface SubMenu{
    title: string;
    url: string;
}

interface Menu {
    title: string;
    url: string;
    items: SubMenu[] | null;
}

export default function NavBreadcrumb() {
    const path = usePathname();
    const breadcrumbList = path.split('/').filter(Boolean);

    const getNamesPath = (itemsBreadcrumb : string[]) => {
        const menuItems: Menu[] = [];
        
        itemsBreadcrumb.forEach((item, index) => {
            if (index === 0) {
                const menu = menuList.find(menu => menu.url === `/${item}`);
                menuItems.push({
                    title: menu!.title,
                    url: menu!.url,
                    items: menu!.items
                });
            } else {
                if(menuItems[0].items !== null){
                    
                    const subMenu = menuItems[0]!.items.find(subItem => subItem.url === `/${item}`);
                    
                    menuItems.push({
                        title: subMenu!.title,
                        url: `${menuItems[0].url}${subMenu!.url}`,
                        items: null
                    });
                }
            }
        });

        return menuItems
    }

    const menuses = getNamesPath(breadcrumbList);
    
    return (
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                <BreadcrumbPage>
                    <Link href="/dashboard">
                        <House size={18}/>
                    </Link>
                </BreadcrumbPage>
                <BreadcrumbSeparator/>
                {
                    menuses.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <BreadcrumbItem >
                                    <BreadcrumbPage>
                                        <Link href={item.url}>{item.title}</Link>
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                                { index < menuses.length - 1 && <BreadcrumbSeparator/> }
                            </Fragment>
                        )
                    })
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}
