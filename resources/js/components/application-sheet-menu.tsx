import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { LuGanttChart, LuKeyRound, LuLayoutDashboard } from "react-icons/lu";
import { Link } from "@inertiajs/react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";
import ApplicationLogo from "./application-logo";
import { ScrollArea } from "./ui/scroll-area";

type TApplicationSheetMenuProps = {};

function ApplicationSheetMenu(props: TApplicationSheetMenuProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"ghost"} className="block md:hidden">
                    <LuGanttChart className="text-2xl" />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="w-[65%] pr-5">
                <ApplicationLogo className="h-10 mb-3" />
                <ScrollArea className="flex flex-col flex-grow h-full gap-2">
                    <Link
                        href={route("dashboard")}
                        className="flex flex-row items-center justify-start w-full px-1 py-2 rounded-md hover:font-semibold"
                    >
                        <LuLayoutDashboard className="mr-2" />
                        Dashboard
                    </Link>
                    <Collapsible>
                        <CollapsibleTrigger className="flex flex-row items-center justify-start w-full px-1 py-2 rounded-md hover:font-semibold">
                            <LuKeyRound className="mr-2" />
                            Access Management
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-6">
                            <Link
                                href={route("users.index")}
                                className="flex flex-row items-center justify-start w-full px-1 py-2 rounded-md hover:font-semibold"
                            >
                                User
                            </Link>
                            <Link
                                href={route("roles.index")}
                                className="flex flex-row items-center justify-start w-full px-1 py-2 rounded-md hover:font-semibold"
                            >
                                Role
                            </Link>
                        </CollapsibleContent>
                    </Collapsible>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}

export default ApplicationSheetMenu;
