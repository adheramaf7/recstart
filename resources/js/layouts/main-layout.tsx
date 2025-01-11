import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { PageProps } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function MainLayout({
    children,
    title,
    subtitle,
}: {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}) {
    const { props } = usePage<PageProps>();
    const flash = props.flash;

    useEffect(() => {
        if (flash?.message) {
            if (flash.type === "success") {
                toast.success(flash.message);
            }
            if (flash.type === "error") {
                toast.error(flash.message);
            }
        }
    }, [flash?.id]);
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title={title} />
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink asChild>
                                        <Link href="/"> {props.app_name}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="container flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
            <Toaster position="top-center" reverseOrder={false} />
        </SidebarProvider>
    );
}
