import AuthenticatedLayout from "@/layouts/main-layout";
import DeleteUserForm from "./partials/delete-user-form";
import UpdatePasswordForm from "./partials/update-password-form";
import UpdateProfileInformationForm from "./partials/update-profile-information";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import MainLayout from "@/layouts/main-layout";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <MainLayout>
            <Head title="Profile" />

            <div className="space-y-6">
                <div className="p-4 bg-white shadow sm:p-8 sm:rounded-lg">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="p-4 bg-white shadow sm:p-8 sm:rounded-lg">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>
                <div className="p-4 bg-white shadow sm:p-8 sm:rounded-lg">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </MainLayout>
    );
}
