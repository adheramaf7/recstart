import { TUser } from "./generated";

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: TUser;
    };
};

