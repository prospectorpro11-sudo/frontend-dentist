import classNames from 'classnames';
import styles from './beyondEmail.module.scss';
import {
    BsCloudArrowDownFill,
    BsEnvelopePaperFill,
    BsPhoneFill,
    BsShieldLockFill,
} from 'react-icons/bs';
import { IBeyondEmail } from '../../shared/interface';
import { Col, Container, Row } from 'react-bootstrap';

const featureCardIcons = {
    download: BsCloudArrowDownFill,
    phone: BsPhoneFill,
    mail: BsEnvelopePaperFill,
    lock: BsShieldLockFill,
} as const;

const BeyondEmail = (props: IBeyondEmail) => {
    const { sectionInfo, steps, featureCards } = props;

    return (
        <section className={styles.beyondEmail}>
            <Container>

                {/* Background decorations */}
                <div className={classNames(styles.beBlob, styles.beBlob1)}></div>
                <div className={classNames(styles.beBlob, styles.beBlob2)}></div>
                <div className={classNames(styles.beBlob, styles.beBlob3)}></div>

                <Row className='justify-content-center'>
                    {/* LEFT: Content */}
                    <Col xs={12} lg={5}>
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
                    </Col>

                    {/* RIGHT: Feature Cards Grid */}
                    <Col xs={12} lg={6} className='mt-5 mt-lg-0'>
                        <div className={styles.beCardGrid}>
                            {featureCards.map((card) => {
                                const Icon = featureCardIcons[card.icon as keyof typeof featureCardIcons];
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
                    </Col>
                </Row>

            </Container>
        </section>
    );
};

export default BeyondEmail;
