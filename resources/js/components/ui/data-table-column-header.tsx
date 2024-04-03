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

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (column.getIsSorted() === false) {
            return column.toggleSorting(false);
        }

        return column.toggleSorting(column.getIsSorted() === "asc");
    };

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <Button
                variant="ghost"
                className="-ml-3 h-8 data-[state=open]:bg-accent"
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
            </Button>
            {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>

                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem
                        onClick={() => column.toggleSorting(false)}
                    >
                        <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => column.toggleSorting(true)}
                    >
                        <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> */}
        </div>
    );
}
