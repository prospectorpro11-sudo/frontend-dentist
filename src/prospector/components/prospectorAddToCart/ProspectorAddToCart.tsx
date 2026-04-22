'use client';
import { FaCartPlus } from "react-icons/fa6";
import styles from "./prospectorAddToCart.module.scss";
import { useProspectorContext } from "@/contexts/ProspectorContext";
import { numberWithCommas, PROSPECTOR_PRODUCT_PRICE_UPDATE } from "@/shared/InternalService";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";

const ProspectorAddToCart = () => {
    const { stats, prospectorLoading, price, setPrice, emailAvailability } = useProspectorContext();
    useEffect(() => {
        const calculatePrice = PROSPECTOR_PRODUCT_PRICE_UPDATE((stats?.totalContacts || 0), (stats?.Unique_Emails || 0), emailAvailability?.value);
        setPrice(calculatePrice);
    }, [stats, emailAvailability, setPrice])
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
            <button className={styles.cartbtn} type="button" disabled={prospectorLoading}>
                <FaCartPlus /> {prospectorLoading ? "Loading..." : "Add All to Cart"}
            </button>
        </div>
    );
};

export default ProspectorAddToCart;
