type Permission = {
    id: number;
    name: string;
    group: PermissionGroup;
    guard_name: string;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
    users?: User[] | null;
};
