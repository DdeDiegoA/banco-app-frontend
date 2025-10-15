import {
    createBrowserRouter,
    Outlet,
    type RouteObject,
} from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { privateRoutes } from "./private.routes";

const children: RouteObject[] = [...publicRoutes, ...privateRoutes];

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                Home <Outlet />{" "}
            </div>
        ),
        children,
    },
    {
        path: "*",
        element: <div>Error 404</div>,
    },
]);
