import classnames from 'classnames';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './verifiedContacts..module.scss';
import LogoIcon from '@/components/logoIcon/LogoIcon';

const floatingBadges: Array<{ value: string; label: string; variant: 'badgeDeliverability' | 'badgeAccuracy' | 'badgeGdpr'; icon: string }> = [
    { value: '95%+', label: 'Deliverability', variant: 'badgeDeliverability', icon: 'bi bi-envelope-paper-fill' },
    { value: '99%', label: 'Accuracy', variant: 'badgeAccuracy', icon: 'bi bi-check-circle-fill' },
    { value: '100%', label: 'GDPR Ready', variant: 'badgeGdpr', icon: 'bi bi-shield-check' },
];

const processSteps: Array<{ label: string; tone: 'blue' | 'mint' | 'purple' | 'green'; icon: string }> = [
    { label: 'Sources', tone: 'blue', icon: 'bi bi-database-check' },
    { label: 'AI Verify', tone: 'mint', icon: 'bi bi-cpu' },
    { label: 'Filter', tone: 'purple', icon: 'bi bi-funnel' },
    { label: 'Download', tone: 'green', icon: 'bi bi-download' },
];

const categoryTags: Array<{ name: string; tone: 'blue' | 'teal' | 'violet' | 'amber' | 'emerald' | 'rose' }> = [
    { name: 'General Dentists', tone: 'blue' },
    { name: 'Orthodontists', tone: 'teal' },
    { name: 'Pediatric', tone: 'violet' },
    { name: 'Oral Surgeons', tone: 'amber' },
    { name: 'Endodontists', tone: 'emerald' },
    { name: 'Periodontists', tone: 'rose' },
];

const VerifiedContacts = () => {
    return (
        <section className="fill">
            <Container>
                <Row className='align-items-center'>
                    <Col xs={12} lg={6}>
                        <h2 className={styles.title}>Delivering<span className="shifting-accent">Verified, Actionable</span>Dental Contacts</h2>
                        <p>We scour 500+ professional registries, licensing boards, and public records daily to build the most accurate dentist contact database available. Every record is multi-source verified, GDPR compliant, and optimized for 95%+ email deliverability.</p>
                        <p>Our one-time purchase model means you own your data — no subscriptions, no hidden fees. Just clean, targeted contacts ready for your campaigns.</p>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div className={styles.mainContainer}>
                            {floatingBadges.map((badge) => (
                                <div key={badge.label} className={classnames(styles.floatingBadge, styles[badge.variant])}>
                                    <div className={styles.badgeIcon}>
                                        <i className={badge.icon}></i>
                                    </div>
                                    <div className={styles.badgeText}>
                                        <strong>{badge.value}</strong>
                                        <span>{badge.label}</span>
                                    </div>
                                </div>
                            ))}

                            <div className={styles.mainCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.headerLeft}>
                                        <div className={styles.toothIconWrapper}>
                                            <LogoIcon width={24} height={24} variant="white" style={{ objectFit: 'scale-down' }} />
                                        </div>
                                        <div className={styles.headerText}>
                                            <h2>Dentist Email List</h2>
                                            <p>Verified Contact Platform</p>
                                        </div>
                                    </div>
                                    <div className={styles.liveBadge}>
                                        <div className={styles.liveDot}></div>
                                        <span className={styles.liveText}>Live</span>
                                    </div>
                                </div>

                                <hr className={styles.headerDivider} />

                                <div className={styles.processFlow}>
                                    {processSteps.map((step, index) => (
                                        <div key={step.label} className={styles.processStepWrap}>
                                            <div className={styles.processStep}>
                                                <div className={classnames(styles.stepIcon, styles[step.tone])}>
                                                    <i className={step.icon}></i>
                                                </div>
                                                <span className={styles.stepLabel}>{step.label}</span>
                                            </div>
                                            {index < processSteps.length - 1 ? <div className={styles.processArrow}>»</div> : null}
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.categoriesTags}>
                                    {categoryTags.map((tag) => (
                                        <div key={tag.name} className={styles.tagItem}>
                                            <div className={classnames(styles.tagDot, styles[tag.tone])}></div>
                                            <span className={styles.tagName}>{tag.name}</span>
                                            <div className={styles.tagCheck}>
                                                <i className="bi bi-check"></i>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default VerifiedContacts;