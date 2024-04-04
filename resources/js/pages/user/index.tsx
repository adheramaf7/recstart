import { DataTable } from "@/components/ui/data-table";
import MainLayout from "@/layouts/main-layout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { TUserData, columns } from "./components/columns";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LuPlusCircle, LuSearch } from "react-icons/lu";

const PageToolbar = () => {
    return (
        <div>
            <Button asChild>
                <Link href={route("users.create")}>
                    <LuPlusCircle className="mr-2 text-base" /> New Data
                </Link>
            </Button>
        </div>
    );
};

type IndexProps = PageProps<{ users: TUserData[] }>;

export default function Index({ users }: IndexProps) {
    const [search, setSearch] = useState<string>("");

    return (
        <MainLayout
            title="Manage Users"
            subTitle="Manage users data in here."
            pageToolbar={<PageToolbar />}
        >
            <Head title="Users" />

            <div className="bg-white rounded-md shadow">
                <div className="flex flex-row justify-between p-5">
                    <div className="relative flex items-center w-full max-w-xs">
                        <LuSearch className="absolute ml-2 text-gray-400" />
                        <Input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Type here to search..."
                            className="pl-8 placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={users}
                    globalFilter={search}
                />
            </div>
        </MainLayout>
    );
}
