import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import ColumnAction from "./column-action";

export type TUserData = User & { roles: Role[] };

export const columns: ColumnDef<TUserData>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        meta: {
            className: "w-[30%]",
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        meta: {
            className: "w-[30%]",
        },
    },
    {
        // accessorKey: "roles",
        id: "role",
        accessorFn: (row) => row.roles.map((role) => role.name).join(", "),
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        ),
        meta: {
            className: "w-[30%]",
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
