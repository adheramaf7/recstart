import { Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import ApplicationLogo from "@/components/application-logo";

interface IAuthLayoutProps {
    children: React.ReactNode;
    title: string;
}

function AuthLayout({ children, title }: IAuthLayoutProps) {
    const { props } = usePage<PageProps>();

    return (
        <>
            <Head title={title} />
            <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-4">
                    <div className="flex justify-center">
                        <ApplicationLogo className="w-1/2" />
                    </div>
                    <div className={"flex flex-col gap-6"}>
                        {children}
                        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
                            Copyright &copy;
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthLayout;
