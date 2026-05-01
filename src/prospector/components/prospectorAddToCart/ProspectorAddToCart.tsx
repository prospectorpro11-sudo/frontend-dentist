'use client';
import { useEffect } from "react";
import { FaCartPlus } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import styles from "./prospectorAddToCart.module.scss";
import { useAddToCart } from "@/shared/hooks/useAddToCart";
import { useProspectorContext } from "@/contexts/ProspectorContext";
import { useMobileViewport } from "@/shared/hooks/useMobileViewport";
import { numberWithCommas, PROSPECTOR_PRODUCT_PRICE_UPDATE } from "@/shared/InternalService";

const ProspectorAddToCart = () => {
    const { stats, prospectorLoading, price, setPrice, emailAvailability } = useProspectorContext();
    const isMobileViewpoert = useMobileViewport();
    const totalCount = stats?.totalContacts || 0;
    const { addToCart, isAddedToCart, isSameProductAdded } = useAddToCart();
    const formattedCount = numberWithCommas(totalCount.toString());
    // const leadLabel = "Dentist List";
    useEffect(() => {
        const calculatePrice = PROSPECTOR_PRODUCT_PRICE_UPDATE((stats?.totalContacts || 0), (stats?.Unique_Emails || 0), emailAvailability?.value);
        setPrice(calculatePrice);
    }, [stats, emailAvailability, setPrice])

    const ctaLabelDesktop = prospectorLoading
        ? "Loading..."
        : isSameProductAdded
            ? "List Selected"
            : isAddedToCart
                ? `Update ${formattedCount}`
                : "Add to Cart";
    const ctaLabelMobile = prospectorLoading
        ? "Loading..."
        : isSameProductAdded
            ? "List Selected"
            : isAddedToCart
                ? "Update List"
                : "Add to Cart";
    return (
        <div className={styles.checkout}>
            <div className={styles.cprice}>
                {prospectorLoading ? (
                    <>
                        <Skeleton width={80} height={15} />
                        <small>
                            <Skeleton width={95} height={10} />
                        </small>
                    </>
                ) : (
                    <>
                        ${numberWithCommas(price.toString(), 0)}
                        <small>{numberWithCommas(stats?.totalContacts.toString() || "0")} contacts</small>
                    </>
                )}
            </div>
            <button onClick={() => addToCart()} className={styles.cartbtn} type="button" disabled={prospectorLoading} aria-busy={prospectorLoading}>
                <FaCartPlus size={22} /> {isMobileViewpoert ? ctaLabelMobile : ctaLabelDesktop}
            </button>
        </div>
    );
};

export default ProspectorAddToCart;
