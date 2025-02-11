import AuthenticatedLayout from "@/layouts/main-layout";
import DeleteUserForm from "./partials/delete-user-form";
import UpdatePasswordForm from "./partials/update-password-form";
import UpdateProfileInformationForm from "./partials/update-profile-information";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import MainLayout from "@/layouts/main-layout";
import { usePermission } from "@/hooks/use-permission";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const { can } = usePermission();

    return (
        <>
            <div className="space-y-6">
                {can("update-profile") && (
                    <div className="p-4 bg-white shadow sm:p-8 sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                )}

                {can("update-password") && (
                    <div className="p-4 bg-white shadow sm:p-8 sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                )}
            </div>
        </>
    );
}

Edit.layout = (page: React.ReactNode) => (
    <MainLayout title="Edit Profile">{page}</MainLayout>
);
