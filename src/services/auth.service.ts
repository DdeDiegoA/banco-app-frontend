import { useLocation, useNavigate } from "react-router-dom";
import type { LoginDto, AuthResponse } from "../types/api.types";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./api";
import { useAuthStore } from "../stores/useAuthStore";
import { useUserStore } from "../stores/useUserStore";
import { fetchUserProfile } from "./clients.service";
import { useGlobalStore } from "../stores/useGlobalStore";

const login = async (payload: LoginDto): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>(
        "/auth/login",
        payload
    );
    return data;
};

export const useLogin = () => {
    const { showLoader, hideLoader } = useGlobalStore();
    const setAuth = useAuthStore((s) => s.setAuth);
    const { setUserData } = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();

    return useMutation<AuthResponse, Error, LoginDto>({
        mutationFn: async (payload: LoginDto) => {
            showLoader("Ingresando...");
            try {
                const res = await login(payload);
                return res;
            } finally {
                hideLoader();
            }
        },

        onSuccess: async (data) => {
            // 1. Guardar el token de autenticación
            setAuth(data.token, data.user);

            // 2. Obtener los datos completos del perfil del usuario
            const userProfileData = await fetchUserProfile();

            // 3. Guardar los datos del perfil en el store de usuario
            setUserData(userProfileData);

            // 4. Redirigir al dashboard
            if (location.pathname === "/login") {
                navigate("/");
            }
        },
        onError: (error) => {
            console.error("Error al Ingresar:", error);
            // Opcional: mostrar notificación de error al usuario
        },
    });
};
export const useLogout = () => {
    console.log("close");
    const { logout } = useAuthStore();
    const { clearUserData } = useUserStore();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        clearUserData();
        navigate("/login");
    };

    return onLogout;
};
