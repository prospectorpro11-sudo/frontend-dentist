import classNames from "classnames";
import { IconType } from "react-icons";
import { COLORS_ENUM } from "@/shared/enums";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./dashboardPageHeader.module.scss";
import { numberWithCommas } from "@/shared/InternalService";
interface IStat {
    label: string;
    value: string;
    color?: COLORS_ENUM;
}

interface IDashboardPageHeader {
    title?: string;
    description?: string;
    activeBadge?: boolean;
    stats?: IStat[];
    icon?: IconType;
    iconSize?: number;
}
const DashboardPageHeader = (props: IDashboardPageHeader) => {
    const { title, description, activeBadge, stats, icon: HeaderIcon, iconSize = 20 } = props;
    const getColor = {
        [COLORS_ENUM.SKY_BLUE]: "#0EA5E9",
        [COLORS_ENUM.EMERALD]: "#10B981",
        [COLORS_ENUM.AMBER]: "#F59E0B",
        [COLORS_ENUM.INDIGO]: "#6366F1",
    };
    const hexToRgb = (hex: string) => {
        const cleanHex = hex.replace("#", "");

        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);

        return `${r}, ${g}, ${b}`;
    };
    return (
        <div className={styles.pageHeader}>
            <div className={styles.headerLeft}>
                {HeaderIcon && (
                    <div className={styles.pageIcon}>
                        <HeaderIcon size={iconSize} />
                    </div>
                )}
                <div className={styles.pageInfo}>
                    <h2>{title}</h2>
                    <p className={styles.pageSubtitle}>{description}</p>
                </div>
            </div>
            <div className={styles.headerRight}>
                <div className={styles.stats}>
                    {stats?.map((stat, index) => (
                        <div
                            key={index}
                            className={styles.statItem}
                            style={{
                                backgroundColor: `rgba(${hexToRgb(
                                    getColor[stat.color || COLORS_ENUM.SKY_BLUE]
                                )}, 0.05)`,
                                border: `1px solid rgba(${hexToRgb(
                                    getColor[stat.color || COLORS_ENUM.SKY_BLUE]
                                )}, 0.2)`,
                            }}
                        >
                            <div style={{ color: getColor[stat.color || COLORS_ENUM.SKY_BLUE] }} className={styles.statValue}>{numberWithCommas(stat.value)}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>

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