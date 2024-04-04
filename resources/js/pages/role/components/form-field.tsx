import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import { errorsFormData, setFormData } from "@/types";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useMemo } from "react";

export interface FormRoleData {
    name: string;
    permissions: number[];
}

interface FormFieldProps {
    data: FormRoleData;
    setData: setFormData<FormRoleData>;
    errors: errorsFormData<FormRoleData>;
    availablePermissions: Record<PermissionGroup, Permission[]>;
}

const FormField = ({
    data,
    setData,
    errors,
    availablePermissions,
}: FormFieldProps) => {
    const permissionIDs = useMemo(() => {
        return Object.values(availablePermissions)
            .reduce((previous, current) => [...previous, ...current], [])
            .map((permission) => permission.id);
    }, [availablePermissions]);

    const handleCheckAll = () => {
        setData("permissions", permissionIDs);
    };

    const handleClearAll = () => {
        setData("permissions", []);
    };

    const handleCheckedChange = (
        permissionID: number,
        checked: CheckedState
    ) => {
        if (checked === true) {
            setData("permissions", [...data.permissions, permissionID]);
        } else {
            setData(
                "permissions",
                data.permissions.filter((value) => value != permissionID)
            );
        }
    };

    return (
        <div className="space-y-4">
            <div className="max-w-lg space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => {
                        setData("name", e.target.value);
                    }}
                />
                {errors.name && <InputError message={errors.name} />}
            </div>
            <section>
                <div className="flex flex-row items-start justify-between mb-3">
                    <div className="space-y-2">
                        <Label>Permissions</Label>
                        {errors.permissions && (
                            <InputError message={errors.permissions} />
                        )}
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant={"ghost"}
                            type="button"
                            onClick={handleCheckAll}
                        >
                            Check All
                        </Button>
                        <span className="text-gray-400">/</span>
                        <Button
                            type="button"
                            variant={"ghost"}
                            className="text-red-500 hover:text-red-500/90"
                            onClick={handleClearAll}
                        >
                            Clear All
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {Object.entries(availablePermissions).map(
                        ([group, permissions]) => (
                            <div className="rounded-sm shadow-sm" key={group}>
                                <div className="p-1 text-sm font-semibold text-gray-500 bg-gray-100 border-b">
                                    {group}
                                </div>
                                <div className="flex flex-row gap-3 p-2 pl-3">
                                    {permissions.map((permission) => (
                                        <div
                                            className="inline"
                                            key={permission.id}
                                        >
                                            <label className="flex items-center">
                                                <Checkbox
                                                    value={permission.id}
                                                    checked={data.permissions.includes(
                                                        permission.id
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        handleCheckedChange(
                                                            permission.id,
                                                            checked
                                                        );
                                                    }}
                                                />
                                                <span className="text-sm ms-2">
                                                    {permission.name.replaceAll(
                                                        "-",
                                                        " "
                                                    )}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>
        </div>
    );
};

export default FormField;
