import {
    createBrowserRouter,
    type RouteObject,
} from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { privateRoutes } from "./private.routes";
import HomePage from "../pages/HomePage/HomePage";

const children: RouteObject[] = [...publicRoutes, ...privateRoutes];

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
           <HomePage/>
           
        ),
        children,
    },
    {
        path: "*",
        element: <div>Error 404</div>,
    },
]);
