type Role = {
    id: number;
    name: string;
    guard_name: string;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
    created_by: number | null;
    updated_by: number | null;
    users?: User[] | null;
};
