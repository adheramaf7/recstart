import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "./application-logo";
import { ScrollArea } from "./ui/scroll-area";
import { usePermission } from "@/hooks/use-permission";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import {
    KeyRoundIcon,
    LayoutDashboardIcon,
    MoreVerticalIcon,
} from "lucide-react";

type TApplicationSheetMenuProps = {};

function ApplicationSheetMenu(props: TApplicationSheetMenuProps) {
    const { can } = usePermission();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"ghost"} className="block md:hidden">
                    <MoreVerticalIcon className="text-2xl" />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="w-[65%] pr-5">
                <ApplicationLogo className="h-10 mb-3" />
                <ScrollArea className="flex flex-col flex-grow h-full gap-2">
                    {/* {can("view-user", "view-role") && (
                        <Collapsible>
                            <CollapsibleTrigger className="flex flex-row items-center justify-between w-full px-1 py-2 rounded-md hover:font-semibold">
                                <div className="flex flex-row items-center">
                                    <LuKeyRound className="mr-2" />
                                    Access Management
                                </div>
                                <LuChevronDown />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pl-6">
                                {can("view-user") && (
                                    <Link
                                        href={route("users.index")}
                                        className="flex flex-row items-center justify-start w-full px-1 py-2 rounded-md hover:font-semibold"
                                    >
                                        User
                                    </Link>
                                )}
                                {can("view-role") && (
                                    <Link
                                        href={route("roles.index")}
                                        className="flex flex-row items-center justify-start w-full px-1 py-2 rounded-md hover:font-semibold"
                                    >
                                        Role
                                    </Link>
                                )}
                            </CollapsibleContent>
                        </Collapsible>
                    )} */}

                    <Accordion type="multiple">
                        <Link
                            href={route("dashboard")}
                            className="flex flex-row items-center font-medium"
                        >
                            <LayoutDashboardIcon className="mr-2" />
                            Dashboard
                        </Link>
                        {can("view-user", "view-role") && (
                            <AccordionItem
                                value="item-1"
                                className="border-none"
                            >
                                <AccordionTrigger className="text-base font-medium">
                                    <div className="flex flex-row items-center">
                                        <KeyRoundIcon className="mr-2" />
                                        Access Management
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-3 pl-6 text-base">
                                    {can("view-user") && (
                                        <Link href={route("users.index")}>
                                            User
                                        </Link>
                                    )}
                                    {can("view-role") && (
                                        <Link href={route("roles.index")}>
                                            Role
                                        </Link>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        )}
                    </Accordion>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}

export default ApplicationSheetMenu;
