import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/main-layout";
import { Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import FormField, { TFormRole } from "./components/form-field";

type TCreateProps = PageProps<{
    availablePermissions: Record<PermissionGroup, Permission[]>;
}>;

export default function Create({ availablePermissions }: TCreateProps) {
    const { data, setData, errors, processing, post } = useForm<TFormRole>({
        name: "",
        permissions: [],
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("roles.store"));
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

Create.layout = (page: React.ReactNode) => (
    <MainLayout title="Create Role" children={page} />
);
