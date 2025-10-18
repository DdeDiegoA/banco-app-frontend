import { create } from "zustand";
import Cookies from "js-cookie";

// Helper to safely parse user data from cookie
const getUserFromCookie = (): User | null => {
    const userCookie = Cookies.get("user");
    if (!userCookie) return null;
    try {
        return JSON.parse(userCookie);
    } catch (error) {
        console.error("Error parsing user cookie", error);
        return null;
    }
};

type User = {
    id?: string;
    username?: string;
    name?: string;
    email?: string;
    // agrega lo que necesites
};

type AuthState = {
    accessToken: string | null;
    user: User | null;
    setAuth: (token: string, user?: User) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
    accessToken: Cookies.get("accessToken") || null,
    user: getUserFromCookie(),
    setAuth: (token: string, user?: User) => {
        const userToStore = user || null;
        // Guardamos en cookies. Considera añadir { secure: true, sameSite: 'strict' } en producción.
        Cookies.set("accessToken", token, { expires: 7 });
        if (userToStore) {
            Cookies.set("user", JSON.stringify(userToStore), { expires: 7 });
        } else {
            Cookies.remove("user");
        }
        set({ accessToken: token, user: userToStore });
    },
    logout: () => {
        // Limpiamos cookies
        Cookies.remove("accessToken");
        Cookies.remove("user");
        // Limpiamos el estado en memoria
        set({ accessToken: null, user: null });
    },
}));

/**
 * Helpers for non-react code (eg: axios interceptors)
 * - getAccessToken: read current token without hook
 * - handleLogout: clear storage and optionally redirect
 */
export const getAccessToken = () => useAuthStore.getState().accessToken;
export const handleLogout = () => {
    useAuthStore.getState().logout();
    // opcion: redirect to login
    if (typeof window !== "undefined") {
        window.location.href = "/login";
    }
};