import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import NavBreadcrumb from "./NavBreadcrumb";
import NavegationMenuNav from "./NavigationMenuNav";
import { Card, CardContent} from "@/components/ui/card";
import { MenusChildren } from "../types";
import { Users } from "@prisma/client";
import ChangePasswordAlert from "../login/components/ChangePasswordAlert";

export default async function Sliderbar({
    children,
    menus,
    appName,
    companyName,
    user
  }: Readonly<{
    children: React.ReactNode;
    menus: MenusChildren[];
    appName: string;
    companyName: string;
    user: Users
  }>) {

    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar menu={menus} appName={appName} companyName={companyName} user={user}/>
            <SidebarInset>
                <NavegationMenuNav/>
                <div className="flex flex-1 flex-col p-4 pt-0">
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 mt-4 md:min-h-min p-5">
                        <NavBreadcrumb />
                        <Card>
                            <CardContent className="min-h-[85vh]">
                                <>
                                    {children}
                                    {!user.confirmedEmail && <ChangePasswordAlert user={user}/>}
                                </>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
