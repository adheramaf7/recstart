import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/main-layout";
import { Link, useForm } from "@inertiajs/react";
import FormField, { TFormRole } from "./components/form-field";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import { Card, CardContent } from "@/components/ui/card";

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
        <Card>
            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 pt-5"
                >
                    <FormField
                        data={data}
                        setData={setData}
                        errors={errors}
                        availablePermissions={availablePermissions}
                    />

                    <div className="flex gap-2">
                        <Button disabled={processing}>Save</Button>
                        <Button
                            disabled={processing}
                            variant={"outline"}
                            asChild
                        >
                            <Link href={route("roles.index")}>Cancel</Link>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

Edit.layout = (page: React.ReactNode) => (
    <MainLayout title="Edit Role" children={page} />
);
