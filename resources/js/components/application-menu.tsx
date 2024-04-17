import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { LuLayoutDashboard } from "react-icons/lu";

export function ApplicationMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link
                        href={route("dashboard")}
                        as="button"
                        className={cn(
                            navigationMenuTriggerStyle(),
                            "text-base text-gray-700"
                        )}
                    >
                        <LuLayoutDashboard className="mr-1" />
                        Dashboard
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
