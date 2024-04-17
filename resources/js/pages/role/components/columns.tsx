import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import ColumnAction from "./column-action";
import { Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";

export type TRoleData = Role & { users_count: number };

export const columns: ColumnDef<TRoleData>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        meta: {
            className: "w-[70%]",
        },
    },
    {
        accessorKey: "users_count",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Users Count" />
        ),
        meta: {
            className: "w-[20%]",
        },
        cell: ({ row, getValue, column }) => {
            const url = route("users.index", { roles: [row.original.id] });

            return (
                <Link href={url}>
                    <Badge variant={"secondary"}>
                        {row.original.users_count} Users
                    </Badge>
                </Link>
            );
        },
    },
    {
        accessorKey: "id",
        header: "Actions",
        meta: {
            className: "w-[10%]",
        },
        cell: ({ row }) => <ColumnAction data={row.original} />,
    },
];
