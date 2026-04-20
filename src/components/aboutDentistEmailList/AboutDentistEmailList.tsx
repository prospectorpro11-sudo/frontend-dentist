import classnames from 'classnames';
import { Container } from 'react-bootstrap';
import styles from './aboutDentistEmailList.module.scss';
import Button from '../button/Button';
import { BUTTON_SIZE_ENUM } from '@/shared/enums';

type TrustColor = 'blue' | 'teal' | 'indigo';

const trustCards: Array<{ iconClass: string; title: string; description: string; color: TrustColor }> = [
    {
        iconClass: 'bi bi-building',
        title: 'Trusted by Industry Leaders',
        description: 'From startups to Fortune 500 companies, thousands trust our verified dentist data for their marketing campaigns.',
        color: 'blue',
    },
    {
        iconClass: 'bi bi-headset',
        title: '24/7 Customer Support',
        description: 'Our dedicated team provides expert guidance and assistance to ensure your campaign success at every step.',
        color: 'teal',
    },
    {
        iconClass: 'bi bi-arrow-repeat',
        title: 'Continuous Data Updates',
        description: 'We continuously verify and update our database to ensure maximum deliverability and data accuracy above 95%.',
        color: 'indigo',
    },
];

const AboutDentistEmailList = () => {
    return (
        <section className={styles.wrapper}>
            <Container className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        About Us – <span className="shifting-accent">Who We Are</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Dentist Email List specializes in providing accurate, up-to-date, and compliant dentist contact databases for healthcare marketers, recruiters, and research firms.
                    </p>
                </div>

                <div className={styles.aboutLayout}>
                    <div className={styles.trustCards}>
                        {trustCards.map((card) => (
                            <div key={card.title} className={styles.trustCard}>
                                <div className={classnames(styles.trustIcon, styles[card.color])}>
                                    <i className={card.iconClass}></i>
                                </div>
                                <div className={styles.trustContent}>
                                    <h3>{card.title}</h3>
                                    <p>{card.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.mockupContainer}>
                        <div className={styles.mockupBg}>
                            <div className={classnames(styles.mockupBlob, styles.mockupBlob1)}></div>
                            <div className={classnames(styles.mockupBlob, styles.mockupBlob2)}></div>
                            <div className={styles.mockupDots}></div>
                        </div>

                        <div className={styles.mockupParticles}>
                            <div className={styles.mParticle}></div>
                            <div className={styles.mParticle}></div>
                            <div className={styles.mParticle}></div>
                            <div className={styles.mParticle}></div>
                        </div>

                        <div className={classnames(styles.statCard, styles.card1)}>
                            <div className={classnames(styles.statCardIcon, styles.blue)}>
                                <i className="bi bi-envelope-check-fill"></i>
                            </div>
                            <div className={styles.statCardContent}>
                                <div className={styles.statCardValue}>95%+</div>
                                <div className={styles.statCardLabel}>Deliverability</div>
                            </div>
                        </div>

                        <div className={classnames(styles.statCard, styles.card2)}>
                            <div className={classnames(styles.statCardIcon, styles.emerald)}>
                                <i className="bi bi-shield-lock-fill"></i>
                            </div>
                            <div className={styles.statCardContent}>
                                <div className={styles.statCardValue}>100%</div>
                                <div className={styles.statCardLabel}>GDPR Ready</div>
                            </div>
                        </div>

                        <div className={classnames(styles.statCard, styles.card3)}>
                            <div className={classnames(styles.statCardIcon, styles.teal)}>
                                <i className="bi bi-patch-check-fill"></i>
                            </div>
                            <div className={styles.statCardContent}>
                                <div className={styles.statCardValue}>930K+</div>
                                <div className={styles.statCardLabel}>Verified</div>
                            </div>
                        </div>

                        <div className={classnames(styles.statCard, styles.card4)}>
                            <div className={classnames(styles.statCardIcon, styles.indigo)}>
                                <i className="bi bi-arrow-repeat"></i>
                            </div>
                            <div className={styles.statCardContent}>
                                <div className={styles.statCardValue}>Daily</div>
                                <div className={styles.statCardLabel}>Updates</div>
                            </div>
                        </div>

                        <div className={styles.mockupHeader}>
                            <div className={styles.mockupLogo}>
                                <i className="bi bi-tooth"></i>
                            </div>
                            <div className={styles.mockupTitleGroup}>
                                <h3>Dentist Email List</h3>
                                <p>Verified Contact Database Platform</p>
                            </div>
                        </div>

                        <div className={styles.categoryGrid}>
                            <div className={styles.categoryItem}>
                                <div className={classnames(styles.categoryDot, styles.blue)}></div>
                                <span className={styles.categoryName}>General Dentists</span>
                                <div className={styles.categoryCheck}>
                                    <i className="bi bi-check"></i>
                                </div>
                            </div>
                            <div className={styles.categoryItem}>
                                <div className={classnames(styles.categoryDot, styles.teal)}></div>
                                <span className={styles.categoryName}>Orthodontists</span>
                                <div className={styles.categoryCheck}>
                                    <i className="bi bi-check"></i>
                                </div>
                            </div>
                            <div className={styles.categoryItem}>
                                <div className={classnames(styles.categoryDot, styles.indigo)}></div>
                                <span className={styles.categoryName}>Pediatric Dentists</span>
                                <div className={styles.categoryCheck}>
                                    <i className="bi bi-check"></i>
                                </div>
                            </div>
                            <div className={styles.categoryItem}>
                                <div className={classnames(styles.categoryDot, styles.amber)}></div>
                                <span className={styles.categoryName}>Oral Surgeons</span>
                                <div className={styles.categoryCheck}>
                                    <i className="bi bi-check"></i>
                                </div>
                            </div>
                            <div className={styles.categoryItem}>
                                <div className={classnames(styles.categoryDot, styles.emerald)}></div>
                                <span className={styles.categoryName}>Endodontists</span>
                                <div className={styles.categoryCheck}>
                                    <i className="bi bi-check"></i>
                                </div>
                            </div>
                            <div className={styles.categoryItem}>
                                <div className={classnames(styles.categoryDot, styles.rose)}></div>
                                <span className={styles.categoryName}>Periodontists</span>
                                <div className={styles.categoryCheck}>
                                    <i className="bi bi-check"></i>
                                </div>
                            </div>
                        </div>

                        <div className={styles.verificationBar}>
                            <div className={styles.verifyIcon}>
                                <i className="bi bi-shield-check"></i>
                            </div>
                            <div className={styles.verifyContent}>
                                <div className={styles.verifyTitle}>All Categories Verified</div>
                                <div className={styles.verifySubtitle}>Real-time verification & 95%+ deliverability</div>
                            </div>
                            <div className={styles.verifyBadge}>95%+</div>
                        </div>
                    </div>
                </div>

                <div className={styles.ctaSection}>
                    <a href="#">
                        <Button size={BUTTON_SIZE_ENUM.LARGE}>Learn More About Us
                            <i className="bi bi-arrow-right"></i></Button>
                    </a>
                </div>
            </Container>
        </section>
    );
};

export default AboutDentistEmailList;