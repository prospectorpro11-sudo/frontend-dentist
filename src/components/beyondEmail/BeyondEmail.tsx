import classNames from 'classnames';
import styles from './beyondEmail.module.scss';
import {
    BsCloudArrowDownFill,
    BsEnvelopePaperFill,
    BsPhoneFill,
    BsShieldLockFill,
} from 'react-icons/bs';

const sectionInfo = {
    headingLine: 'Go Beyond Just',
    headingAccent: 'Email Address',
    headingAccentClassName: 'shifting-accent',
    sub: 'ClinicalCurator provides deep firmographic insights. Know what practice management software they use, their preferred equipment.',
} as const;

const steps = [
    {
        number: '01',
        title: 'AI-Driven Sourcing',
        description: 'We scan 500+ professional registries and public records daily.',
    },
    {
        number: '02',
        title: 'Human Verification',
        description: 'Dedicated analysts validate each contact for accuracy and relevance.',
    },
    {
        number: '03',
        title: 'Real-time Cleansing',
        description: 'Continuous hygiene to keep your data fresh and deliverable.',
    },
] as const;

const featureCards = [
    {
        id: 'delivery',
        variantClass: 'beFc1',
        icon: BsCloudArrowDownFill,
        titleLine1: 'Instant delivery via',
        titleLine2: 'secure download',
    },
    {
        id: 'mobile',
        variantClass: 'beFc2',
        icon: BsPhoneFill,
        titleLine1: 'Mobile-optimized',
        titleLine2: 'data exports',
    },
    {
        id: 'formats',
        variantClass: 'beFc3',
        icon: BsEnvelopePaperFill,
        titleLine1: 'Multiple format',
        titleLine2: 'support',
    },
    {
        id: 'encrypted',
        variantClass: 'beFc4',
        icon: BsShieldLockFill,
        titleLine1: 'End-to-end',
        titleLine2: 'encrypted transit',
    },
] as const;

const BeyondEmail = () => {
    return (
        <section className={styles.beyondEmail}>
            <div className={classNames('container', styles.beyondEmailContainer)}>

                {/* Background decorations */}
                <div className={classNames(styles.beBlob, styles.beBlob1)}></div>
                <div className={classNames(styles.beBlob, styles.beBlob2)}></div>
                <div className={classNames(styles.beBlob, styles.beBlob3)}></div>

                <div className={styles.beRow}>
                    {/* LEFT: Content */}
                    <div className={styles.beContent}>
                        <h2 className={styles.beHeading}>
                            {sectionInfo.headingLine}<br /><span className={sectionInfo.headingAccentClassName}>{sectionInfo.headingAccent}</span>
                        </h2>
                        <p className={styles.beSub}>
                            {sectionInfo.sub}
                        </p>

                        <div className={styles.beSteps}>
                            {steps.map((step, index) => (
                                <div key={step.number} className={styles.beStep}>
                                    <span className={styles.beStepNum}>{index < 9 ? `0${index + 1}` : index + 1}</span>
                                    <div className={styles.beStepText}>
                                        <strong>{step.title}</strong>
                                        <span>{step.description}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Feature Cards Grid */}
                    <div className={styles.beVisual}>
                        <div className={styles.beCardGrid}>
                            {featureCards.map((card) => {
                                const Icon = card.icon;
                                return (
                                    <div
                                        key={card.id}
                                        className={classNames(styles.beFcard, styles[card.variantClass])}
                                    >
                                        <div className={styles.beFcIcon}>
                                            <Icon aria-hidden="true" focusable="false" />
                                        </div>
                                        <h4>
                                            {card.titleLine1}<br />{card.titleLine2}
                                        </h4>
                                    </div>
                                );
                            })}

                            {/* Connecting line decoration */}
                            <svg className={styles.beConnector} viewBox="0 0 120 120" fill="none">
                                <path
                                    d="M30 10 Q60 10 60 50 Q60 90 90 90"
                                    stroke="url(#connGrad)"
                                    strokeWidth="2"
                                    strokeDasharray="6 6"
                                    fill="none"
                                    opacity="0.3"
                                />
                                <defs>
                                    <linearGradient id="connGrad" x1="0" y1="0" x2="120" y2="120">
                                        <stop stopColor="#0ea5e9" />
                                        <stop offset="1" stopColor="#14b8a6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BeyondEmail;
