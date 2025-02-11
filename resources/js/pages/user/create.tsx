import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/main-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import FormField, { TFormUser } from "./components/form-field";
import { ChevronLeftIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
                        roles={roles}
                    />

                    <div className="flex gap-2">
                        <Button disabled={processing}>Save</Button>
                        <Button
                            disabled={processing}
                            variant={"outline"}
                            asChild
                        >
                            <Link href={route("users.index")}>Cancel</Link>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

Create.layout = (page: React.ReactNode) => (
    <MainLayout title="Create User" children={page} />
);
