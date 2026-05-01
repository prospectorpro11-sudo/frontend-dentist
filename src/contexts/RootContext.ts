"use client";
import { ICartItem, IUserPrivateInfo } from "@/shared/interface";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type LoggedInUser = {
    name: string;
    email: string;
    displayName: string;
    avatar?: string;
    country?: string;
    companyName?: string;
    companyWebsite?: string;
    streetAddress?: string;
    streetAddress2?: string;
    city?: string;
    state?: string;
    zip?: string;
};

export type RootContextValue = {
    authEnable: boolean;
    setAuthEnable: (value: boolean) => void;
    cartEnable: boolean;
    setCartEnable: (value: boolean) => void;
    currentCartItem: ICartItem[];
    setCurrentCartItem: (items: ICartItem[]) => void;
    loggedInUser: LoggedInUser | null;
    setLoggedInUser: (user: LoggedInUser | null) => void;
    count: number;
    setCount: (nextCount: number) => void;
    totalCartAmount: number;
    setTotalCartAmount: (amount: number) => void;
    loginVisible: boolean;
    setLoginVisible: Dispatch<SetStateAction<boolean>>;
    authLoading: boolean;
    setAuthLoading: Dispatch<SetStateAction<boolean>>;
    forgetPasswordModalVisible: boolean;
    setForgetPasswordModalVisible: Dispatch<SetStateAction<boolean>>;
    promoCode: string;
    setPromoCode: Dispatch<SetStateAction<string>>;
    promoCodeApplied: boolean;
    setPromoCodeApplied: Dispatch<SetStateAction<boolean>>;
    cryptoModalVisible: boolean;
    setCryptoModalVisible: Dispatch<SetStateAction<boolean>>;
    userPrivateInfo: IUserPrivateInfo | null;
    setUserPrivateInfo: Dispatch<SetStateAction<IUserPrivateInfo | null>>;
    sampleLimitCount: number | null;
    setSampleLimitCount: Dispatch<SetStateAction<number | null>>;
};

export const RootContext = createContext<RootContextValue | undefined>(undefined);

export const useRootContext = (): RootContextValue => {
    const context = useContext(RootContext);

    if (!context) {
        throw new Error("useRootContext must be used within a RootProvider");
    }

    return context;
};
