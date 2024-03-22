import MainLayout from "@/layouts/main-layout";
import AuthenticatedLayout from "@/layouts/main-layout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <MainLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                        <div>
                            <Link
                                href={route("logout")}
                                as="button"
                                method="post"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
