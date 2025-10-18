/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
    Client,
    CreateClientDto,
    UpdateClientDto,
} from "../types/api.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./api";

import type { UserData } from "../types/user.types";

/* fetchers */
export const fetchClients = async (): Promise<Client[]> => {
    const { data } = await axiosInstance.get<Client[]>("/clients");
    return data;
};

export const fetchUserProfile = async (): Promise<UserData> => {
    const { data } = await axiosInstance.get<UserData>("/clients/profile");
    return data;
};

export const fetchClient = async (id: string): Promise<Client> => {
    const { data } = await axiosInstance.get<Client>(`/clients/${id}`);
    return data;
};

export const createClient = async (
    payload: CreateClientDto
): Promise<Client> => {
    const { data } = await axiosInstance.post<Client>("/clients", payload);
    return data;
};

export const updateClient = async (
    id: string,
    payload: UpdateClientDto
): Promise<Client> => {
    const { data } = await axiosInstance.patch<Client>(
        `/clients/${id}`,
        payload
    );
    return data;
};

export const removeClient = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/clients/${id}`);
};

/* hooks for components */
export const useClients = () =>
    useQuery({ queryKey: ["clients"], queryFn: fetchClients });

export const useClient = (id?: string | null) =>
    useQuery({
        queryKey: ["clients", id],
        queryFn: () => fetchClient(id as string),
        enabled: !!id,
    });

export const useCreateClient = () => {
    const qc = useQueryClient();
    return useMutation<Client, Error, CreateClientDto>({
        mutationFn: createClient,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["clients"] });
        },
    });
};

export const useUpdateClient = (id?: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdateClientDto) =>
            updateClient(id as string, payload),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ["clients"] });
            qc.invalidateQueries({ queryKey: ["clients", id] });
        },
    });
};

export const useDeleteClient = () => {
    const qc = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: removeClient,

        onMutate: async (id) => {
            await qc.cancelQueries({ queryKey: ["clients"] });
            const previous = qc.getQueryData<Client[]>(["clients"]);
            qc.setQueryData(["clients"], (old?: Client[]) =>
                old ? old.filter((c) => c.id !== id) : []
            );
            return { previous };
        },
        onError: (_err, _id, context: any) => {
            if (context?.previous) {
                qc.setQueryData(["clients"], context.previous);
            }
        },
        onSettled: () => {
            qc.invalidateQueries({ queryKey: ["clients"] });
        },
    });
};
