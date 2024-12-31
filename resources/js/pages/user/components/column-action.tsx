import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { TUserData } from "./columns";
import { PencilIcon, TrashIcon } from "lucide-react";

type TColumnActionProps = {
    data: TUserData;
};

function ColumnAction({ data }: TColumnActionProps) {
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const onConfirmDelete = () => {
        router.delete(route("users.destroy", [data.id]), {
            preserveScroll: true,
        });
    };

    return (
        <>
            {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <LuMoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link
                        href={route("users.edit", [data.id])}
                        className="w-full"
                    >
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onSelect={() => setDialogOpen(true)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> */}
            <Button variant={"ghost"} size={"icon"} asChild>
                <Link href={route("users.edit", [data.id])}>
                    <PencilIcon className="text-gray-600" />
                </Link>
            </Button>
            <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setDialogOpen(true)}
            >
                <TrashIcon className="text-gray-600" />
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                onConfirm={onConfirmDelete}
                message="Are you sure to delete this data?"
                onOpenChange={(isOpen) => setDialogOpen(isOpen)}
            />
        </>
    );
}

export default ColumnAction;
