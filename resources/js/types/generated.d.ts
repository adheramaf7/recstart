export type TPermission = {
id: number;
name: string;
};
export type TRole = {
id: number;
name: string;
created_at: string;
updated_at: string;
};
export type TUser = {
id: number;
name: string;
email: string;
email_verified_at: string | null;
created_at: string;
updated_at: string;
};
