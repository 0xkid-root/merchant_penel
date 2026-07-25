import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,

            gcTime: 10 * 60 * 1000,

            refetchOnWindowFocus: false,

            refetchOnReconnect: true,

            refetchOnMount: false,

            networkMode: "online",

            retry(failureCount, error: any) {
                const status = error?.response?.status;

                if ([400, 401, 403, 404].includes(status)) {
                    return false;
                }

                return failureCount < 2;
            },
        },

        mutations: {
            retry: false,
        },
    },
});