import ApplicationLogo from "@/components/application-logo";
import { ApplicationMenu } from "@/components/application-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<PageProps>().props;
    return (
        <>
            <header className="fixed top-0 left-0 w-full h-16 bg-white border-b shadow-sm z-[99]">
                <div className="container flex flex-row items-center justify-between h-full">
                    <ApplicationLogo className="h-10" />
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex flex-row items-center">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start ml-3 text-sm">
                                <p className="font-normal">{auth.user.name}</p>
                                <p className="text-xs text-gray-500">
                                    {auth.user.email}
                                </p>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="z-[99]">
                            <Link
                                href={route("profile.edit")}
                                className="w-full"
                            >
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="w-full"
                            >
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <div className="flex flex-col h-full min-h-screen pt-16 bg-gray-100">
                <nav className="w-full bg-white border-b h-14 ">
                    <div className="container flex items-center h-full">
                        <ApplicationMenu />
                    </div>
                </nav>
                <main className="container pt-4">{children}</main>
                <footer className="container pt-20 pb-4 mt-auto text-xs text-gray-600 pb-">
                    Copyright &copy; {new Date().getFullYear()}
                </footer>
            </div>
        </>
    );
}
