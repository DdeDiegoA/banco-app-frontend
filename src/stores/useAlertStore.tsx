import { create } from "zustand";

export type AlertType = "success" | "warning" | "error";

type AlertState = {
    visible: boolean;
    type: AlertType;
    title?: string | null;
    message?: string | null;
    showAlert: (opts: {
        type: AlertType;
        message: string;
        title?: string;
    }) => void;
    hideAlert: () => void;
};

export const useAlertStore = create<AlertState>((set) => ({
    visible: false,
    type: "success",
    title: null,
    message: null,
    showAlert: ({ type, message, title }) =>
        set({ visible: true, type, message, title: title ?? null }),
    hideAlert: () => set({ visible: false, message: null, title: null }),
}));

// helpers for non-react contexts (optional)
export const showAlert = (opts: {
    type: AlertType;
    message: string;
    title?: string;
}) => useAlertStore.getState().showAlert(opts);
export const hideAlert = () => useAlertStore.getState().hideAlert();
