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
import { Link, router } from "@inertiajs/react";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { PencilIcon, TrashIcon } from "lucide-react";

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
            <Button variant={"ghost"} size={"icon"} asChild>
                <Link href={route("roles.edit", [data.id])}>
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
