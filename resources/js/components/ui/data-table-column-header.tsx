import {
    ArrowDownIcon,
    ArrowUpIcon,
    CaretSortIcon,
    EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    const handleClick = () => {
        if (column.getIsSorted() === false) {
            return column.toggleSorting(false);
        }

        return column.toggleSorting(column.getIsSorted() === "asc");
    };

    return (
        <div
            className={cn("flex items-center  cursor-pointer", className)}
            onClick={handleClick}
        >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
                <ArrowDownIcon className="w-4 h-4 ml-2" />
            ) : column.getIsSorted() === "asc" ? (
                <ArrowUpIcon className="w-4 h-4 ml-2" />
            ) : (
                <CaretSortIcon className="w-4 h-4 ml-2" />
            )}
        </div>
    );
}
