import classnames from 'classnames';
import styles from './verifiedSource.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import LogoIcon from '../logoIcon/LogoIcon';
import classNames from 'classnames';
import { IVerifiedSourceSeed } from '@/shared/interface';

const sourceNodes = [
    { iconClass: 'bi bi-database', label: 'Public Directories', color: 'blue' },
    { iconClass: 'bi bi-people', label: 'Associations', color: 'teal' },
    { iconClass: 'bi bi-calendar-event', label: 'Conferences', color: 'indigo' },
    { iconClass: 'bi bi-award', label: 'Licensing Boards', color: 'amber' },
    { iconClass: 'bi bi-hospital', label: 'Clinic Records', color: 'emerald' },
    { iconClass: 'bi bi-journal-text', label: 'Publications', color: 'blue' },
    { iconClass: 'bi bi-envelope-check', label: 'Opt-in Data', color: 'teal' },
    { iconClass: 'bi bi-mortarboard', label: 'Academic', color: 'indigo' },
]

const VerifiedSource = (props: IVerifiedSourceSeed) => {
    const { content, verifiedDataSources } = props;

    return (
        <section className={classNames(styles.wrapper, 'fill')}>
            <Container>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionBadge}>
                        <i className="bi bi-shield-check"></i>
                        {content.badge}
                    </div>
                    <h2 className={styles.sectionTitle}>
                        {content.title} <span>{content.titleAccent}</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        {content.subtitle}
                    </p>
                </div>
                <Col xs={12} lg={10} className='mx-auto'>
                    <Row>
                        <Col xs={12} md={8}>
                            <div className={styles.sourcesListCard}>
                                <div className={styles.sourcesListTitle}>
                                    <i className="bi bi-check-circle-fill"></i>
                                    {content.sourcesListTitle}
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
                                    {content.ctaText}
                                    <i className="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className={styles.diagramCard}>
                                <div className={styles.diagramCenter}>
                                    <div className={styles.hubIcon}>
                                        <LogoIcon width={40} height={40} variant="white" alt="Logo Icon" style={{ objectFit: 'scale-down' }} />
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
                                    <span className={styles.diagramLabelText}>{content.diagramLabel}</span>
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
