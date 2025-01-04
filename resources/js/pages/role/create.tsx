import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/main-layout";
import { Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import FormField, { TFormRole } from "./components/form-field";
import { Card, CardContent } from "@/components/ui/card";

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

Create.layout = (page: React.ReactNode) => (
    <MainLayout title="Create Role" children={page} />
);
