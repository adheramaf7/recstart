type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string /* Date */;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
    created_by: number | null;
    updated_by: number | null;
};
