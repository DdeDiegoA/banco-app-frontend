import { create } from "zustand";

type GlobalSpinnerState = {
    isLoading: boolean;
    message: string | null;
    showSpinner: (message?: string) => void;
    hideSpinner: () => void;
};

export const useGlobalSpinnerStore = create<GlobalSpinnerState>((set) => ({
    isLoading: false,
    message: null,
    showSpinner: (message = "Cargando...") =>
        set({ isLoading: true, message }),
    hideSpinner: () => set({ isLoading: false, message: null }),
}));

// Helpers for non-react code
export const showSpinner = (message?: string) =>
    useGlobalSpinnerStore.getState().showSpinner(message);
export const hideSpinner = () => useGlobalSpinnerStore.getState().hideSpinner();
