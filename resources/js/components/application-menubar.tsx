import { LuKeyRound, LuLayoutDashboard } from "react-icons/lu";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "./ui/menubar";
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useMemo } from "react";
import { TMenu, menus } from "@/constants/menu";
import { usePermission } from "@/hooks/use-permission";

export function ApplicationMenubar() {
    const { can } = usePermission();

    return (
        <Menubar className="border-none shadow-none">
            <MenubarMenu>
                <MenubarTrigger asChild>
                    <Link href={route("dashboard")}>
                        <LuLayoutDashboard className="mr-1" />
                        Dashboard
                    </Link>
                </MenubarTrigger>
            </MenubarMenu>
            {can("view-user", "view-role") && (
                <MenubarMenu>
                    <MenubarTrigger>
                        <LuKeyRound className="mr-1" /> Access Management
                    </MenubarTrigger>
                    <MenubarContent>
                        {can("view-user") && (
                            <MenubarItem asChild>
                                <Link href={route("users.index")}>User</Link>
                            </MenubarItem>
                        )}
                        {can("view-role") && (
                            <MenubarItem asChild>
                                <Link href={route("roles.index")}>Role</Link>
                            </MenubarItem>
                        )}
                    </MenubarContent>
                </MenubarMenu>
            )}
        </Menubar>
    );
}
