import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/main-layout";
import { Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import FormField, { TFormRole } from "./components/form-field";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Create Role</CardTitle>
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

Create.layout = (page: React.ReactNode) => (
    <MainLayout title="Create Role" children={page} />
);
