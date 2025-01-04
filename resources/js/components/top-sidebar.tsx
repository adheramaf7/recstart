import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "./application-logo";

export function TopSidebar() {
    const sidebar = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    asChild
                >
                    <Link href="/dashboard">
                        {sidebar.state === "expanded" && (
                            <ApplicationLogo className="w-3/4" />
                        )}
                        {sidebar.state === "collapsed" && (
                            <img
                                src="/images/dark-icon.png"
                                className="aspect-square size-8"
                            />
                        )}
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
