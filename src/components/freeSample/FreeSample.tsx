import classNames from 'classnames';
import styles from './freeSample.module.scss';
import { Col, Container, Row } from 'react-bootstrap';

const dentistData = [
    {
        specialty: 'Orthodontics',
        email: 'dr.smith@dentalcare.com',
        phone: '(555) 019-2234',
        dotClass: 'dot1',
    },
    {
        specialty: 'Periodontics',
        email: 'contact@janesperio.org',
        phone: '(555) 021-8890',
        dotClass: 'dot2',
    },
    {
        specialty: 'Endodontics',
        email: 'info@rootcanalpro.net',
        phone: '(555) 018-4456',
        dotClass: 'dot3',
    },
    {
        specialty: 'Orthodontics',
        email: 'dr.smith@dentalcare.com',
        phone: '(555) 019-2234',
        dotClass: 'dot1',
    },
    {
        specialty: 'Periodontics',
        email: 'contact@janesperio.org',
        phone: '(555) 021-8890',
        dotClass: 'dot2',
    },
];

const ctaConfig = {
    href: '#',
    icon: 'bi bi-download',
    text: 'Get free sample today',
};

const cardConfig = {
    accuracyPercent: '99%',
    cardTitle: 'Sample Data Preview — Dentist Contacts',
    recordCount: '12,450+',
    recordLabel: 'verified dentist records',
    complianceText: 'GDPR Compliant',
};

const FreeSample = () => {
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
                                    Get your <br />free <span className='shifting-accent'>sample access</span>
                                </h2>

                                <p className={styles.fsSub}>
                                    Gain exclusive entry to thousands of verified dentist contacts. Our architectural verification process ensures precision that fuels your outreach strategy.
                                </p>

                                <div className={styles.fsGrid}>
                                    <div className={styles.fsFeature}>
                                        <div className={classNames(styles.fsFeatIcon, styles.fsFi1)}>
                                            <i className="bi bi-shield-check"></i>
                                        </div>
                                        <div className={styles.fsFeatText}>
                                            <h4>TRY BEFORE YOU BUY</h4>
                                            <p>Risk-free quality assessment of our elite data sets.</p>
                                        </div>
                                    </div>

                                    <div className={styles.fsFeature}>
                                        <div className={classNames(styles.fsFeatIcon, styles.fsFi2)}>
                                            <i className="bi bi-table"></i>
                                        </div>
                                        <div className={styles.fsFeatText}>
                                            <h4>AVAILABLE FOR ALL LISTS</h4>
                                            <p>Uniform quality across every specialty and region.</p>
                                        </div>
                                    </div>

                                    <div className={styles.fsFeature}>
                                        <div className={classNames(styles.fsFeatIcon, styles.fsFi3)}>
                                            <i className="bi bi-bar-chart-line"></i>
                                        </div>
                                        <div className={styles.fsFeatText}>
                                            <h4>CHECK QUALITY &amp; ACCURACY</h4>
                                            <p>Real-time verification metrics at your fingertips.</p>
                                        </div>
                                    </div>

                                    <div className={styles.fsFeature}>
                                        <div className={classNames(styles.fsFeatIcon, styles.fsFi4)}>
                                            <i className="bi bi-lightning-charge"></i>
                                        </div>
                                        <div className={styles.fsFeatText}>
                                            <h4>INSTANT ACCESS</h4>
                                            <p>No delays. Immediate download for verified samples.</p>
                                        </div>
                                    </div>
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
