import React from "react";
import { RoleData } from "./columns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LuMoreHorizontal } from "react-icons/lu";
import { Link, router } from "@inertiajs/react";
import ConfirmDialog from "@/components/ui/confirm-dialog";

type ColumnActionProps = {
    data: RoleData;
};

function ColumnAction({ data }: ColumnActionProps) {
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const onConfirmDelete = () => {
        router.delete(route("roles.destroy", [data.id]), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <DropdownMenu>
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
            </DropdownMenu>
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
