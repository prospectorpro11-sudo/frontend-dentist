import { ICartItem } from "@/shared/interface";
const SUPPORT_GUEST_SESSION_KEY = "nursingreach-support-guest-session";

export const addToCartLocal = (cartItems: ICartItem[]) => {
    localStorage.setItem(
        "addToCart-NursingReach",
        JSON.stringify(cartItems)
    );
};

export const getUser = () => {
    return (
        typeof localStorage !== "undefined" &&
        JSON.parse(localStorage.getItem("NursingReach")!)
    );
};

export const setUser = (user: null) => {
    localStorage.setItem("NursingReach", JSON.stringify(user));
};

export const getAddToCartLocal = () => {
    return (
        typeof localStorage !== "undefined" &&
        JSON.parse(localStorage.getItem("addToCart-NursingReach")!)
    );
};

export const setPlisioLocal = (plisioObject: any) => {
    localStorage.setItem("plisioLocal-NursingReachUser", JSON.stringify(plisioObject));
};

export const getPlisioLocal = () => {
    return (
        typeof localStorage !== "undefined" &&
        JSON.parse(localStorage.getItem("plisioLocal-NursingReachUser")!)
    );
};

export const setProspectorFilters = (filters: any) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("nursing-filters", JSON.stringify(filters))
    }
};

export type SupportGuestSession = {
    chatId: string;
    guestToken: string;
    name: string;
    email: string;
};

export const getSupportGuestSession = (): SupportGuestSession | null => {
    if (typeof window === "undefined") return null;

    try {
        const raw = localStorage.getItem(SUPPORT_GUEST_SESSION_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);

        if (!parsed?.chatId || !parsed?.guestToken || !parsed?.name || !parsed?.email) {
            return null;
        }

        return parsed as SupportGuestSession;
    } catch (_error) {
        return null;
    }
};

export const setSupportGuestSession = (session: SupportGuestSession | null) => {
    if (typeof window === "undefined") return;

    if (!session) {
        localStorage.removeItem(SUPPORT_GUEST_SESSION_KEY);
        return;
    }

    localStorage.setItem(SUPPORT_GUEST_SESSION_KEY, JSON.stringify(session));
};
