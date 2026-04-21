'use client';

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const useTabletViewport = (onChange?: (isTablet: boolean) => void): boolean => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        Promise.resolve().then(() => setIsClient(true));
    }, []);

    const matches = useMediaQuery({ maxWidth: 991 }, undefined, onChange);
    return matches && isClient;
};
