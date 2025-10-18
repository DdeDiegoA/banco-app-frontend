import {
    createBrowserRouter,
    Outlet,
    type RouteObject,
} from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { privateRoutes } from "./private.routes";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { PublicOnlyRoute } from "../components/PublicOnlyRoute/PublicOnlyRoute";
import GlobalSpinner from "../components/GlobalSpinner/GlobalSpinner";
import GlobalAlert from "../components/GlobalAlert/GlobalAlert";

const children: RouteObject[] = [...publicRoutes, ...privateRoutes];

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <GlobalSpinner />
                <GlobalAlert />
                <Outlet />
            </div>
        ),
        children,
    },
    {
        path: "/login",
        element: (
            <PublicOnlyRoute>
                <LoginPage />
            </PublicOnlyRoute>
        ),
    },
    {
        path: "*",
        element: <div>Error 404</div>,
    },
]);
