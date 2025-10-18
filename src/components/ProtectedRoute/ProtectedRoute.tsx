import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

/** Helper para decodificar un JWT y verificar expiración */
const isTokenExpired = (token: string): boolean => {
    try {
        const [, payloadBase64] = token.split(".");
        if (!payloadBase64) return true;

        const payload = JSON.parse(atob(payloadBase64));
        const exp = payload.exp;

        if (!exp) return true;

        const now = Math.floor(Date.now() / 1000); // segundos actuales
        return exp < now;
    } catch (err) {
        console.error("Error verificando token:", err);
        return true; // Si algo falla, tratamos el token como inválido
    }
};

interface ProtectedRouteProps {
    children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = Cookies.get("accessToken");

    // Si no existe token → no autenticado
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Verificar si expiró
    if (isTokenExpired(token)) {
        Cookies.remove("accessToken");
        return <Navigate to="/login" replace />;
    }

    // Token válido → renderiza la ruta protegida
    return children;
};
