"use client";
import dynamic from "next/dynamic";
import { ReactNode, useEffect, useState } from "react";

import { useRootContext } from "@/contexts/RootContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getAddToCartLocal, getUser, setUser } from "@/services/tokenService";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ICartItem } from "@/shared/interface";

interface ILayoutCommonComponents {
    children: ReactNode;
}

const QUERY_CACHE_VERSION = process.env.NEXT_PUBLIC_QUERY_CACHE_VERSION ?? "1";

declare global {
    interface Window {
        __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
        __CACHE_VERSION__?: string;
    }
}
const AuthModal = dynamic(
    () => import("@/components/authModal/AuthModal")
);
const CartModal = dynamic(
    () => import("@/components/cartModal/CartModal")
);
const ForgotPasswordModal = dynamic(
    () => import("@/components/forgotPasswordModal/ForgotPasswordModal")
);

const LayoutCommonComponents = (props: ILayoutCommonComponents) => {
    const { children } = props;
    const { cartEnable, authEnable, currentCartItem, setCurrentCartItem, setLoggedInUser, setAuthLoading, loggedInUser, setTotalCartAmount, setPromoCodeApplied, setPromoCode } = useRootContext();

    const setupLocalUser = () => {
        const user = getUser();
        setLoggedInUser(user);
        setAuthLoading(false);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hasAuthCallbackHash =
                window.location.hash?.includes("auth_result") || window.location.hash?.includes("auth_error");
            if (hasAuthCallbackHash) return;
        }

        if (!loggedInUser) {
            setupLocalUser();
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const hasAuthCallbackHash =
            window.location.hash?.includes("auth_result") || window.location.hash?.includes("auth_error");
        if (!hasAuthCallbackHash) return;

        const decodeBase64Url = (value: string) => {
            const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
            const padLength = (4 - (normalized.length % 4)) % 4;
            const padded = `${normalized}${"=".repeat(padLength)}`;
            return atob(padded);
        };

        try {
            const hashValue = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : window.location.hash;
            const hashParams = new URLSearchParams(hashValue);
            const authResult = hashParams.get("auth_result");
            const authError = hashParams.get("auth_error");

            if (authResult) {
                const parsed = JSON.parse(decodeBase64Url(authResult));
                setUser(parsed);
                setLoggedInUser(parsed);
                setAuthLoading(false);
            } else if (authError) {
                setAuthLoading(false);
            }
        } catch (_error) {
            setAuthLoading(false);
        } finally {
            const newUrl = `${window.location.pathname}${window.location.search}`;
            window.history.replaceState(null, "", newUrl);
        }
    }, [setAuthLoading, setLoggedInUser]);

    useEffect(() => {
        if (currentCartItem?.length) {
            setCurrentCartItem(currentCartItem);
        } else {
            setCurrentCartItem(getAddToCartLocal() || []);
        }
    }, []);


    useEffect(() => {
        if (currentCartItem?.length) {
            let totalPrice = 0;
            currentCartItem?.map((element: ICartItem) => {
                totalPrice += element.price;
            });

            setTotalCartAmount(totalPrice);
        } else {
            setTotalCartAmount(0);
        }

        setPromoCodeApplied(false)
        setPromoCode("")
    }, [currentCartItem]);

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 1,
                        refetchOnWindowFocus: false,
                        staleTime: 60_000,
                    },
                    mutations: {
                        retry: 1,
                    },
                },
            })
    );

    useEffect(() => {
        const previousVersion = window.__CACHE_VERSION__;
        if (previousVersion && previousVersion !== QUERY_CACHE_VERSION) {
            queryClient.clear();
        }

        window.__CACHE_VERSION__ = QUERY_CACHE_VERSION;
        window.__TANSTACK_QUERY_CLIENT__ = queryClient;
    }, [queryClient]);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                {children}
                {process.env.NODE_ENV === "development" ? <ReactQueryDevtools initialIsOpen={false} /> : null}
            </QueryClientProvider>
            <AuthModal />
            <CartModal />
            <ForgotPasswordModal />
        </>
    );
};

export default LayoutCommonComponents;
