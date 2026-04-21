import { FaAddressBook, FaCartPlus, FaEnvelope, FaFax, FaPhone } from "react-icons/fa6";
import styles from "./prospectorStats.module.scss";

const ProspectorStats = () => {
    return (
        <div className={styles.stats}>
            <div className={styles.stat}>
                <div className={styles.sico}><FaAddressBook /></div>
                <div>
                    <div className={styles.sval}>930,285</div>
                    <div className={styles.slab}>Contacts</div>
                </div>
            </div>
            <div className={styles.stat}>
                <div className={styles.sico}><FaEnvelope /></div>
                <div>
                    <div className={styles.sval}>930,285</div>
                    <div className={styles.slab}>Emails</div>
                </div>
            </div>
            <div className={styles.stat}>
                <div className={styles.sico}><FaPhone /></div>
                <div>
                    <div className={styles.sval}>930,285</div>
                    <div className={styles.slab}>Phones</div>
                </div>
            </div>
            <div className={styles.stat}>
                <div className={styles.sico}><FaFax /></div>
                <div>
                    <div className={styles.sval}>930,285</div>
                    <div className={styles.slab}>Faxes</div>
                </div>
            </div>
        </div>
    );
};

export default ProspectorStats;