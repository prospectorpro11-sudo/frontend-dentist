import classnames from 'classnames';
import { Container } from 'react-bootstrap';

import Button from '../button/Button';
import styles from './comparisonTable.module.scss';
import { BUTTON_SIZE_ENUM } from '@/shared/enums';
import classNames from 'classnames';
import { IComparisonTableSeed } from '@/shared/interface';
import LogoIcon from '../logoIcon/LogoIcon';

const ComparisonTable = (props: IComparisonTableSeed) => {
    const { content, rows } = props;

    return (
        <section className={classNames(styles.wrapper, 'fill')}>
            <Container>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionBadge}>
                        <i className="bi bi-trophy-fill"></i>
                        {content.badge}
                    </div>
                    <h2 className={styles.sectionTitle}>
                        {content.title} <span className='shifting-accent'>{content.titleAccent}</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        {content.subtitle}
                    </p>
                </div>

                <div className={styles.comparisonCard}>
                    <table className={styles.comparisonTable}>
                        <thead>
                            <tr>
                                <th className={styles.headerCellFeatures}>
                                    <div className={styles.featuresLabel}>
                                        <i className="bi bi-list-check"></i>
                                        {content.featuresHeader}
                                    </div>
                                </th>
                                <th className={styles.headerCellOurs}>
                                    <div className={styles.headerLabel}>
                                        <div className={styles.recommendedBadge}>
                                            <i className="bi bi-trophy-fill"></i>
                                            {content.recommendedLabel}
                                        </div>
                                        <div className={styles.brandIcon}>
                                            <LogoIcon width={24} height={24} variant="white" style={{ objectFit: 'scale-down' }} />
                                        </div>
                                        {content.oursTitle}
                                        <span className={styles.sub}>{content.oursSubtitle}</span>
                                    </div>
                                </th>
                                <th className={styles.headerCellOthers}>
                                    <div className={styles.headerLabel}>
                                        <div className={styles.brandIcon}>
                                            <i className="bi bi-building"></i>
                                        </div>
                                        {content.othersTitle}
                                        <span className={styles.sub}>{content.othersSubtitle}</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
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
                                        <h3>{content.ctaTitle}</h3>
                                        <p>{content.ctaDescription}</p>
                                        <a href="#">
                                            <Button size={BUTTON_SIZE_ENUM.LARGE}>
                                                <LogoIcon width={24} height={24} variant="white" style={{ objectFit: 'scale-down' }} />
                                                {content.ctaButtonText}
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
