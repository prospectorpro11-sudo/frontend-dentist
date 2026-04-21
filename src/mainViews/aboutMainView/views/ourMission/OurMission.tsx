import classnames from 'classnames';
import { Container } from 'react-bootstrap';
import styles from './ourMissiion.module.scss';

const missionPoints: string[] = [
    'Provide the most accurate, up-to-date dentist contact data',
    'Ensure 95%+ email deliverability with real-time verification',
    'Empower businesses with AI-driven prospecting and email marketing solutions',
    'Maintain strict compliance with HIPAA, GDPR, CAN-SPAM, and CCPA regulations',
    'Offer unmatched customer support to ensure your success',
];

const OurMission = () => {
    return (
        <section className={styles.missionSection}>
            <Container>
                <div className={styles.missionLayout}>
                    <div className={styles.missionVisual}>
                        <div className={styles.missionVisualHeader}>
                            <div className={styles.missionVisualLogo}>
                                <i className="bi bi-tooth"></i>
                            </div>
                            <div>
                                <div className={styles.missionVisualTitle}>Dentist Email List</div>
                                <div className={styles.missionVisualSub}>Verified Contact Platform</div>
                            </div>
                        </div>

                        <div className={styles.missionVisualStats}>
                            <div className={styles.mvStat}>
                                <div className={styles.mvStatValue}>930,285</div>
                                <div className={styles.mvStatLabel}>Total Contacts</div>
                            </div>
                            <div className={styles.mvStat}>
                                <div className={styles.mvStatValue}>885,150</div>
                                <div className={styles.mvStatLabel}>Emails</div>
                            </div>
                        </div>

                        <div className={styles.mvFilters}>
                            <div className={styles.mvFilterPill}>
                                <strong>State</strong>
                                California, Texas, NY
                            </div>
                            <div className={styles.mvFilterPill}>
                                <strong>City</strong>
                                LA, Houston, Chicago
                            </div>
                        </div>

                        <div className={styles.mvIntegrations}>
                            <div className={styles.mvIntegration}>
                                <i className="bi bi-cloud-fill"></i>
                                Salesforce
                            </div>
                            <div className={styles.mvIntegration}>
                                <i className="bi bi-diagram-3-fill"></i>
                                HubSpot
                            </div>
                            <div className={styles.mvIntegration}>
                                <i className="bi bi-envelope-heart-fill"></i>
                                Mailchimp
                            </div>
                        </div>

                        <div className={styles.mvCompliance}>
                            <div className={styles.mvComplianceBadges}>
                                <div className={classnames(styles.mvComplianceBadge, styles.hipaa)}>HIPAA</div>
                                <div className={classnames(styles.mvComplianceBadge, styles.gdpr)}>GDPR</div>
                                <div className={classnames(styles.mvComplianceBadge, styles.ccpa)}>CCPA</div>
                            </div>
                            <div className={styles.mvComplianceText}>
                                Fully Compliant
                                <span>Legal & ethical data collection</span>
                            </div>
                        </div>

                        <div className={styles.mvAvoidSpam}>
                            <i className="bi bi-shield-slash"></i>
                            Avoid Spam — 95%+ Inbox Placement
                        </div>
                    </div>

                    <div className={styles.missionText}>
                        <h2>
                            Our <span>Mission</span>
                        </h2>
                        <p>Our mission is simple:</p>
                        <ul className={styles.missionList}>
                            {missionPoints.map((point) => (
                                <li key={point}>
                                    <i className="bi bi-check"></i>
                                    {point}
                                </li>
                            ))}
                        </ul>
                        <div className={styles.missionBelief}>
                            We believe in data transparency, compliance, and helping businesses scale efficiently by eliminating the risks of bad data and failed outreach.
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default OurMission;