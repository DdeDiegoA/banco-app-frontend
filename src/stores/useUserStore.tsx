import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserData } from "../types/user.types";

/* Estado inicial para el store */
const initialState: UserData = {
    client: undefined,
    accounts: [],
    transactions: [],
    ledgerEntries: [],
};

type UserState = {
    userData: UserData;
    setUserData: (data: UserData) => void;
    updateUserData: (data: Partial<UserData>) => void;
    clearUserData: () => void;
};

/**
 * Persistimos SOLO client + accounts (partialize) para:
 * - reducir la huella en localStorage
 * - evitar persistir datos potencialmente sensibles o pesados
 */
export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userData: initialState,

            setUserData: (data) => set({ userData: data }),

            updateUserData: (data) =>
                set((state) => ({ userData: { ...state.userData, ...data } })),

            clearUserData: () => set({ userData: initialState }),
        }),
        {
            name: "user-storage", // key en localStorage
            /**
             * partialize: control fino de qué partes del estado persistir.
             * Aquí persistimos solamente client y accounts.
             */
            partialize: (state) => ({
                userData: {
                    client: state.userData.client,
                    accounts: state.userData.accounts,
                    transactions: state.userData.transactions,
                    ledgerEntries: state.userData.ledgerEntries,
                },
            }),
            // opcional: version y migrate para cambios futuros del schema
            // version: 1,
            // migrate: (persistedState, version) => { ... }
        }
    )
);
