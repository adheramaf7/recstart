import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import ColumnAction from "./column-action";

export type RoleData = Role & { users_count: number };

export const columns: ColumnDef<RoleData>[] = [
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
