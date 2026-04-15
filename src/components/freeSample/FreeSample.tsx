import classNames from 'classnames';
import styles from './freeSample.module.scss';
import { Col, Container, Row } from 'react-bootstrap';

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
                                        <span className={styles.accPct}>99%</span>
                                        <span className={styles.accLbl}>DATA<br />ACCURACY</span>
                                        <i className={classNames('bi', 'bi-star-fill', styles.accIcon)}></i>
                                    </div>

                                    {/* Card Header Bar */}
                                    <div className={styles.fsCardHead}>
                                        <div className={styles.fsHeadLeft}>
                                            <div className={styles.fsHeadIcon}>
                                                <i className="bi bi-database"></i>
                                            </div>
                                            <span className={styles.fstLabel}>Sample Data Preview — Dentist Contacts</span>
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

                                        {/* Row 1 */}
                                        <div className={styles.fsDataRow}>
                                            <div className={styles.fsDrSpecialty}>
                                                <span className={classNames(styles.specDot, styles.dot1)}></span>
                                                Orthodontics
                                            </div>
                                            <div className={styles.fsDrEmail}>dr.smith@dentalcare.com</div>
                                            <div className={styles.fsDrPhone}>(555) 019-2234</div>
                                        </div>

                                        {/* Row 2 */}
                                        <div className={styles.fsDataRow}>
                                            <div className={styles.fsDrSpecialty}>
                                                <span className={classNames(styles.specDot, styles.dot2)}></span>
                                                Periodontics
                                            </div>
                                            <div className={styles.fsDrEmail}>contact@janesperio.org</div>
                                            <div className={styles.fsDrPhone}>(555) 021-8890</div>
                                        </div>

                                        {/* Row 3 */}
                                        <div className={styles.fsDataRow}>
                                            <div className={styles.fsDrSpecialty}>
                                                <span className={classNames(styles.specDot, styles.dot3)}></span>
                                                Endodontics
                                            </div>
                                            <div className={styles.fsDrEmail}>info@rootcanalpro.net</div>
                                            <div className={styles.fsDrPhone}>(555) 018-4456</div>
                                        </div>
                                        {/* Row 1 */}
                                        <div className={styles.fsDataRow}>
                                            <div className={styles.fsDrSpecialty}>
                                                <span className={classNames(styles.specDot, styles.dot1)}></span>
                                                Orthodontics
                                            </div>
                                            <div className={styles.fsDrEmail}>dr.smith@dentalcare.com</div>
                                            <div className={styles.fsDrPhone}>(555) 019-2234</div>
                                        </div>

                                        {/* Row 2 */}
                                        <div className={styles.fsDataRow}>
                                            <div className={styles.fsDrSpecialty}>
                                                <span className={classNames(styles.specDot, styles.dot2)}></span>
                                                Periodontics
                                            </div>
                                            <div className={styles.fsDrEmail}>contact@janesperio.org</div>
                                            <div className={styles.fsDrPhone}>(555) 021-8890</div>
                                        </div>
                                    </div>

                                    {/* Footer: record count + compliance */}
                                    <div className={styles.fsCardFooter}>
                                        <span className={styles.fsfRecords}><strong>12,450+</strong> verified dentist records</span>
                                        <span className={styles.fsfVerified}>
                                            <i className="bi bi-patch-check-fill"></i> GDPR Compliant
                                        </span>
                                    </div>

                                    {/* CTA Button (inside card) */}
                                    <div className={styles.fsCtaWrap}>
                                        <a href="#" className={classNames(styles.fsCta)}>
                                            <i className="bi bi-download"></i>
                                            Get free sample today
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
