'use client';

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const useMobileViewport = (onChange?: (isMobile: boolean) => void): boolean => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        Promise.resolve().then(() => setIsClient(true));
    }, []);

    const matches = useMediaQuery({ maxWidth: 768 }, undefined, onChange);
    return matches && isClient;
};
