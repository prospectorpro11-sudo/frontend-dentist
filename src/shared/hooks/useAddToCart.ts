import { useCallback, useMemo } from "react";

import { AddToCart, numberWithCommas, triggerForm } from "@/shared/InternalService";
import { PROSPECTOR_PRODUCT_ID } from "@/shared/constant";
import { useProspectorContext } from "@/contexts/ProspectorContext";
import { useRootContext } from "@/contexts/RootContext";
import { useBuildFilterList } from "@/shared/hooks/useBuildFilterList";

type UseAddToCartResult = {
    addToCart: () => void;
    isAddedToCart: boolean;
    isSameProductAdded: boolean;
};

export const useAddToCart = (): UseAddToCartResult => {
    const { stats, price, filtersEmpty, setProspectorLoading } = useProspectorContext();
    const { setCartEnable, setCurrentCartItem, currentCartItem } = useRootContext();
    const { filterList } = useBuildFilterList();

    const filterPartsStr = useMemo(() => {
        return filterList
            .filter(({ field, value }) => !(field === "Email" && value === "all") && value)
            .map(({ field, value }) => {
                if (field === "Email" && value === "true") {
                    return "Email: Email Contacts Only";
                } else if (field === "Email" && value === "false") {
                    return "Email: Non-Email Contacts";
                } else {
                    return `${field}: ${value}`;
                }
            })
            .join(", ");
    }, [filterList]);

    const totalContacts = stats?.totalContacts || 0;

    const productName = useMemo(() => {
        return `${numberWithCommas(stats?.totalContacts.toString() || "0")} Custom Nurse List (${filtersEmpty ? "Complete List" : filterPartsStr})`;
    }, [filterPartsStr, filtersEmpty, stats?.totalContacts]);

    const isAddedToCart = useMemo(
        () => currentCartItem.some((e) => e.id == PROSPECTOR_PRODUCT_ID),
        [currentCartItem]
    );

    const isSameProductAdded = useMemo(
        () => currentCartItem.some((e) => e.productName == productName),
        [currentCartItem, productName]
    );

    const addToCart = useCallback(() => {
        if (isSameProductAdded) {
            setCartEnable(true);
            return;
        }

        if (productName.length > 0 && price !== 0) {
            AddToCart([], setCurrentCartItem, PROSPECTOR_PRODUCT_ID, totalContacts, price, productName, null, filterList);
            setCartEnable(true);
            triggerForm({
                title: "",
                text: `${isAddedToCart ? "Filtered Leads have been updated in your cart!" : "Filtered Leads have been added to the cart"}`,
                icon: "success",
                confirmButtonText: "OK",
            });
            setProspectorLoading(false);
        } else {
            triggerForm({
                title: "",
                text: "Something went wrong, Re-Filter and try to AddToCart!",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    }, [
        filterList,
        isAddedToCart,
        isSameProductAdded,
        price,
        productName,
        setCartEnable,
        setCurrentCartItem,
        setProspectorLoading,
        totalContacts,
    ]);

    return { addToCart, isAddedToCart, isSameProductAdded };
};
