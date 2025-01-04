import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AuthLayout from "@/layouts/auth-layout";
import GuestLayout from "@/layouts/guest-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Verify Email</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4 text-gray-600">
                    Could you verify your email address by clicking on the link
                    we just emailed to you? If you didn't receive the email, we
                    will gladly send you another.
                </div>

                {status === "verification-link-sent" && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        A new verification link has been sent to the email
                        address you provided during registration.
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="flex items-center justify-between mt-4">
                        <Button disabled={processing}>
                            Resend Verification Email
                        </Button>

                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="text-sm text-gray-600 underline rounded-md hover:text-gray-900"
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

VerifyEmail.layout = (page: React.ReactNode) => (
    <AuthLayout title="Verify Email" children={page} />
);
