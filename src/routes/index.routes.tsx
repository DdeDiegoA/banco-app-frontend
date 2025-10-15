import {
    createBrowserRouter,
    type RouteObject
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import { privateRoutes } from "./private.routes";
import { publicRoutes } from "./public.routes";

const children: RouteObject[] = [...publicRoutes, ...privateRoutes];

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children,
    },
    {
        path: "*",
        element: <div>Error 404</div>,
    },
]);
