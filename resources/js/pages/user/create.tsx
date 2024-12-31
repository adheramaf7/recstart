import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/main-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import FormField, { TFormUser } from "./components/form-field";
import { ChevronLeftIcon } from "lucide-react";

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

const Create = ({ roles }: CreateProps) => {
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
        <MainLayout
            title="Create User"
            subTitle="Fill the form below to create new data."
            pageToolbar={<PageToolbar />}
        >
            <Head title="Create User" />

            <form
                onSubmit={handleSubmit}
                className="p-5 space-y-10 bg-white rounded-md shadow"
            >
                <FormField
                    data={data}
                    setData={setData}
                    errors={errors}
                    roles={roles}
                />

                <Button disabled={processing}>Save</Button>
            </form>
        </MainLayout>
    );
};

export default Create;
