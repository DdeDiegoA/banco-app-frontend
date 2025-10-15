import type { RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject[] = [
    {
        path: "protected-example",
        element: (
            // todo: Create protected component as a middleware
            <>
                <div>Protected Example</div>
            </>
        ),
    },
];
