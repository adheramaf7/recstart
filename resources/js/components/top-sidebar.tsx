import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "./application-logo";

export function TopSidebar() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    asChild
                >
                    <Link href="/dashboard">
                        <ApplicationLogo className="w-3/4" />
                    </Link>
                    {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                        <img src="/images/dark-icon.png" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold text-2xl">
                            {props.app_name}
                        </span>
                    </div> */}
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
