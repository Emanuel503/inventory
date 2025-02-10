'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import { NavigationMenu } from '@radix-ui/react-navigation-menu'

export default function NavegationMenuNav() {
    const isMobile = useIsMobile()
        return (
            isMobile &&
            <header className="transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-10">
                <NavigationMenu className="w-full flex items-center gap-2 px-4 bg-sidebar p-2 shadow">
                    <SidebarTrigger className="-ml-1 bg-sidebar-primary text-sidebar-primary-foreground " />
                    <span className="truncate font-semibold"> Sistema de inventario </span>
                </NavigationMenu>
            </header>
    )
}
