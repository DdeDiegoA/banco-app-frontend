import { create } from "zustand";

interface GlobalState {
    isLoading: boolean;
    loadingMessage: string | null;
    showLoader: (message?: string) => void;
    hideLoader: () => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
    isLoading: false,
    loadingMessage: null,
    showLoader: (message) =>
        set({ isLoading: true, loadingMessage: message ?? "Cargando..." }),
    hideLoader: () => set({ isLoading: false, loadingMessage: null }),
}));
