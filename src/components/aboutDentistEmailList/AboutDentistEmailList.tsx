import classnames from 'classnames';
import { Container } from 'react-bootstrap';
import styles from './aboutDentistEmailList.module.scss';
import Button from '../button/Button';
import { BUTTON_SIZE_ENUM } from '@/shared/enums';
import { IAboutDentistEmailListSeed } from '@/shared/interface';
import LogoIcon from '../logoIcon/LogoIcon';

const statCards = [
    {
        iconClass: 'bi bi-envelope-check-fill',
        value: '95%+',
        label: 'Deliverability',
        color: 'blue',
        positionClass: 'card1',
    },
    {
        iconClass: 'bi bi-shield-lock-fill',
        value: '100%',
        label: 'GDPR Ready',
        color: 'emerald',
        positionClass: 'card2',
    },
    {
        iconClass: 'bi bi-patch-check-fill',
        value: '930K+',
        label: 'Verified',
        color: 'teal',
        positionClass: 'card3',
    },
    {
        iconClass: 'bi bi-arrow-repeat',
        value: 'Daily',
        label: 'Updates',
        color: 'indigo',
        positionClass: 'card4',
    },
]
const categories = [
    { name: 'General Dentists', color: 'blue' },
    { name: 'Orthodontists', color: 'teal' },
    { name: 'Pediatric Dentists', color: 'indigo' },
    { name: 'Oral Surgeons', color: 'amber' },
    { name: 'Endodontists', color: 'emerald' },
    { name: 'Periodontists', color: 'rose' },
]

const AboutDentistEmailList = (props: IAboutDentistEmailListSeed) => {
    const { content, trustCards } = props;

    return (
        <section className={styles.wrapper}>
            <Container className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        {content.title} <span className="shifting-accent">{content.titleAccent}</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        {content.subtitle}
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

                        {statCards.map((card) => (
                            <div key={card.positionClass} className={classnames(styles.statCard, styles[card.positionClass])}>
                                <div className={classnames(styles.statCardIcon, styles[card.color])}>
                                    <i className={card.iconClass}></i>
                                </div>
                                <div className={styles.statCardContent}>
                                    <div className={styles.statCardValue}>{card.value}</div>
                                    <div className={styles.statCardLabel}>{card.label}</div>
                                </div>
                            </div>
                        ))}

                        <div className={styles.mockupHeader}>
                            <div className={styles.mockupLogo}>
                                <LogoIcon width={24} height={24} variant="white" style={{ objectFit: 'scale-down' }} />
                            </div>
                            <div className={styles.mockupTitleGroup}>
                                <h3>{content.mockupTitle}</h3>
                                <p>{content.mockupSubtitle}</p>
                            </div>
                        </div>

                        <div className={styles.categoryGrid}>
                            {categories.map((category) => (
                                <div key={category.name} className={styles.categoryItem}>
                                    <div className={classnames(styles.categoryDot, styles[category.color])}></div>
                                    <span className={styles.categoryName}>{category.name}</span>
                                    <div className={styles.categoryCheck}>
                                        <i className="bi bi-check"></i>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.verificationBar}>
                            <div className={styles.verifyIcon}>
                                <i className="bi bi-shield-check"></i>
                            </div>
                            <div className={styles.verifyContent}>
                                <div className={styles.verifyTitle}>{content.verifyTitle}</div>
                                <div className={styles.verifySubtitle}>{content.verifySubtitle}</div>
                            </div>
                            <div className={styles.verifyBadge}>{content.verifyBadge}</div>
                        </div>
                    </div>
                </div>

                <div className={styles.ctaSection}>
                    <a href="#">
                        <Button size={BUTTON_SIZE_ENUM.LARGE}>{content.ctaButtonText}
                            <i className="bi bi-arrow-right"></i></Button>
                    </a>
                </div>
            </Container>
        </section>
    );
};

export default AboutDentistEmailList;
