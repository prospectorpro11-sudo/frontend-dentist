export {};

declare global {
    interface Window {
        __TANSTACK_QUERY_CLIENT__?: import("@tanstack/query-core").QueryClient;
        __CACHE_VERSION__?: string;
        dataLayer?: Array<Record<string, unknown>>;
    }
}
