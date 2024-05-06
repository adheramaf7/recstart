import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

export const usePermission = () => {
    const permissions = usePage<PageProps>().props.permissions;

    const can = function (...permissionCheck: string[]) {
        return permissionCheck.some((value) => permissions?.includes(value));
    };

    return {
        can,
    };
};
