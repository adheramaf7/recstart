import ApplicationLogo from "@/components/application-logo";
import { ApplicationMenubar } from "@/components/application-menubar";
import ApplicationSheetMenu from "@/components/application-sheet-menu";
import { Button } from "@/components/ui/button";
import UserDropdown from "@/components/user-dropdown";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { LuGanttChart } from "react-icons/lu";

export default function MainLayout({
    children,
    title,
    subTitle,
    pageToolbar,
}: PropsWithChildren<{
    title: string;
    subTitle?: string;
    pageToolbar?: React.ReactNode;
}>) {
    const pageProps = usePage<PageProps>().props;

    useEffect(() => {
        if (pageProps.flash?.type == "success") {
            toast.success(pageProps.flash.message);
        } else if (pageProps.flash?.type == "error") {
            toast.error(pageProps.flash.message);
        } else {
            toast.remove();
        }

        return () => {
            toast.remove();
            console.log("cleanup toast");
        };
    }, [pageProps.flash?.id]);

    return (
        <>
            <header className="fixed top-0 z-50 w-screen h-16 bg-white border-b shadow-sm">
                <div className="container flex flex-row items-center justify-between h-full">
                    <div className="flex flex-row">
                        <ApplicationSheetMenu />
                        <ApplicationLogo className="hidden h-10 md:block" />
                    </div>
                    <UserDropdown />
                </div>
            </header>
            <div className="flex flex-col h-full min-h-screen pt-16 bg-gray-100">
                <nav className="hidden w-full bg-white border-b h-14 md:block">
                    <div className="container flex items-center h-full">
                        <ApplicationMenubar />
                    </div>
                </nav>
                <main className="container pt-4">
                    <div className="flex items-center justify-between mb-6">
                        <div className="space-y-2">
                            {title && (
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    {title}
                                </h2>
                            )}
                            {subTitle && (
                                <p className="text-sm tracking-tight text-muted-foreground">
                                    {subTitle}
                                </p>
                            )}
                        </div>
                        <div>{pageToolbar}</div>
                    </div>
                    <section>{children}</section>
                </main>
                <footer className="container pt-10 pb-4 mt-auto text-xs text-gray-600">
                    Copyright &copy; {new Date().getFullYear()}
                </footer>
            </div>
            <Toaster position="top-center" />
        </>
    );
}
