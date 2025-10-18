export type LoginDto = {
    username: string;
    password: string;
};

export type AuthResponse = {
    token: string;
    // if backend returns user data:
    user?: {
        id: string;
        username: string;
        name?: string;
        email?: string;
    };
};

/* Client domain */
export type CreateClientDto = {
    username: string;
    passwordHash: string;
    name: string;
    address?: string;
    phone?: string;
};
export type UpdateClientDto = Partial<CreateClientDto>;
export type Client = {
    id: string;
    username: string;
    name: string;
    address?: string;
    phone?: string;
    // metadata...
};
