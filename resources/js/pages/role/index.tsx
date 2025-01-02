import { DataTable } from "@/components/ui/data-table";
import MainLayout from "@/layouts/main-layout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { TRoleData, columns } from "./components/columns";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, SearchIcon } from "lucide-react";

type TIndexProps = PageProps<{ roles: TRoleData[] }>;

export default function Index({ roles }: TIndexProps) {
    const [search, setSearch] = useState<string>("");

    return (
        <div className="bg-white rounded-md shadow">
            <div className="flex flex-row justify-between p-5">
                <div className="relative flex items-center w-full max-w-xs">
                    <SearchIcon className="absolute ml-2 text-gray-400" />
                    <Input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Type here to search..."
                        className="pl-8 placeholder:text-gray-400"
                    />
                </div>
                <div>
                    <Button asChild>
                        <Link href={route("roles.create")}>
                            <PlusCircleIcon className="mr-2 text-base" /> New
                            Data
                        </Link>
                    </Button>
                </div>
            </div>

            <DataTable columns={columns} data={roles} globalFilter={search} />
        </div>
    );
}

Index.layout = (page: React.ReactNode) => (
    <MainLayout title="Roles Management" children={page} />
);
