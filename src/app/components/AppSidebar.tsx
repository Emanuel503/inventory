"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, } from "@/components/ui/sidebar"
import { Team } from "./Team"
import { NavMain } from "./NavMain"
import { NavUser } from "./NavUser"
import { menu } from "@/utils/menu"
import { UserSession } from "../types"

const user : UserSession = {
    name: "Emanuel Molina",
    email: "emanueljosemolina@gmail.com",
    avatar: "https://petsastherapy.org/images/uploads/cutouts/Cats_for_website_2.0_copy_.png",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Team/>
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
