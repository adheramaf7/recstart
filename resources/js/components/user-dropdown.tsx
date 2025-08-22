// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { usePermission } from "@/hooks/use-permission";
// import { PageProps } from "@/types";
// import { Link, usePage } from "@inertiajs/react";

// function UserDropdown() {
//     const {
//         auth: { user },
//     } = usePage<PageProps>().props;

//     const { can } = usePermission();

//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger className="relative">
//                 <Avatar>
//                     <AvatarImage src="/images/profile.png" />
//                     {/* <AvatarFallback>SU</AvatarFallback> */}
//                 </Avatar>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="absolute z-50 w-44 -right-5">
//                 <DropdownMenuLabel className="flex flex-col space-y-1">
//                     <p className="font-medium leading-none truncate">
//                         {user.name}
//                     </p>
//                     <p className="text-xs font-normal text-gray-500 truncate">
//                         {user.email}
//                     </p>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 {can("update-profile", "update-password") && (
//                     <>
//                         <Link href={route("profile.edit")} className="w-full">
//                             <DropdownMenuItem className="cursor-pointer">
//                                 Profile
//                             </DropdownMenuItem>
//                         </Link>
//                         <DropdownMenuSeparator />
//                     </>
//                 )}
//                 <Link
//                     href={route("logout")}
//                     method="post"
//                     as="button"
//                     className="w-full"
//                 >
//                     <DropdownMenuItem className="cursor-pointer">
//                         Logout
//                     </DropdownMenuItem>
//                 </Link>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     );
// }

// export default UserDropdown;
