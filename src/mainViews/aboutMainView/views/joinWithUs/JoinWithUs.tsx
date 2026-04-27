import classnames from 'classnames';
import { Container } from 'react-bootstrap';
import styles from './joinWithUs.module.scss';
import LogoIcon from '@/components/logoIcon/LogoIcon';

const joinLinks: Array<{ label: string; href: string }> = [
    { label: 'Start with a Free Sample', href: '#' },
    { label: 'Browse Our Dental Lists', href: '#' },
    { label: 'Get a Custom Quote', href: '#' },
];

const JoinWithUs = () => {
    return (
        <section className={styles.joinSection}>
            <Container>
                <div className={styles.joinLayout}>
                    <div className={styles.joinMockup}>
                        <div className={styles.joinMockupGrid}></div>

                        <div className={classnames(styles.joinFloat, styles.joinFloat1)}>
                            <div className={styles.joinFloatCard}>
                                <div className={classnames(styles.joinFloatIcon, styles.blue)}>
                                    <i className="bi bi-graph-up-arrow"></i>
                                </div>
                                <div className={styles.joinFloatText}>
                                    +24% Growth
                                    <span>This Quarter</span>
                                </div>
                            </div>
                        </div>

                        <div className={classnames(styles.joinFloat, styles.joinFloat2)}>
                            <div className={styles.joinFloatCard}>
                                <div className={classnames(styles.joinFloatIcon, styles.emerald)}>
                                    <i className="bi bi-check-circle-fill"></i>
                                </div>
                                <div className={styles.joinFloatText}>
                                    99.2% Accuracy
                                    <span>Verified Data</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.joinMockupContent}>
                            <div className={styles.joinMockupHeader}>
                                <div className={styles.joinMockupBrand}>
                                    <div className={styles.joinMockupLogo}>
                                        <LogoIcon width={24} height={24} variant="white" style={{ objectFit: 'scale-down' }} />
                                    </div>
                                    <div>
                                        <div className={styles.joinMockupTitle}>Dentist Email List</div>
                                        <div className={styles.joinMockupSubtitle}>Analytics Dashboard</div>
                                    </div>
                                </div>
                                <div className={styles.joinMockupLive}>
                                    <div className={styles.joinMockupLiveDot}></div>
                                    Live Data
                                </div>
                            </div>

                            <div className={styles.joinAnalytics}>
                                <div className={styles.joinAnalyticsCard}>
                                    <div className={classnames(styles.joinAnalyticsIcon, styles.blue)}>
                                        <i className="bi bi-people-fill"></i>
                                    </div>
                                    <div className={styles.joinAnalyticsValue}>930K+</div>
                                    <div className={styles.joinAnalyticsLabel}>Total Contacts</div>
                                </div>
                                <div className={styles.joinAnalyticsCard}>
                                    <div className={classnames(styles.joinAnalyticsIcon, styles.teal)}>
                                        <i className="bi bi-envelope-check-fill"></i>
                                    </div>
                                    <div className={styles.joinAnalyticsValue}>95%+</div>
                                    <div className={styles.joinAnalyticsLabel}>Deliverability</div>
                                </div>
                                <div className={styles.joinAnalyticsCard}>
                                    <div className={classnames(styles.joinAnalyticsIcon, styles.emerald)}>
                                        <i className="bi bi-shield-check"></i>
                                    </div>
                                    <div className={styles.joinAnalyticsValue}>100%</div>
                                    <div className={styles.joinAnalyticsLabel}>GDPR Ready</div>
                                </div>
                            </div>

                            <div className={styles.joinChart}>
                                <div className={styles.joinChartHeader}>
                                    <div className={styles.joinChartTitle}>Contacts by Specialty</div>
                                    <div className={styles.joinChartBadge}>
                                        <i className="bi bi-arrow-up-right"></i>
                                        +12.5%
                                    </div>
                                </div>
                                <div className={styles.joinChartBars}>
                                    <div className={classnames(styles.joinChartBar, styles.barBlue)} style={{ height: '85%' }}></div>
                                    <div className={classnames(styles.joinChartBar, styles.barTeal)} style={{ height: '65%' }}></div>
                                    <div className={classnames(styles.joinChartBar, styles.barIndigo)} style={{ height: '45%' }}></div>
                                    <div className={classnames(styles.joinChartBar, styles.barAmber)} style={{ height: '70%' }}></div>
                                    <div className={classnames(styles.joinChartBar, styles.barEmerald)} style={{ height: '55%' }}></div>
                                    <div className={classnames(styles.joinChartBar, styles.barRose)} style={{ height: '40%' }}></div>
                                    <div className={classnames(styles.joinChartBar, styles.barBlueLight)} style={{ height: '75%' }}></div>
                                    <div className={classnames(styles.joinChartBar, styles.barTealLight)} style={{ height: '60%' }}></div>
                                </div>
                                <div className={styles.joinChartLabels}>
                                    <span className={styles.joinChartLabel}>General</span>
                                    <span className={styles.joinChartLabel}>Ortho</span>
                                    <span className={styles.joinChartLabel}>Pediatric</span>
                                    <span className={styles.joinChartLabel}>Oral Surg</span>
                                    <span className={styles.joinChartLabel}>Endo</span>
                                    <span className={styles.joinChartLabel}>Perio</span>
                                    <span className={styles.joinChartLabel}>Family</span>
                                    <span className={styles.joinChartLabel}>Emergency</span>
                                </div>
                            </div>

                            <div className={styles.joinSpecialties}>
                                <div className={styles.joinSpecialtyPill}>
                                    <span className={classnames(styles.joinSpecialtyDot, styles.blue)}></span>
                                    General Dentists
                                    <span className={styles.joinSpecialtyCount}>45,320</span>
                                </div>
                                <div className={styles.joinSpecialtyPill}>
                                    <span className={classnames(styles.joinSpecialtyDot, styles.teal)}></span>
                                    Orthodontists
                                    <span className={styles.joinSpecialtyCount}>19,870</span>
                                </div>
                                <div className={styles.joinSpecialtyPill}>
                                    <span className={classnames(styles.joinSpecialtyDot, styles.indigo)}></span>
                                    Pediatric
                                    <span className={styles.joinSpecialtyCount}>22,180</span>
                                </div>
                                <div className={styles.joinSpecialtyPill}>
                                    <span className={classnames(styles.joinSpecialtyDot, styles.amber)}></span>
                                    Oral Surgeons
                                    <span className={styles.joinSpecialtyCount}>8,920</span>
                                </div>
                                <div className={styles.joinSpecialtyPill}>
                                    <span className={classnames(styles.joinSpecialtyDot, styles.emerald)}></span>
                                    Endodontists
                                    <span className={styles.joinSpecialtyCount}>12,450</span>
                                </div>
                                <div className={styles.joinSpecialtyPill}>
                                    <span className={classnames(styles.joinSpecialtyDot, styles.rose)}></span>
                                    Periodontists
                                    <span className={styles.joinSpecialtyCount}>9,870</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.joinText}>
                        <h2>
                            Join Thousands of Businesses That Trust <span>Dentist Email List</span>
                        </h2>
                        <p>
                            Whether you&apos;re looking for a targeted dental database, AI-driven lead prospecting, or a done-for-you email marketing service, we&apos;ve got you covered.
                        </p>
                        <ul className={styles.joinLinks}>
                            {joinLinks.map((item) => (
                                <li key={item.label}>
                                    <a href={item.href}>
                                        {item.label} <i className="bi bi-arrow-right"></i>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <p className={styles.joinTagline}>Boost Your Dental Marketing Today with Dentist Email List!</p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default JoinWithUs;