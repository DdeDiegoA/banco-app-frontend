import { useMutation } from "@tanstack/react-query";
import {
    getMovesRequest,
    transferRequest,
} from "../services/transactions.service";
import { useGlobalStore } from "../stores/useGlobalStore";
import { showAlert } from "../stores/useAlertStore"; // 👈 importamos helper para alertas
import type {
    TransferInput,
    TransferResponseDTO,
} from "../types/transactions.types";
import { useNavigate } from "react-router-dom";
import type { LedgerEntry } from "../types/user.types";
import { useUserStore } from "../stores/useUserStore";

/**
 * useTransfer: mutation hook para realizar transferencias
 * - muestra el spinner global mientras dura la petición
 * - muestra alerta global al finalizar (success / error)
 */
export const useTransfer = () => {
    const { showLoader, hideLoader } = useGlobalStore();
    const navigate = useNavigate();

    return useMutation<TransferResponseDTO, Error, TransferInput>({
        mutationFn: async (input) => {
            showLoader("Procesando transferencia...");
            try {
                const res = await transferRequest(input);
                return res;
            } finally {
                hideLoader(); // aseguramos ocultarlo siempre
            }
        },

        onSuccess: () => {
            showAlert({
                type: "success",
                title: "Transferencia exitosa",
                message:
                    "La transferencia se realizó correctamente y los fondos fueron enviados.",
            });
            navigate("/transactions");
        },

        onError: (err) => {
            console.error("Transfer failed:", err);

            showAlert({
                type: "error",
                title: "Error al transferir",
                message:
                    err?.message ||
                    "No fue posible completar la transferencia. Intenta nuevamente más tarde.",
            });
        },
    });
};

export const useGetMoves = () => {
    const { updateUserData } = useUserStore();
    const { showLoader, hideLoader } = useGlobalStore();
    return useMutation<LedgerEntry[], Error>({
        mutationFn: async () => {
            showLoader("Verificando movimientos...");
            try {
                const res = await getMovesRequest();
                updateUserData({ ledgerEntries: res });
                return res;
            } finally {
                hideLoader(); // aseguramos ocultarlo siempre
            }
        },
        onSuccess: () => {
            // showAlert({
            //     type: "success",
            //     title: "Movimientos obtenidos",
            //     message: "Los movimientos se obtuvieron correctamente.",
            // });
        },
        onError: (err) => {
            console.error("Transfer failed:", err);

            showAlert({
                type: "error",
                title: "Error al obtener movimientos",
                message:
                    err?.message ||
                    "No fue posible obtener los movimientos. Intenta nuevamente más tarde.",
            });
        },
    });
};
