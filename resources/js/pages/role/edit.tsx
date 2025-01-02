import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/main-layout";
import { Link, useForm } from "@inertiajs/react";
import FormField, { TFormRole } from "./components/form-field";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";

type TEditProps = PageProps<{
    role: Role & { permissions: Permission[] };
    availablePermissions: Record<PermissionGroup, Permission[]>;
}>;

export default function Edit({ role, availablePermissions }: TEditProps) {
    const { data, setData, errors, processing, put } = useForm<TFormRole>({
        name: role.name,
        permissions: role.permissions.map((value) => value.id),
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("roles.update", [role.id]));
    };

    return (
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

            <div className="flex gap-2">
                <Button disabled={processing}>Save</Button>
                <Button disabled={processing} variant={"outline"} asChild>
                    <Link href={route("roles.index")}>Cancel</Link>
                </Button>
            </div>
        </form>
    );
}

Edit.layout = (page: React.ReactNode) => (
    <MainLayout title="Edit Role" children={page} />
);
