import { Button } from "@/components/ui/button";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

type TErrorProps = PageProps & {
    status: number;
};

const title: Record<number, string> = {
    503: "Service Unavailable",
    500: "Server Error",
    404: "Page Not Found",
    403: "Forbidden",
};

const description: Record<number, string> = {
    503: "Sorry, we are doing some maintenance. Please check back soon.",
    500: "Whoops, something went wrong on our servers.",
    404: "Sorry, the page you are looking for could not be found.",
    403: "Sorry, you are forbidden from accessing this page.",
};
const Error = ({ status }: TErrorProps) => {
    return (
        <>
            <Head title={title[status]} />
            <section className="flex items-center h-screen bg-white dark:bg-gray-900">
                <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
                    <div className="max-w-screen-sm mx-auto text-center">
                        <h1 className="mb-4 font-extrabold tracking-tight text-7xl lg:text-9xl text-primary-600 dark:text-primary-500">
                            {status}
                        </h1>
                        <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
                            {title[status]}
                        </p>
                        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                            {description[status]}
                        </p>
                        <Button asChild>
                            <Link href="/">Back to Homepage</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Error;
