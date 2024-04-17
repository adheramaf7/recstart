import { useEffect, FormEventHandler } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import GuestLayout from "@/layouts/guest-layout";
import InputError from "@/components/ui/input-error";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="space-y-1">
                    <Label>Email</Label>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label>Password</Label>

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="block">
                        <label className="flex items-center">
                            <Checkbox
                                checked={data.remember}
                                onCheckedChange={(checked) => {
                                    setData("remember", checked as boolean);
                                }}
                            />
                            <span className="text-sm ms-2">Remember me</span>
                        </label>
                    </div>
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-gray-800 underline rounded-md hover:text-gray-900 focus:outline-none"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>
                <Button className="block w-full mt-6" disabled={processing}>
                    Login
                </Button>
            </form>
        </GuestLayout>
    );
}
