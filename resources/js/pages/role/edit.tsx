import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/main-layout";
import { Link, useForm } from "@inertiajs/react";
import FormField, { TFormRole } from "./components/form-field";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Role</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormField
                        data={data}
                        setData={setData}
                        errors={errors}
                        availablePermissions={availablePermissions}
                    />
                </CardContent>
                <CardFooter className="gap-2">
                    <Button disabled={processing}>Save</Button>
                    <Button disabled={processing} variant={"outline"} asChild>
                        <Link href={route("roles.index")}>Cancel</Link>
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}

Edit.layout = (page: React.ReactNode) => (
    <MainLayout title="Edit Role" children={page} />
);
