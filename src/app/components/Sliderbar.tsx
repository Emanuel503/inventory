import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import NavBreadcrumb from "./NavBreadcrumb";
import NavegationMenuNav from "./NavigationMenuNav";
import { Card, CardContent} from "@/components/ui/card";

export default function Sliderbar({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <NavegationMenuNav/>
                <div className="flex flex-1 flex-col p-4 pt-0">
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 mt-4 md:min-h-min p-5">
                        <NavBreadcrumb />
                        <Card>
                            <CardContent className="min-h-[85vh]">
                                {children}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
