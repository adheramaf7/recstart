import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/main-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import FormField, { TFormUser } from "./components/form-field";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import { TUserData } from "./components/columns";
import { ChevronLeftIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const PageToolbar = () => {
    return (
        <div>
            <Button variant={"outline"} asChild>
                <Link href={route("users.index")}>
                    <ChevronLeftIcon className="mr-2 text-base" /> Back
                </Link>
            </Button>
        </div>
    );
};

type EditProps = PageProps<{
    user: TUserData;
    roles: Role[];
}>;

export default function Edit({ user, roles }: EditProps) {
    const { data, setData, errors, processing, put } = useForm<TFormUser>({
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
        role: user.roles[0].id + "",
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("users.update", [user.id]));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Edit User</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormField
                        data={data}
                        setData={setData}
                        errors={errors}
                        roles={roles}
                    />
                </CardContent>
                <CardFooter className="gap-2">
                    <Button disabled={processing}>Save</Button>
                    <Button disabled={processing} variant={"outline"} asChild>
                        <Link href={route("users.index")}>Cancel</Link>
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}

Edit.layout = (page: React.ReactNode) => (
    <MainLayout title="Edit User" children={page} />
);
