import type { RouteObject } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";

export const privateRoutes: RouteObject[] = [
    {
        path: "home-page",
        element: (
            // todo: Create protected component as a middleware
            <HomePage />
        ),
    },
];
