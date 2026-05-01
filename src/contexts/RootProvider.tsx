"use client";

import { ReactNode, useMemo, useState } from "react";
import {
    RootContext,
} from "./RootContext";
import { ICartItem, IUserPrivateInfo } from "@/shared/interface";

type RootProviderProps = {
    children: ReactNode;
};

const RootProvider = ({ children }: RootProviderProps) => {
    const [count, setCount] = useState(1);
    const [authEnable, setAuthEnable] = useState(false);
    const [cartEnable, setCartEnable] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [loginVisible, setLoginVisible] = useState(true);
    const [currentCartItem, setCurrentCartItem] = useState<ICartItem[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<import('./RootContext').LoggedInUser | null>(null);
    const [totalCartAmount, setTotalCartAmount] = useState(0);
    const [forgetPasswordModalVisible, setForgetPasswordModalVisible] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [promoCodeApplied, setPromoCodeApplied] = useState(false);
    const [cryptoModalVisible, setCryptoModalVisible] = useState(false);
    const [userPrivateInfo, setUserPrivateInfo] = useState<IUserPrivateInfo | null>(null);
    const [sampleLimitCount, setSampleLimitCount] = useState<number | null>(null);

    const contextValue = useMemo(
        () => ({
            count,
            setCount,
            authEnable,
            setAuthEnable,
            cartEnable,
            setCartEnable,
            currentCartItem,
            setCurrentCartItem,
            loggedInUser,
            setLoggedInUser,
            totalCartAmount,
            setTotalCartAmount,
            loginVisible,
            setLoginVisible,
            authLoading,
            setAuthLoading,
            forgetPasswordModalVisible,
            setForgetPasswordModalVisible,
            promoCode,
            setPromoCode,
            promoCodeApplied,
            setPromoCodeApplied,
            cryptoModalVisible,
            setCryptoModalVisible,
            userPrivateInfo,
            setUserPrivateInfo,
            sampleLimitCount,
            setSampleLimitCount
        }),
        [count, authEnable, cartEnable, currentCartItem, loggedInUser, totalCartAmount, loginVisible, authLoading, forgetPasswordModalVisible, setForgetPasswordModalVisible, promoCode, setPromoCode, promoCodeApplied, setPromoCodeApplied, cryptoModalVisible, userPrivateInfo, sampleLimitCount]
    );

    return <RootContext.Provider value={contextValue}>{children}</RootContext.Provider>;
};

export default RootProvider;
