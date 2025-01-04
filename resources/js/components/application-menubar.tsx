import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "./ui/menubar";
import { Link } from "@inertiajs/react";
import { usePermission } from "@/hooks/use-permission";
import { KeyRoundIcon, LayoutDashboardIcon } from "lucide-react";

export function ApplicationMenubar() {
    const { can } = usePermission();

    return (
        <Menubar className="border-none shadow-none">
            <MenubarMenu>
                <MenubarTrigger asChild>
                    <Link href={route("dashboard")}>
                        <LayoutDashboardIcon className="mr-1" />
                        Dashboard
                    </Link>
                </MenubarTrigger>
            </MenubarMenu>
            {can("view-user", "view-role") && (
                <MenubarMenu>
                    <MenubarTrigger>
                        <KeyRoundIcon className="mr-1" /> Access Management
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
