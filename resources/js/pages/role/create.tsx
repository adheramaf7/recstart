import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/main-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import FormField, { TFormRole } from "./components/form-field";
import { ChevronLeftIcon } from "lucide-react";

const PageToolbar = () => {
    return (
        <div>
            <Button variant={"outline"} asChild>
                <Link href={route("roles.index")}>
                    <ChevronLeftIcon className="mr-2 text-base" /> Back
                </Link>
            </Button>
        </div>
    );
};

type TCreateProps = PageProps<{
    availablePermissions: Record<PermissionGroup, Permission[]>;
}>;

const Create = ({ availablePermissions }: TCreateProps) => {
    const { data, setData, errors, processing, post } = useForm<TFormRole>({
        name: "",
        permissions: [],
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("roles.store"));
    };

    return (
        <MainLayout
            title="Create Role"
            subTitle="Fill the form below to create new data."
            pageToolbar={<PageToolbar />}
        >
            <Head title="Create Role" />

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

                <Button disabled={processing}>Save</Button>
            </form>
        </MainLayout>
    );
};

export default Create;
