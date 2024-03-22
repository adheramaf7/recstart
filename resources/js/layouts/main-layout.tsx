import { usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
    return <div>{children}</div>;
}
