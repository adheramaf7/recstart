import { DataTable } from "@/components/ui/data-table";
import MainLayout from "@/layouts/main-layout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LuPlusCircle } from "react-icons/lu";

export default function Index({ roles }: PageProps<{ roles: Role[] }>) {
    const [search, setSearch] = useState<string>("");

    return (
        <MainLayout title="Manage Roles">
            <Head title="Roles" />

            <div className="p-4 bg-white rounded-md shadow">
                <div className="flex flex-row justify-between mb-3">
                    <Input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-56"
                        placeholder="Type here to search..."
                    />

                    <Button asChild>
                        <Link href={route("roles.create")}>
                            <LuPlusCircle className="mr-2 text-base" /> New Data
                        </Link>
                    </Button>
                </div>

                <DataTable
                    columns={columns}
                    data={roles}
                    globalFilter={search}
                />
            </div>
        </MainLayout>
    );
}
