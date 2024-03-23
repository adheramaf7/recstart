import MainLayout from "@/layouts/main-layout";
import AuthenticatedLayout from "@/layouts/main-layout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <MainLayout>
            <Head title="Dashboard" />

            <div className="bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">Welcome to the jungle!</div>
            </div>
        </MainLayout>
    );
}
