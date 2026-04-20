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
    BsGeoAltFill,
    BsShieldLockFill,
    BsRocketTakeoffFill,
} from 'react-icons/bs';
import { IHomeBanner } from '../../../../shared/interface';
import Button from '@/components/button/Button';
import { BUTTON_VARIANT_ENUM } from '@/shared/enums';
import Stats from '@/components/stats/Stats';
import { RiShieldCheckFill } from 'react-icons/ri';
import { BiSolidCheckShield } from 'react-icons/bi';

// const trustIconMap = {
//     verified: BsPatchCheckFill,
//     shield: BsShieldFillCheck,
//     star: BsStarFill,
// } as const;

const trustStrip2Items = [
    {
        label: 'Verified Contacts',
        icon: RiShieldCheckFill,
        iconClass: 't2ShieldBlue',
        starCount: 9,
        starClass: 't2StarsBlue',
        iconSize: 24,
    },
    {
        label: 'GDPR Compliant',
        icon: BiSolidCheckShield,
        iconClass: 't2ShieldAmber',
        starCount: 9,
        starClass: 't2StarsBlue',
        iconSize: 26,
    },
    {
        label: '4.9 Rating',
        icon: BsStarFill,
        iconClass: 't2StarAmber',
        starCount: 5,
        starClass: 't2StarsAmber',
        iconSize: 22,
    },
] as const;



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
                            <Button variant={BUTTON_VARIANT_ENUM.PRIMARY}><BsCurrencyDollar /> {buttons.pricing.text}</Button>
                        </a>

                        <a href={buttons.sample.href} className={styles.btnSecondaryCustom}>
                            <Button variant={BUTTON_VARIANT_ENUM.TERTIARY}><BsGift /> {buttons.sample.text}</Button>
                        </a>
                    </div>

                    {/* <div className={styles.trustStrip}>
                        {trustItems.map((item) => {
                            const Icon = trustIconMap[item.icon as keyof typeof trustIconMap];

                            return (
                                <div className={styles.tsItem} key={item.label}>
                                    <div className={classNames(styles.tsIcon, styles[item.iconClass])}><Icon /></div>
                                    <span>{item.label}</span>
                                </div>
                            );
                        })}
                    </div> */}
                    <div className={styles.trustStrip2}>
                        {trustStrip2Items.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div className={styles.t2Item} key={item.label}>
                                    <div className={classNames(styles.t2Icon, styles[item.iconClass])}>
                                        <Icon size={item.iconSize} />
                                    </div>
                                    <div className={styles.t2Content}>
                                        <span className={styles.t2Label}>{item.label}</span>
                                        <div className={classNames(styles.t2Stars, styles[item.starClass])}>
                                            {Array.from({ length: item.starCount }).map((_, idx) => (
                                                <BsStarFill key={`${item.label}-${idx}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

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
        </section>
    );
};

export default HomeBanner;
