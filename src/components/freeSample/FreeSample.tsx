import classNames from 'classnames';
import styles from './freeSample.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { IFreeSample } from '../../shared/interface';

const FreeSample = (props: IFreeSample) => {
    const { dentistData, cta: ctaConfig, card: cardConfig, heading, subtitle, features, headingAccent } = props;

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
                            </div>
                        </Col>
                        <Col xs={12} lg={5}>
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

                                        {dentistData.map((item, index) => (
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
                                        <span className={styles.fsfRecords}><strong>{cardConfig.recordCount}</strong> {cardConfig.recordLabel}</span>
                                        <span className={styles.fsfVerified}>
                                            <i className="bi bi-patch-check-fill"></i> {cardConfig.complianceText}
                                        </span>
                                    </div>

                                    {/* CTA Button (inside card) */}
                                    <div className={styles.fsCtaWrap}>
                                        <a href={ctaConfig.href} className={classNames(styles.fsCta)}>
                                            <i className={ctaConfig.icon}></i>
                                            {ctaConfig.text}
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
