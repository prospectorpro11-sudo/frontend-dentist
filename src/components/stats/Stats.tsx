import styles from "./stats.module.scss";
import { IStat } from "@/shared/interface";
import classNames from "classnames";
import { BsArrowUpRight, BsCheckCircleFill, BsEnvelopeCheckFill, BsGraphUpArrow, BsPatchCheckFill, BsPeopleFill, BsPrinterFill, BsTelephoneForwardFill } from "react-icons/bs";

interface IStatsComponentProps {
    stats: IStat[]
    isProductDetails?: boolean;
}
const metricIconMap = {
    people: BsPeopleFill,
    email: BsEnvelopeCheckFill,
    phone: BsTelephoneForwardFill,
    fax: BsPrinterFill,
    license: BsPatchCheckFill,
} as const;

const Stats = (props: IStatsComponentProps) => {
    const { stats, isProductDetails } = props;
    return (
        <div className={classNames(styles.statsPanel, { [styles.isProductPage]: isProductDetails })}>
            <div className={styles.spHeader}>
                <div className={styles.spHeaderIcon}><BsGraphUpArrow /></div>
                <div className={styles.spHeaderTitle}>
                    <strong>Database Metrics</strong>
                    <span>Real-time overview</span>
                </div>
            </div>

            {stats.map((metric) => {
                const Icon = metricIconMap[metric.icon as keyof typeof metricIconMap];
                return (
                    <div
                        key={metric.label}
                        className={classNames(styles.spRow, {
                            [styles.spRowHighlight]: metric.highlight,
                            [styles.spRowLast]: metric.last,
                        })}
                    >
                        <div className={classNames(styles.spIcon, styles[metric.iconClass])}><Icon size={18} /></div>
                        <div className={styles.spInfo}>
                            <strong>{metric.value}</strong>
                            <span>{metric.label}</span>
                        </div>
                        <BsArrowUpRight />
                    </div>
                );
            })}
            {!isProductDetails && (
                <div className={styles.spVerify}>
                    <div className={styles.spVerifyLabel}>
                        <BsCheckCircleFill /> Verification
                    </div>
                    <div className={styles.spVerifyTrack}>
                        <div className={styles.spVerifyFill}></div>
                    </div>
                    <span>100%</span>
                </div>
            )}
        </div>
    );
};

export default Stats;