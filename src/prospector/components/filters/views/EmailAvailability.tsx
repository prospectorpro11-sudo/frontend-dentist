import classNames from "classnames";

import styles from "../prospectorFilters.module.scss";
import { EMAIL_AVAILABILITY_OPTIONS } from "@/seeds/filterData";
import { useProspectorContext } from "@/contexts/ProspectorContext";

const EmailAvailability = () => {
    const { emailAvailability, setEmailAvailability } = useProspectorContext();
    return (
        <div className={styles.emailTabs}>
            {EMAIL_AVAILABILITY_OPTIONS.map((option) => (
                <button
                    key={String(option.value)}
                    className={classNames(styles.emailTab, { [styles.emailTabActive]: emailAvailability.value === option.value })}
                    onClick={() => setEmailAvailability(option)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default EmailAvailability;
