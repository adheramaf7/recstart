import ApplicationLogo from "@/components/application-logo";
import { ApplicationMenubar } from "@/components/application-menubar";
import UserDropdown from "@/components/user-dropdown";
import { PropsWithChildren } from "react";

export default function MainLayout({
    children,
    title,
    subTitle,
}: PropsWithChildren<{ title: string; subTitle?: string }>) {
    return (
        <>
            <header className="fixed top-0 w-screen h-16 bg-white border-b shadow-sm z-[99]">
                <div className="container flex flex-row items-center justify-between h-full">
                    <ApplicationLogo className="h-10" />
                    <UserDropdown />
                </div>
            </header>
            <div className="flex flex-col h-full min-h-screen pt-16 bg-gray-100">
                <nav className="w-full bg-white border-b h-14">
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
                    </div>
                    <section>{children}</section>
                </main>
                <footer className="container pt-20 pb-4 mt-auto text-xs text-gray-600">
                    Copyright &copy; {new Date().getFullYear()}
                </footer>
            </div>
        </>
    );
}
