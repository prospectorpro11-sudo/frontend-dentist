import React from 'react';
import classnames from 'classnames';
import styles from './verifiedSource.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import classNames from 'classnames';

type ThemeColor = 'blue' | 'teal' | 'indigo' | 'amber' | 'emerald';

const sourceNodes: Array<{ iconClass: string; label: string; color: ThemeColor }> = [
    { iconClass: 'bi bi-database', label: 'Public Directories', color: 'blue' },
    { iconClass: 'bi bi-people', label: 'Associations', color: 'teal' },
    { iconClass: 'bi bi-calendar-event', label: 'Conferences', color: 'indigo' },
    { iconClass: 'bi bi-award', label: 'Licensing Boards', color: 'amber' },
    { iconClass: 'bi bi-hospital', label: 'Clinic Records', color: 'emerald' },
    { iconClass: 'bi bi-journal-text', label: 'Publications', color: 'blue' },
    { iconClass: 'bi bi-envelope-check', label: 'Opt-in Data', color: 'teal' },
    { iconClass: 'bi bi-mortarboard', label: 'Academic', color: 'indigo' },
];

const verifiedDataSources: Array<{ label: string; color: ThemeColor }> = [
    { label: 'Public Dental Directories', color: 'blue' },
    { label: 'Dental Professional Associations', color: 'teal' },
    { label: 'Industry Conferences & Events', color: 'indigo' },
    { label: 'Dental Licensing Boards', color: 'emerald' },
    { label: 'Dental Trade Publications', color: 'amber' },
    { label: 'Hospital & Clinic Records', color: 'blue' },
    { label: 'Opt-in Subscriptions', color: 'teal' },
    { label: 'Research & Academic Institutions', color: 'indigo' },
    { label: 'Government Health Organizations', color: 'emerald' },
    { label: 'Accredited Certification Boards', color: 'amber' },
];

const trustStats: Array<{ iconClass: string; value: string; label: string; color: 'blue' | 'teal' | 'emerald' }> = [
    { iconClass: 'bi bi-database-check', value: '10+', label: 'Verified Sources', color: 'blue' },
    { iconClass: 'bi bi-patch-check-fill', value: '99.2%', label: 'Data Accuracy', color: 'teal' },
    { iconClass: 'bi bi-shield-lock-fill', value: '100%', label: 'GDPR Compliant', color: 'emerald' },
];

const VerifiedSource = () => {
    return (
        <section className={classNames(styles.wrapper, "fill")}>
            <Container>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionBadge}>
                        <i className="bi bi-shield-check"></i>
                        VERIFIED & TRUSTED
                    </div>
                    <h2 className={styles.sectionTitle}>
                        Verified Sources of <span>Dental Data</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Every contact in our database is sourced from authoritative, verified channels to ensure maximum accuracy and compliance.
                    </p>
                </div>
                <Col xs={12} lg={10} className='mx-auto'>
                    <Row>
                        <Col xs={12} md={8}>
                            <div className={styles.sourcesListCard}>
                                <div className={styles.sourcesListTitle}>
                                    <i className="bi bi-check-circle-fill"></i>
                                    Our Verified Data Sources
                                </div>

                                <div className={styles.sourcesGrid}>
                                    {verifiedDataSources.map((source) => (
                                        <div key={source.label} className={styles.sourceItem}>
                                            <div className={classnames(styles.sourceCheck, styles[source.color])}>
                                                <i className="bi bi-check"></i>
                                            </div>
                                            <span className={styles.sourceText}>{source.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <a href="#" className={styles.ctaLink}>
                                    Learn More About Our Data Sources
                                    <i className="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className={styles.diagramCard}>
                                <div className={styles.diagramCenter}>
                                    <div className={styles.hubIcon}>
                                        <Image src="/logo-icon-white.png" width={40} height={40} alt='Logo Icon' style={{ objectFit: "scale-down" }} />
                                    </div>
                                    <div className={styles.hubRing}></div>
                                    <div className={styles.hubRing}></div>
                                </div>
                                <br />
                                <div className={styles.sourceNodes}>
                                    {sourceNodes.map((node) => (
                                        <div key={node.label} className={styles.sourceNode}>
                                            <div className={classnames(styles.nodeIcon, styles[node.color])}>
                                                <i className={node.iconClass}></i>
                                            </div>
                                            <span className={styles.nodeLabel}>{node.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.diagramLabel}>
                                    <span className={styles.diagramLabelText}>Sources of Dental Data</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Container>
        </section>
    );
};

export default VerifiedSource;