import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/main-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import FormField, { TFormUser } from "./components/form-field";
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

type CreateProps = PageProps<{
    roles: Role[];
}>;

export default function Create({ roles }: CreateProps) {
    const { data, setData, errors, processing, post } = useForm<TFormUser>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("users.store"));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Create User</CardTitle>
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

Create.layout = (page: React.ReactNode) => (
    <MainLayout title="Create User" children={page} />
);
