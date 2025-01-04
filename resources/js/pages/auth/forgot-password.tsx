import GuestLayout from "@/layouts/guest-layout";
import InputError from "@/components/ui/input-error";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/layouts/auth-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Forgot Your Password?</CardTitle>
                <CardDescription>
                    Enter your email below, and we'll send you a link to reset
                    it.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="youremail@mail.com"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={errors.email} />
                    </div>

                    <Button disabled={processing}>
                        Email Password Reset Link
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

ForgotPassword.layout = (page: React.ReactNode) => (
    <AuthLayout children={page} title="Forgot Password" />
);
