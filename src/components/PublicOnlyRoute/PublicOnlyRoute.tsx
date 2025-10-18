import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface PublicOnlyRouteProps {
    children: React.ReactElement;
}

export const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
    const isAuthenticated = !!Cookies.get("accessToken");

    if (isAuthenticated) {
        // Si el usuario ya está autenticado, lo redirige al dashboard
        return <Navigate to="/" replace />;
    }

    // Si no está autenticado, permite el acceso a la ruta (ej. /login)
    return children;
};
