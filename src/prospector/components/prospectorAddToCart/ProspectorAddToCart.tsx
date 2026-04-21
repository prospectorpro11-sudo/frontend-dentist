import { FaCartPlus } from "react-icons/fa6";
import styles from "./prospectorAddToCart.module.scss";

const ProspectorAddToCart = () => {
    return (
        <div className={styles.checkout}>
            <div className={styles.cprice}>$452<small>2,847 contacts</small></div>
            <button className={styles.cartbtn} type="button"><FaCartPlus /> Add All to Cart</button>
        </div>
    );
};

export default ProspectorAddToCart;