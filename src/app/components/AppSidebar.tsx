"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, } from "@/components/ui/sidebar"
import { Team } from "./Team"
import { NavMain } from "./NavMain"
import { NavUser } from "./NavUser"
import { MenusChildren } from "../types"
import { Users } from "@prisma/client"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  menu: MenusChildren[];
  appName: string;
  companyName: string;
  user: Users
}

export function AppSidebar({ menu, appName, companyName, user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Team appName={appName} companyName={companyName}/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
