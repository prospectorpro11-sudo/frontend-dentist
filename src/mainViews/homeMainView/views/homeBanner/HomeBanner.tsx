import Image from 'next/image';
import classNames from 'classnames';
import {
    BsCalendar3,
    BsCurrencyDollar,
    BsGift,
    BsGeoAltFill,
    BsShieldLockFill,
    BsRocketTakeoffFill,
} from 'react-icons/bs';
import Stats from '@/components/stats/Stats';
import styles from './homeBanner.module.scss';
import Button from '@/components/button/Button';
import TrustStrip from '@/components/trustStrip/TrustStrip';
import { IHomeBanner } from '../../../../shared/interface';
import { BUTTON_VARIANT_ENUM, TRUST_STRIP_VARIANT } from '@/shared/enums';
import { Col, Container, Row } from 'react-bootstrap';

const chamberPillIconMap = {
    geo: BsGeoAltFill,
    lock: BsShieldLockFill,
    rocket: BsRocketTakeoffFill,
} as const;

const HomeBanner = (props: IHomeBanner) => {
    const {
        liveBadgeText,
        dateText,
        headingLine1,
        headingAccent,
        description,
        buttons,
        stats,
        chamberPills,
    } = props;

    return (
        <section className={styles.hero}>
            <div className={styles.heroBgLayer}>
                <div className={classNames(styles.gb, styles.gb1)}></div>
                <div className={classNames(styles.gb, styles.gb2)}></div>
                <div className={classNames(styles.gb, styles.gb3)}></div>
                <div className={classNames(styles.gb, styles.gb4)}></div>
                <div className={styles.gbGrid}></div>
            </div>

            <div className={classNames(styles.decoOrb, styles.decoOrb1)}></div>
            <div className={classNames(styles.decoOrb, styles.decoOrb2)}></div>
            <div className={classNames(styles.decoOrb, styles.decoOrb3)}></div>
            <div className={classNames(styles.decoOrb, styles.decoOrb4)}></div>

            {/* <div className={classNames('container', styles.heroContainer)}> */}
            <Container >
                <Row className='align-items-center'>
                    <Col xs={12} lg={7}>
                        <div className={classNames(styles.heroCol, styles.heroColText)}>
                            <div className={styles.textBadges}>
                                <span className={styles.badgeLive}><span></span> {liveBadgeText}</span>
                                <span className={styles.badgeDate}><BsCalendar3 /> {dateText}</span>
                            </div>

                            <h1 className={styles.heroH1}>
                                {headingLine1}<br />
                                <span className="shifting-accent">{headingAccent}</span>
                            </h1>

                            <p className={styles.heroP}>
                                {description.split('930,000+')[0]}<strong>930,000+</strong>{description.split('930,000+')[1]}
                            </p>

                            <div className={styles.heroBtns}>
                                <a href={buttons.pricing.href} className={styles.btnPrimaryCustom}>
                                    <Button variant={BUTTON_VARIANT_ENUM.PRIMARY}><BsCurrencyDollar /> {buttons.pricing.text}</Button>
                                </a>

                                <a href={buttons.sample.href} className={styles.btnSecondaryCustom}>
                                    <Button variant={BUTTON_VARIANT_ENUM.TERTIARY}><BsGift /> {buttons.sample.text}</Button>
                                </a>
                            </div>
                            <TrustStrip variant={TRUST_STRIP_VARIANT.V2} />
                        </div>
                    </Col>
                    <Col xs={12} lg={5} className='mt-5 mt-lg-0'>
                        <div className={styles.heroImageStats}>
                            <div className={classNames(styles.heroCol, styles.heroColStats)}>
                                <Stats stats={stats} />
                            </div>

                            <div className={classNames(styles.heroCol, styles.heroColChamber)}>
                                <div className={styles.chamberScene}>
                                    <div className={styles.chamberGlow}></div>
                                    <div className={styles.chamberFrame}>
                                        <div className={styles.chamberImage}>
                                            <Image
                                                src="/hero.png"
                                                alt="Dentist Professionals"
                                                width={640}
                                                height={720}
                                                className={styles.chamberImgMain}
                                                priority
                                            />
                                        </div>

                                        <div className={classNames(styles.layer, styles.layerBg)}></div>
                                        <div className={classNames(styles.layer, styles.layerMid)}></div>
                                        <div className={classNames(styles.layer, styles.layerFg)}></div>

                                        <div className={classNames(styles.floatEl, styles.el2)}>
                                            <svg width="30" height="30" viewBox="0 0 24 24"><path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74z" fill="#f59e0b" opacity="0.6" /></svg>
                                        </div>

                                        <div className={classNames(styles.floatEl, styles.el3)}>
                                            <div className={styles.elCircle}></div>
                                        </div>

                                        <div className={classNames(styles.floatEl, styles.el4)}>
                                            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74z" fill="#0ea5e9" opacity="0.4" /></svg>
                                        </div>

                                        {chamberPills.map((pill) => {
                                            const Icon = chamberPillIconMap[pill.icon as keyof typeof chamberPillIconMap];
                                            return (
                                                <div key={pill.label} className={classNames(styles.chamberPill, styles[pill.className])}>
                                                    <div className={classNames(styles.cpIcon, styles[pill.iconClass])}><Icon /></div>
                                                    <div><strong>{pill.value}</strong><span>{pill.label}</span></div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* </div> */}
        </section>
    );
};

export default HomeBanner;
