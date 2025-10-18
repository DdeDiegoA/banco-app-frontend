import axios from "axios";
import { getAccessToken, handleLogout } from "../stores/useAuthStore";
import {
    hideSpinner,
    showSpinner,
} from "../stores/useGlobalSpinnerStore";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: "application/json",
    },
    withCredentials: true, // si usas refresh token en cookie
});

/**
 * Request interceptor -> añadimos Authorization si hay token
 */
axiosInstance.interceptors.request.use(
    (config) => {
        showSpinner("Consultando..."); // Muestra el spinner
        const token = getAccessToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        hideSpinner(); // Oculta el spinner en caso de error en la petición
        return Promise.reject(error);
    }
);

/**
 * Response interceptor -> manejo global de errores (401)
 * Si tienes refresh token implementa un flujo de refresh aquí.
 */
axiosInstance.interceptors.response.use(
    (res) => {
        hideSpinner(); // Oculta el spinner al recibir una respuesta exitosa
        return res;
    },
    async (error) => {
        hideSpinner(); // Oculta el spinner en caso de error en la respuesta
        const status = error?.response?.status;

        if (status === 401) {
            try {
                handleLogout();
            } catch (e) {
                handleLogout();
                console.log(e);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
