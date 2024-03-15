import ApplicationLogo from "@/components/application-logo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
            <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                <div className="flex justify-center mb-10">
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 text-gray-500 fill-current" />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
