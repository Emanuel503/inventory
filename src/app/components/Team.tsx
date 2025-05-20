"use client"

import { SidebarMenu, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar"

export function Team({appName, companyName}: {appName: string, companyName: string}) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="flex gap-2">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                        <SidebarTrigger className="-ml-1 bg-sidebar-primary text-sidebar-primary-foreground " />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold"> {appName} </span>
                        <span className="truncate text-xs">{companyName}</span>
                    </div>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
