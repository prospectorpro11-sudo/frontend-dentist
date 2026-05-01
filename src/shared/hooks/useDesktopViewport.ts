import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

export const useDesktopViewport = (): boolean => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        Promise.resolve().then(() => setIsClient(true));
    }, []);

    return useMediaQuery({ minWidth: 992 }, undefined, () => ({ matches: false })) && isClient;
};