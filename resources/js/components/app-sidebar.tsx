import * as React from "react";
import { KeyIcon, LayoutDashboardIcon } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TopSidebar } from "@/components/top-sidebar";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

const navMain = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboardIcon,
    },
    {
        title: "Access Management",
        url: "#",
        icon: KeyIcon,
        items: [
            {
                title: "Roles",
                url: "/roles",
            },
            {
                title: "Users",
                url: "/users",
            },
        ],
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TopSidebar />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
