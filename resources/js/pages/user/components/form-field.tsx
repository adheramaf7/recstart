import { Input } from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { errorsFormData, setFormData } from "@/types";

export type TFormUser = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
};

type TFormFieldProps = {
    data: TFormUser;
    setData: setFormData<TFormUser>;
    errors: errorsFormData<TFormUser>;
    roles: Role[];
};

const FormField = ({ data, setData, errors, roles }: TFormFieldProps) => {
    return (
        <div className="max-w-xl space-y-8">
            <section>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        User Profile
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        User's profile information and email address.
                    </p>
                </header>
                <div className="mt-4 space-y-4">
                    <div className="space-y-2">
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
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => {
                                setData("email", e.target.value);
                            }}
                        />
                        {errors.email && <InputError message={errors.email} />}
                    </div>
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Select
                            value={data.role}
                            onValueChange={(value) => setData("role", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem
                                        key={role.id}
                                        value={role.id + ""}
                                    >
                                        {role.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.role && <InputError message={errors.role} />}
                    </div>
                </div>
            </section>
            <section>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        User Password
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Ensure using a long, random password to stay secure.
                    </p>
                </header>
                <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => {
                                setData("password", e.target.value);
                            }}
                        />
                        {errors.password && (
                            <InputError message={errors.password} />
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation">
                            Password Confirmation
                        </Label>
                        <Input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => {
                                setData(
                                    "password_confirmation",
                                    e.target.value
                                );
                            }}
                        />
                        {errors.password_confirmation && (
                            <InputError
                                message={errors.password_confirmation}
                            />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FormField;
