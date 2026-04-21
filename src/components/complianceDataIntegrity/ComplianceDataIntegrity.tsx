import classnames from 'classnames';
import { Container } from 'react-bootstrap';
import styles from './complianceDataIntegrity.module.scss';

type Certificate = {
    name: string;
    description: string;
    icon: string;
    tone: 'hipaa' | 'gdpr' | 'ccpa' | 'canspam';
};

type ComplianceCard = {
    title: string;
    description: string;
    icon: string;
    tone: 'green' | 'purple' | 'blue';
    features: string[];
};

const certificates: Certificate[] = [
    { name: 'HIPAA', description: 'Compliant', icon: 'bi bi-shield-fill-check', tone: 'hipaa' },
    { name: 'GDPR', description: 'Certified', icon: 'bi bi-lock-fill', tone: 'gdpr' },
    { name: 'CCPA', description: 'Compliant', icon: 'bi bi-person-fill-lock', tone: 'ccpa' },
    { name: 'CAN-SPAM', description: 'Certified', icon: 'bi bi-envelope-paper-fill', tone: 'canspam' },
];

const complianceCards: ComplianceCard[] = [
    {
        title: 'HIPAA Compliant Data Handling',
        description: 'Secure and legal use of healthcare contacts with strict adherence to HIPAA regulations.',
        icon: 'bi bi-shield-fill-check',
        tone: 'green',
        features: [
            'Encrypted data storage & transmission',
            'Regular security audits',
            'Access controls & monitoring',
            'Secure healthcare contact handling',
        ],
    },
    {
        title: 'GDPR & CCPA Certified',
        description: 'Full transparency and privacy protection under global data protection regulations.',
        icon: 'bi bi-globe-americas',
        tone: 'purple',
        features: [
            'Explicit consent management',
            'Right to access & deletion',
            'Transparent data processing',
            'Privacy by design approach',
        ],
    },
    {
        title: 'CAN-SPAM & TCPA Compliance',
        description: 'Email marketing practices that follow all legal guidelines and regulations.',
        icon: 'bi bi-envelope-paper-fill',
        tone: 'blue',
        features: [
            'Valid opt-out mechanisms',
            'Accurate sender information',
            'Clear subject lines',
            'Legal email marketing practices',
        ],
    },
];
const ComplianceDataIntegrity = () => {
    return (
        <section className={styles.section}>
            <div className={styles.bgGradient}></div>
            <div className={styles.gridPattern}></div>
            <div className={styles.orb}></div>
            <div className={styles.orb}></div>
            <div className={styles.orb}></div>

            <Container className={styles.container}>
                <header className={styles.complianceHeader}>
                    <div className={styles.trustBadge}>
                        <i className="bi bi-shield-fill-check"></i>
                        <span>Trusted & Compliant</span>
                    </div>
                    <h2 className={styles.complianceTitle}>
                        Our Commitment to
                        <br />
                        <span className={styles.gradientText}>Compliance & Data Integrity</span>
                    </h2>
                    <p className={styles.complianceSubtitle}>
                        We prioritize ethical data collection and strict regulatory compliance to ensure your outreach is safe, legal, and effective.
                    </p>
                </header>

                <div className={styles.certBadges}>
                    {certificates.map((certificate) => (
                        <div key={certificate.name} className={styles.certBadge}>
                            <div className={classnames(styles.certIcon, styles[certificate.tone])}>
                                <i className={certificate.icon}></i>
                            </div>
                            <div className={styles.certInfo}>
                                <div className={styles.certName}>{certificate.name}</div>
                                <div className={styles.certDesc}>{certificate.description}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.complianceGrid}>
                    {complianceCards.map((card) => (
                        <article key={card.title} className={styles.complianceCard}>
                            <div className={styles.cardContent}>
                                <div className={styles.cardIconWrapper}>
                                    <div className={styles.cardIconRing}></div>
                                    <div className={styles.cardIconRing}></div>
                                    <div className={styles.cardIconRing}></div>
                                    <div className={classnames(styles.cardIcon, styles[card.tone])}>
                                        <i className={card.icon}></i>
                                    </div>
                                </div>
                                <h3 className={styles.cardTitle}>{card.title}</h3>
                                <p className={styles.cardDescription}>{card.description}</p>
                                <ul className={styles.featureList}>
                                    {card.features.map((feature) => (
                                        <li key={feature} className={styles.featureItem}>
                                            <span className={styles.featureCheck}>
                                                <i className="bi bi-check-lg"></i>
                                            </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>

                <div className={styles.complianceCta}>
                    <div className={styles.ctaContent}>
                        <h3 className={styles.ctaTitle}>Choose Quality, Compliance & Reliability</h3>
                        <p className={styles.ctaDescription}>
                            When you choose Dentist Email List, you&apos;re choosing quality, compliance, and reliability, ensuring that your healthcare outreach campaigns succeed without legal risks.
                        </p>
                        <button className={styles.ctaButton}>
                            Get Started Today
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ComplianceDataIntegrity;