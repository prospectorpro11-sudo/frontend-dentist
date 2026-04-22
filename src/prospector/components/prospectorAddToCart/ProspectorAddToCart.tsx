'use client';
import { FaCartPlus } from "react-icons/fa6";
import styles from "./prospectorAddToCart.module.scss";
import { useProspectorContext } from "@/contexts/ProspectorContext";
import { numberWithCommas } from "@/shared/InternalService";
import Skeleton from "react-loading-skeleton";

const ProspectorAddToCart = () => {
    const { stats, prospectorLoading } = useProspectorContext();
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
                        $452
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