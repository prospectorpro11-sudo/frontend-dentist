import classnames from 'classnames';
import { Container } from 'react-bootstrap';

import Button from '../button/Button';
import styles from './comparisonTable.module.scss';
import { BUTTON_SIZE_ENUM } from '@/shared/enums';
import classNames from 'classnames';

type FeatureColor = 'blue' | 'teal' | 'indigo' | 'emerald' | 'amber' | 'rose';
type StatusType = 'yes' | 'no' | 'soon';

const comparisonRows: Array<{
    feature: string;
    featureIcon: string;
    featureColor: FeatureColor;
    oursStatus: StatusType;
    oursLabel: string;
    oursDetail?: string;
    otherLabel: string;
    otherDetail?: string;
}> = [
        {
            feature: 'Verified Dentist Contacts (95%+ Accuracy)',
            featureIcon: 'bi bi-shield-check',
            featureColor: 'blue',
            oursStatus: 'yes',
            oursLabel: 'Yes',
            oursDetail: 'Built with real-time verification',
            otherLabel: 'No',
            otherDetail: 'Often outdated, no verification',
        },
        {
            feature: 'Free Sample Before You Buy',
            featureIcon: 'bi bi-gift',
            featureColor: 'teal',
            oursStatus: 'yes',
            oursLabel: 'Yes',
            oursDetail: 'Instantly preview the data quality',
            otherLabel: 'No',
            otherDetail: 'No way to check before purchasing',
        },
        {
            feature: 'Email Sending Service',
            featureIcon: 'bi bi-envelope-paper',
            featureColor: 'indigo',
            oursStatus: 'soon',
            oursLabel: 'Coming Soon',
            oursDetail: 'Launch planned for Q2 2026',
            otherLabel: 'No',
            otherDetail: 'You must send emails yourself',
        },
        {
            feature: 'Guaranteed 95% Inbox Delivery',
            featureIcon: 'bi bi-inbox-check',
            featureColor: 'emerald',
            oursStatus: 'soon',
            oursLabel: 'Coming Soon',
            oursDetail: 'Delivery guarantee launching soon',
            otherLabel: 'No',
            otherDetail: 'No responsibility for delivery',
        },
        {
            feature: 'Real-Time Email Verification',
            featureIcon: 'bi bi-stars',
            featureColor: 'amber',
            oursStatus: 'soon',
            oursLabel: 'Coming Soon',
            oursDetail: 'Verification tools launching soon',
            otherLabel: 'No',
        },
        {
            feature: 'Advanced Targeting Filters',
            featureIcon: 'bi bi-funnel',
            featureColor: 'rose',
            oursStatus: 'yes',
            oursLabel: 'Yes',
            oursDetail: 'State, specialty, license & more',
            otherLabel: 'No',
        },
        {
            feature: 'Instant Download Access',
            featureIcon: 'bi bi-download',
            featureColor: 'blue',
            oursStatus: 'yes',
            oursLabel: 'Yes',
            oursDetail: 'Get your list immediately after purchase',
            otherLabel: 'No',
            otherDetail: 'Delayed delivery, manual processing',
        },
    ];

const ComparisonTable = () => {
    return (
        <section className={classNames(styles.wrapper, "fill")}>
            <Container>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionBadge}>
                        <i className="bi bi-trophy-fill"></i>
                        WHY CHOOSE US
                    </div>
                    <h2 className={styles.sectionTitle}>
                        Why <span className='shifting-accent'>Dentist Email List</span> is the Best Choice?
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        We&apos;re not just another data provider—we&apos;re your end-to-end dental marketing partner with verified, targeted contacts.
                    </p>
                </div>

                <div className={styles.comparisonCard}>
                    <table className={styles.comparisonTable}>
                        <thead>
                            <tr>
                                <th className={styles.headerCellFeatures}>
                                    <div className={styles.featuresLabel}>
                                        <i className="bi bi-list-check"></i>
                                        Features
                                    </div>
                                </th>
                                <th className={styles.headerCellOurs}>
                                    <div className={styles.headerLabel}>
                                        <div className={styles.recommendedBadge}>
                                            <i className="bi bi-trophy-fill"></i>
                                            Recommended
                                        </div>
                                        <div className={styles.brandIcon}>
                                            <i className="bi bi-tooth"></i>
                                        </div>
                                        Dentist Email List
                                        <span className={styles.sub}>Premium Data</span>
                                    </div>
                                </th>
                                <th className={styles.headerCellOthers}>
                                    <div className={styles.headerLabel}>
                                        <div className={styles.brandIcon}>
                                            <i className="bi bi-building"></i>
                                        </div>
                                        Others
                                        <span className={styles.sub}>Generic Providers</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonRows.map((row) => (
                                <tr key={row.feature}>
                                    <td>
                                        <div className={styles.featureCell}>
                                            <div className={classnames(styles.featureIcon, styles[row.featureColor])}>
                                                <i className={row.featureIcon}></i>
                                            </div>
                                            {row.feature}
                                        </div>
                                    </td>
                                    <td className={styles.highlightCol}>
                                        <span
                                            className={classnames(
                                                styles.statusBadge,
                                                row.oursStatus === 'yes' && styles.statusYes,
                                                row.oursStatus === 'no' && styles.statusNo,
                                                row.oursStatus === 'soon' && styles.statusSoon,
                                            )}
                                        >
                                            <span className={styles.statusIcon}>
                                                <i
                                                    className={
                                                        row.oursStatus === 'soon' ? 'bi bi-hourglass-split' : 'bi bi-check'
                                                    }
                                                ></i>
                                            </span>
                                            {row.oursLabel}
                                        </span>
                                        {row.oursDetail ? <span className={styles.detailText}>{row.oursDetail}</span> : null}
                                    </td>
                                    <td>
                                        <span className={classnames(styles.statusBadge, styles.statusNo)}>
                                            <span className={styles.statusIcon}>
                                                <i className="bi bi-x"></i>
                                            </span>
                                            {row.otherLabel}
                                        </span>
                                        {row.otherDetail ? <span className={styles.detailText}>{row.otherDetail}</span> : null}
                                    </td>
                                </tr>
                            ))}
                            <tr className={styles.ctaRow}>
                                <td colSpan={3}>
                                    <div className={styles.ctaContent}>
                                        <h3>Ready to Get Started?</h3>
                                        <p>Join 5,000+ marketers using verified dentist contacts for targeted campaigns.</p>
                                        <a href="#">
                                            <Button size={BUTTON_SIZE_ENUM.LARGE}>
                                                <i className="bi bi-tooth"></i>
                                                Build Your Dentist List
                                                <i className="bi bi-arrow-right"></i>
                                            </Button>
                                        </a>

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Container>
        </section>
    );
};

export default ComparisonTable;