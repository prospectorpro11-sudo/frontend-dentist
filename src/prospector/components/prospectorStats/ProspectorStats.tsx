"use client";

import styles from "./prospectorStats.module.scss";
import { numberWithCommas } from "@/shared/InternalService";
import { useProspectorContext } from "@/contexts/ProspectorContext";
import { FaAddressBook, FaEnvelope, FaFax, FaPhone } from "react-icons/fa6";

const ProspectorStats = () => {
    const { stats } = useProspectorContext();
    const statsData = [
        { label: "Contacts", value: stats?.totalContacts, Icon: FaAddressBook },
        { label: "Emails", value: stats?.Unique_Emails, Icon: FaEnvelope },
        { label: "Phones", value: stats?.Unique_Phones, Icon: FaPhone },
        { label: "Faxes", value: stats?.Unique_Faxes, Icon: FaFax },
    ];

    return (
        <div className={styles.stats}>
            {statsData.map(({ label, value, Icon }) => (
                <div key={label} className={styles.stat}>
                    <div className={styles.sico}>
                        <Icon />
                    </div>
                    <div>
                        <div className={styles.sval}>{numberWithCommas(value?.toString() || "0")}</div>
                        <div className={styles.slab}>{label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProspectorStats;