"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, } from "@/components/ui/sidebar"
import { Team } from "./Team"
import { NavMain } from "./NavMain"
import { NavUser } from "./NavUser"
import { MenusChildren, UserSession } from "../types"

const user : UserSession = {
    name: "Emanuel Molina",
    email: "emanueljosemolina@gmail.com",
    avatar: "https://petsastherapy.org/images/uploads/cutouts/Cats_for_website_2.0_copy_.png",
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  menu: MenusChildren[];
  appName: string;
  companyName: string;
}

export function AppSidebar({ menu, appName, companyName, ...props }: AppSidebarProps) {
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
