import classNames from "classnames";
import { CSSProperties } from "react";
import { IconType } from "react-icons";
import { COLORS_ENUM } from "@/shared/enums";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./dashboardPageHeader.module.scss";
import { numberWithCommas } from "@/shared/InternalService";
interface IStat {
    label: string;
    value: string;
    color?: COLORS_ENUM;
    isPrice?: boolean;
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
    const getPalette = {
        [COLORS_ENUM.SKY_BLUE]: {
            color: "var(--blue-500)",
            background: "var(--blue-50)",
            border: "var(--blue-200)",
        },
        [COLORS_ENUM.EMERALD]: {
            color: "var(--blue-600)",
            background: "var(--blue-50)",
            border: "var(--blue-200)",
        },
        [COLORS_ENUM.AMBER]: {
            color: "var(--blue-700)",
            background: "var(--blue-100)",
            border: "var(--blue-200)",
        },
        [COLORS_ENUM.INDIGO]: {
            color: "var(--blue-400)",
            background: "var(--blue-50)",
            border: "var(--blue-300)",
        },
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
                    {stats?.map((stat, index) => {
                        const palette = getPalette[stat.color || COLORS_ENUM.SKY_BLUE];

                        return (
                            <div
                                key={index}
                                className={styles.statItem}
                                style={{
                                    "--stat-color": palette.color,
                                    "--stat-bg": palette.background,
                                    "--stat-border": palette.border,
                                } as CSSProperties}
                            >
                                <div className={styles.statValue}>{stat.isPrice && "$"}{numberWithCommas(stat.value)}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </div>
                        );
                    })}
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
