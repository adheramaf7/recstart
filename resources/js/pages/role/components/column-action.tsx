import React from "react";
import { TRoleData } from "./columns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    LuMoreHorizontal,
    LuPen,
    LuPencil,
    LuTrash,
    LuTrash2,
} from "react-icons/lu";
import { Link, router } from "@inertiajs/react";
import ConfirmDialog from "@/components/ui/confirm-dialog";

type TColumnActionProps = {
    data: TRoleData;
};

function ColumnAction({ data }: TColumnActionProps) {
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const onConfirmDelete = () => {
        router.delete(route("roles.destroy", [data.id]), {
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
                        href={route("roles.edit", [data.id])}
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
                <Link href={route("roles.edit", [data.id])}>
                    <LuPencil className="text-gray-600" />
                </Link>
            </Button>
            <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setDialogOpen(true)}
            >
                <LuTrash2 className="text-gray-600" />
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
