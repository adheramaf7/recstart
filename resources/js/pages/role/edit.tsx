import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/main-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { LuChevronLeft } from "react-icons/lu";
import FormField, { TFormRole } from "./components/form-field";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";

const PageToolbar = () => {
    return (
        <div>
            <Button variant={"outline"} asChild>
                <Link href={route("roles.index")}>
                    <LuChevronLeft className="mr-2 text-base" /> Back
                </Link>
            </Button>
        </div>
    );
};

type TEditProps = PageProps<{
    role: Role & { permissions: Permission[] };
    availablePermissions: Record<PermissionGroup, Permission[]>;
}>;

const Edit = ({ role, availablePermissions }: TEditProps) => {
    const { data, setData, errors, processing, put } = useForm<TFormRole>({
        name: role.name,
        permissions: role.permissions.map((value) => value.id),
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("roles.update", [role.id]));
    };

    return (
        <MainLayout
            title="Edit Role"
            subTitle="Fill the form below to edit data."
            pageToolbar={<PageToolbar />}
        >
            <Head title="Edit Role" />

            <form
                onSubmit={handleSubmit}
                className="p-5 space-y-10 bg-white rounded-md shadow"
            >
                <FormField
                    data={data}
                    setData={setData}
                    errors={errors}
                    availablePermissions={availablePermissions}
                />

                <Button disabled={processing}>Save</Button>
            </form>
        </MainLayout>
    );
};

export default Edit;
