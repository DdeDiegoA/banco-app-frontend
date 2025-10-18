/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
    TransferInput,
    TransferResponseDTO,
} from "../types/transactions.types";
import type { LedgerEntry } from "../types/user.types";
import axiosInstance from "./api";

export const toLedgerEntriesArray = (maybe: any): LedgerEntry[] => {
    // posibles shapes:
    // 1) { ledgerEntries: [...] }
    // 2) { data: [...] }
    // 3) [...] (ya un array)
    // 4) { somethingElse: { ledgerEntries: [...] } } -> no cubierto a menos que lo necesites

    const candidates = [
        maybe?.ledgerEntries,
        maybe?.data,
        maybe, // por si el propio res ya es un array
    ];

    for (const c of candidates) {
        if (!c) continue;
        if (Array.isArray(c)) {
            // opcional: normalizar campos
            return c.map((it: any) => ({
                id: String(it.id),
                type: it.type,
                amountCents: it.amountCents ?? it.amount ?? "0",
                createdAt:
                    it.createdAt ?? it.created_at ?? new Date().toISOString(),
                account: it.account ?? null,
                transaction: it.transaction ?? null,
                // ...mapea otros campos si lo deseas
            })) as LedgerEntry[];
        }
    }

    // fallback vacío (evita errores downstream)
    return [];
};

/**
 * transferRequest: envía la petición al backend.
 * Envía el monto en formato decimal (ej: 12.50), sin convertir a centavos.
 */
export const transferRequest = async (
    input: TransferInput
): Promise<TransferResponseDTO> => {
    if (!input) throw new Error("Invalid transfer input");

    const decimalAmount = Number(input.amount);
    if (!Number.isFinite(decimalAmount) || decimalAmount <= 0) {
        throw new Error("Invalid amount");
    }

    // Payload que enviamos tal cual lo espera el backend (decimal)
    const payloadToSend = {
        fromAccountNumber: input.fromAccountNumber,
        toAccountNumber: input.toAccountNumber,
        amount: decimalAmount, // 👈 se envía directamente como decimal
    };

    const { data } = await axiosInstance.post<TransferResponseDTO>(
        "/transactions/transfer",
        payloadToSend
    );

    return data;
};

export const getMovesRequest = async (): Promise<LedgerEntry[]> => {
    const { data } = await axiosInstance.get("/transactions/moves");
    return toLedgerEntriesArray(data);
};
