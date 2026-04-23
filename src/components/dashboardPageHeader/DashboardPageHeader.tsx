import { FaCheckCircle, FaUserCircle } from "react-icons/fa";
import styles from "./dashboardPageHeader.module.scss";
import classNames from "classnames";
interface IDashboardPageHeader {
    title?: string;
    description?: string;
    activeBadge?: boolean;
}
const DashboardPageHeader = (props: IDashboardPageHeader) => {
    const { title, description, activeBadge } = props;
    return (
        <div className={styles.pageHeader}>
            <div className={styles.headerLeft}>
                <div className={styles.pageIcon}>
                    <FaUserCircle />
                </div>
                <div className={styles.pageInfo}>
                    <h2>{title}</h2>
                    <p className={styles.pageSubtitle}>{description}</p>
                </div>
            </div>
            <div className={styles.headerRight}>
                {activeBadge && (
                    <div className={classNames(styles.statsMini, styles.activeBadge)}>
                        <div className={styles.statIconSmall}><FaCheckCircle /></div>
                        <div className={styles.statLabel}>Active</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPageHeader;