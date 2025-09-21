import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        //* peticion config here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
