import { LuKeyRound, LuLayoutDashboard } from "react-icons/lu";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "./ui/menubar";
import { Link } from "@inertiajs/react";

export function ApplicationMenubar() {
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
            <MenubarMenu>
                <MenubarTrigger>
                    <LuKeyRound className="mr-1" /> Access Management
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem asChild>
                        <Link href={route("users.index")}>User</Link>
                    </MenubarItem>
                    <MenubarItem asChild>
                        <Link href={route("roles.index")}>Role</Link>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
