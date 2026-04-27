import classNames from 'classnames';
import styles from './freeSample.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { IFreeSample } from '../../shared/interface';
import Button from '../button/Button';
import { BUTTON_SIZE_ENUM } from '@/shared/enums';
import { DATA_FIELDS_SAMPLE } from '@/shared/constant';

// Mockup data
const mockupData = [
    {
        specialty: 'Orthodontics',
        email: 'dr.s***@dentalcare.com',
        phone: '(555) ***-****',
        dotClass: 'dot1',
    },
    {
        specialty: 'Periodontics',
        email: 'con***@janesperio.org',
        phone: '(555) ***-****',
        dotClass: 'dot2',
    },
    {
        specialty: 'Endodontics',
        email: 'inf*@rootcanalpro.net',
        phone: '(555) ***-****',
        dotClass: 'dot3',
    },
    {
        specialty: 'Orthodontics',
        email: 'dr.s***@dentalcare.com',
        phone: '(555) ***-****',
        dotClass: 'dot1',
    },
    {
        specialty: 'Periodontics',
        email: 'con***@janesperio.org',
        phone: '(555) ***-****',
        dotClass: 'dot2',
    },
]

const FreeSample = (props: IFreeSample) => {
    const { cta: ctaConfig, card: cardConfig, heading, subtitle, features, headingAccent, isProductDetails, totalCount } = props;

    return (
        <section className={styles.freeSample}>
            <div className={classNames(styles.decoOrb, styles.decoOrb5)}></div>
            <div className={classNames(styles.decoOrb, styles.decoOrb6)}></div>
            <Container>
                <Col xs={12} lg={11} className='mx-auto'>
                    <Row>
                        <Col xs={12} lg={7}>
                            <div className={styles.fsContent}>
                                <h2 className={styles.fsHeading}>
                                    {heading} <br />free <span className='shifting-accent'>{headingAccent}</span>
                                </h2>

                                <p className={styles.fsSub}>
                                    {subtitle}
                                </p>

                                <div className={styles.fsGrid}>
                                    {features.map((feature) => (
                                        <div key={feature.title} className={styles.fsFeature}>
                                            <div className={classNames(styles.fsFeatIcon, styles[feature.iconClass])}>
                                                <i className={`bi bi-${feature.icon}`}></i>
                                            </div>
                                            <div className={styles.fsFeatText}>
                                                <h4>{feature.title}</h4>
                                                <p>{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Conditionally render Available Data Fields for Product Details */}
                                {isProductDetails && (
                                    <div className={styles.fsDataFieldsWrapper}>
                                        <div className={styles.fsDataFieldsTitle}>
                                            <i className="bi bi-ui-checks-grid"></i> Available Data Fields
                                        </div>
                                        <div className={styles.fsDataFieldsGrid}>
                                            {DATA_FIELDS_SAMPLE.map(field => (
                                                <span key={field} className={styles.fsFieldPill}>
                                                    <i className="bi bi-check2"></i> {field}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </Col>
                        <Col xs={12} lg={5} className='mt-5 mt-lg-0'>
                            <div className={styles.fsVisual}>
                                <div className={styles.fsMainCard}>

                                    {/* Floating 99% Accuracy Badge */}
                                    <div className={styles.fsAccBadge}>
                                        <span className={styles.accPct}>{cardConfig.accuracyPercent}</span>
                                        <span className={styles.accLbl}>DATA<br />ACCURACY</span>
                                        <i className={classNames('bi', 'bi-star-fill', styles.accIcon)}></i>
                                    </div>

                                    {/* Card Header Bar */}
                                    <div className={styles.fsCardHead}>
                                        <div className={styles.fsHeadLeft}>
                                            <div className={styles.fsHeadIcon}>
                                                <i className="bi bi-database"></i>
                                            </div>
                                            <span className={styles.fstLabel}>{cardConfig.cardTitle}</span>
                                        </div>
                                    </div>

                                    {/* Data Rows (CSS Grid, matched columns) */}
                                    <div className={styles.fsDataBody}>
                                        {/* Column Headers */}
                                        <div className={styles.fsDataHead}>
                                            <span>Specialty</span>
                                            <span>Email Address</span>
                                            <span>Phone</span>
                                        </div>

                                        {mockupData.map((item, index) => (
                                            <div key={index} className={styles.fsDataRow}>
                                                <div className={styles.fsDrSpecialty}>
                                                    <span className={classNames(styles.specDot, styles[item.dotClass])}></span>
                                                    {item.specialty}
                                                </div>
                                                <div className={styles.fsDrEmail}>{item.email}</div>
                                                <div className={styles.fsDrPhone}>{item.phone}</div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Footer: record count + compliance */}
                                    <div className={styles.fsCardFooter}>
                                        <span className={styles.fsfRecords}><strong>{totalCount ? totalCount : cardConfig.recordCount}</strong> {cardConfig.recordLabel}</span>
                                        <span className={styles.fsfVerified}>
                                            <i className="bi bi-patch-check-fill"></i> {cardConfig.complianceText}
                                        </span>
                                    </div>

                                    {/* CTA Button (inside card) */}
                                    <div className={styles.fsCtaWrap}>
                                        <a href={ctaConfig.href} className={classNames(styles.fsCta)}>
                                            <Button isFullWidth size={BUTTON_SIZE_ENUM.LARGE}><i className={ctaConfig.icon}></i>  {ctaConfig.text}</Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Container>
        </section>
    );
};

export default FreeSample;
