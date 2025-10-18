import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60, // 1min
        },
        mutations: {
            retry: false,
            onError: (err) => {
                // handle global mutation error
                console.log(err);
            },
        },
    },
});
