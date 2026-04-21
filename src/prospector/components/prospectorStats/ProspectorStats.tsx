import styles from "./prospectorStats.module.scss";
import { numberWithCommas } from "@/shared/InternalService";
import { FaAddressBook, FaEnvelope, FaFax, FaPhone } from "react-icons/fa6";

const ProspectorStats = () => {
    const statsData = [
        { label: "Contacts", value: 930285, Icon: FaAddressBook },
        { label: "Emails", value: 930285, Icon: FaEnvelope },
        { label: "Phones", value: 930285, Icon: FaPhone },
        { label: "Faxes", value: 930285, Icon: FaFax },
    ];

    return (
        <div className={styles.stats}>
            {statsData.map(({ label, value, Icon }) => (
                <div key={label} className={styles.stat}>
                    <div className={styles.sico}>
                        <Icon />
                    </div>
                    <div>
                        <div className={styles.sval}>{numberWithCommas(value.toString())}</div>
                        <div className={styles.slab}>{label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProspectorStats;