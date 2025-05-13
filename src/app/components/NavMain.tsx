"use client"

import { ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton,  SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import Link from "next/link"
import { MenusChildren } from "../types"
import { iconsMenu } from "@/utils/menu"

export function NavMain({items} : {items: MenusChildren[]}) {

  return (
    <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu>
            {items.map((item) => {

                const Icon = iconsMenu[item.icon];

                return (
                    item.children.length > 0 ? 
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <Link href={item.url}>
                                    <SidebarMenuButton tooltip={item.title}>
                                        { <Icon/> }
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </Link>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                {item.children?.map((subItem) => (
                                    <SidebarMenuSubItem key={subItem.title}>
                                        <SidebarMenuSubButton asChild>
                                            <Link href={`${subItem.url}`}>
                                                <span>{subItem.title}</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                    :  
                    <SidebarMenuItem key={item.title}>
                        <Link href={item.url}>
                            <SidebarMenuButton tooltip={item.title}>
                                { <Icon/> }
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>)
                }
            )}
        </SidebarMenu>
    </SidebarGroup>
  )
}
