import styles from './homeBanner.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import {
    BsCalendar3,
    BsCurrencyDollar,
    BsGift,
    BsPatchCheckFill,
    BsShieldFillCheck,
    BsStarFill,
    BsGraphUpArrow,
    BsPeopleFill,
    BsEnvelopeCheckFill,
    BsTelephoneForwardFill,
    BsPrinterFill,
    BsCheckCircleFill,
    BsArrowUpRight,
    BsGeoAltFill,
    BsShieldLockFill,
    BsRocketTakeoffFill,
} from 'react-icons/bs';
import { IHomeBanner } from '../../../../shared/interface';

const trustIconMap = {
    verified: BsPatchCheckFill,
    shield: BsShieldFillCheck,
    star: BsStarFill,
} as const;

const metricIconMap = {
    people: BsPeopleFill,
    email: BsEnvelopeCheckFill,
    phone: BsTelephoneForwardFill,
    fax: BsPrinterFill,
    license: BsPatchCheckFill,
} as const;

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
        trustItems,
        metrics,
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

            <div className={classNames('container', styles.heroContainer)}>

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
                            <BsCurrencyDollar /> {buttons.pricing.text}
                        </a>
                        <a href={buttons.sample.href} className={styles.btnSecondaryCustom}>
                            <BsGift /> {buttons.sample.text}
                        </a>
                    </div>

                    <div className={styles.trustStrip}>
                        {trustItems.map((item) => {
                            const Icon = trustIconMap[item.icon as keyof typeof trustIconMap];

                            return (
                                <div className={styles.tsItem} key={item.label}>
                                    <div className={classNames(styles.tsIcon, styles[item.iconClass])}><Icon /></div>
                                    <span>{item.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={classNames(styles.heroCol, styles.heroColStats)}>
                    <div className={styles.statsPanel}>
                        <div className={styles.spHeader}>
                            <div className={styles.spHeaderIcon}><BsGraphUpArrow /></div>
                            <div className={styles.spHeaderTitle}>
                                <strong>Database Metrics</strong>
                                <span>Real-time overview</span>
                            </div>
                        </div>

                        {metrics.map((metric) => {
                            const Icon = metricIconMap[metric.icon as keyof typeof metricIconMap];
                            return (
                                <div
                                    key={metric.label}
                                    className={classNames(styles.spRow, {
                                        [styles.spRowHighlight]: metric.highlight,
                                        [styles.spRowLast]: metric.last,
                                    })}
                                >
                                    <div className={classNames(styles.spIcon, styles[metric.iconClass])}><Icon size={18} /></div>
                                    <div className={styles.spInfo}>
                                        <strong>{metric.value}</strong>
                                        <span>{metric.label}</span>
                                    </div>
                                    <BsArrowUpRight />
                                </div>
                            );
                        })}

                        <div className={styles.spVerify}>
                            <div className={styles.spVerifyLabel}>
                                <BsCheckCircleFill /> Verification
                            </div>
                            <div className={styles.spVerifyTrack}>
                                <div className={styles.spVerifyFill}></div>
                            </div>
                            <span>100%</span>
                        </div>
                    </div>
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
        </section>
    );
};

export default HomeBanner;
