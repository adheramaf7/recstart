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
import { LuGanttChart } from "react-icons/lu";

type TApplicationSheetMenuProps = {};

function ApplicationSheetMenu(props: TApplicationSheetMenuProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"ghost"} className="block md:hidden">
                    <LuGanttChart className="text-2xl" />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="w-[65%]">
                <h2 className="text-lg font-semibold">Main Menu</h2>
            </SheetContent>
        </Sheet>
    );
}

export default ApplicationSheetMenu;
