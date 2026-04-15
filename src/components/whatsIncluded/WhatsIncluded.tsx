import classNames from 'classnames';
import {
    BiCheckCircle,
    BiGift,
    BiLockAlt,
    BiUser,
    BiMailSend,
    BiPhone,
    BiShieldAlt2,
    BiBarChart,
    BiGroup,
    BiCheckShield,
    BiTimeFive,
    BiSolidDownload,
    BiCustomize
} from 'react-icons/bi';
import styles from './whatsIncluded.module.scss';
import { Container } from 'react-bootstrap';

const CHECKLIST_ITEMS = [
    { label: 'Full Name' },
    { label: 'Email Address' },
    { label: 'Phone Number' },
    { label: 'Mailing Address' },
    { label: 'License Number' },
    { label: 'Specialty' },
    { label: 'Workplace Information' },
    { label: 'Years of Experience' },
];

const TABLE_DATA = [
    {
        name: 'Dr. Sarah Mitchell',
        initials: 'SM',
        avatarClass: styles.wiIa1,
        email: 'sarah.m@dentalcare.com',
        phone: '(555) 012-3456',
    },
    {
        name: 'Dr. James Park',
        initials: 'JP',
        avatarClass: styles.wiIa2,
        email: 'jpark@smilepros.org',
        phone: '(555) 034-7890',
    },
    {
        name: 'Dr. Amy Lee',
        initials: 'AL',
        avatarClass: styles.wiIa3,
        email: 'alee@brightteeth.net',
        phone: '(555) 056-1234',
    },
    {
        name: 'Dr. Richard Chen',
        initials: 'RC',
        avatarClass: styles.wiIa4,
        email: 'rchen@pearldental.com',
        phone: '(555) 078-5678',
    },
    {
        name: 'Dr. Maria King',
        initials: 'MK',
        avatarClass: styles.wiIa5,
        email: 'mking@familycare.org',
        phone: '(555) 090-3456',
        fade: true,
    },
];

const FOOTER_ITEMS = [
    { icon: BiCheckCircle, label: 'One time payment' },
    { icon: BiSolidDownload, label: 'Instant delivery via secure download' },
    { icon: BiTimeFive, label: 'Update January 2026' },
    { icon: BiCustomize, label: 'Custom Count Available' },
];

const STATS = {
    verifiedRecords: '930,285 verified records',
    deliveryRate: { percentage: '95%', label: 'Delivery' },
    contacts: { count: '930k+', label: 'Contacts' },
    gdprCompliant: 'GDPR Compliant',
};

const CONTENT = {
    heading: "What's",
    headingHighlight: 'Included',
    headingSuffix: 'in the Database?',
    subtitle: 'Get complete and verified dentist contact information for effective, targeted marketing campaigns.',
    ctaText: 'Download Sample Database',
    websiteUrl: 'clinicalcurator.com/database',
};

const WhatsIncluded = () => {
    return (
        <section className={styles.whatsIncluded}>
            <Container>
                {/* Background decorations */}
                <div className={classNames(styles.wiBlob, styles.wiBlob1)}></div>
                <div className={classNames(styles.wiBlob, styles.wiBlob2)}></div>

                <div className={styles.wiMainCard}>
                    <div className={styles.wiInner}>
                        {/* LEFT: Content */}
                        <div className={styles.wiContent}>
                            <h2 className={styles.wiHeading}>
                                {CONTENT.heading} <span className='shifting-accent'>{CONTENT.headingHighlight}</span> {CONTENT.headingSuffix}
                            </h2>
                            <p className={styles.wiSub}>
                                {CONTENT.subtitle}
                            </p>

                            <div className={styles.wiCheckGrid}>
                                {CHECKLIST_ITEMS.map((item, index) => (
                                    <div key={index} className={styles.wiCheckItem}>
                                        <BiCheckCircle />
                                        {item.label}
                                    </div>
                                ))}
                            </div>

                            <a href="#" className={styles.wiCta}>
                                <BiGift />
                                {CONTENT.ctaText}
                            </a>
                        </div>

                        {/* RIGHT: Isometric 3D Data Mockup */}
                        <div className={styles.wiVisual}>
                            <div className={styles.wiIsoScene}>
                                {/* Glow behind */}
                                <div className={styles.wiIsoGlow}></div>

                                {/* Stacked 3D layers */}
                                <div className={styles.wiIsoLayers} id="wiIsoLayers">
                                    {/* Main isometric screen */}
                                    <div className={styles.wiIsoScreen}>
                                        {/* Browser chrome */}
                                        <div className={styles.wiIsoBrowserBar}>
                                            <span className={classNames(styles.wiIsoDot, styles.wiIsoDotRd)}></span>
                                            <span className={classNames(styles.wiIsoDot, styles.wiIsoDotYl)}></span>
                                            <span className={classNames(styles.wiIsoDot, styles.wiIsoDotGr)}></span>
                                            <div className={styles.wiIsoUrlBar}>
                                                <BiLockAlt />
                                                {CONTENT.websiteUrl}
                                            </div>
                                        </div>
                                        {/* Table inside screen */}
                                        <table className={styles.wiIsoTable}>
                                            <thead>
                                                <tr>
                                                    <th><BiUser /> Name</th>
                                                    <th><BiMailSend /> Email</th>
                                                    <th><BiPhone /> Phone</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {TABLE_DATA.map((row, index) => (
                                                    <tr key={index} className={row.fade ? styles.wiTrFade : undefined}>
                                                        <td>
                                                            <div className={styles.wiIsoName}>
                                                                <div className={classNames(styles.wiIsoAvatar, row.avatarClass)}>{row.initials}</div>
                                                                {row.name}
                                                            </div>
                                                        </td>
                                                        <td className={styles.wiIsoEmail}>{row.email}</td>
                                                        <td className={styles.wiIsoPhone}>{row.phone}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {/* Bottom status bar */}
                                        <div className={styles.wiIsoStatus}>
                                            <span><BiCheckCircle /> {STATS.verifiedRecords}</span>
                                            <span><BiShieldAlt2 /> {STATS.gdprCompliant}</span>
                                        </div>
                                    </div>

                                    {/* Floating stat pill 1 — Delivery Rate */}
                                    <div className={classNames(styles.wiStatPill, styles.wiSpTl)}>
                                        <div className={styles.wiSpIcon}><BiBarChart /></div>
                                        <span><strong>{STATS.deliveryRate.percentage}</strong> {STATS.deliveryRate.label}</span>
                                    </div>

                                    {/* Floating stat pill 2 — Records */}
                                    <div className={classNames(styles.wiStatPill, styles.wiSpTr)}>
                                        <div className={classNames(styles.wiSpIcon, styles.wiSpI2)}><BiGroup /></div>
                                        <span><strong>{STATS.contacts.count}</strong> {STATS.contacts.label}</span>
                                    </div>

                                    {/* Floating mini profile card */}
                                    <div className={classNames(styles.wiMiniCard, styles.wiMcLeft)}>
                                        <div className={styles.wiMcInner}>
                                            <div className={styles.wiMcAvatar}>
                                                <BiUser color="#fff"/>
                                            </div>
                                            <div className={styles.wiMcInfo}>
                                                <div className={styles.wiMcNameLine}></div>
                                                <div className={styles.wiMcSubLine}></div>
                                            </div>
                                            <div className={styles.wiMcBadge}><BiCheckShield /></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shadow on "ground" */}
                                <div className={styles.wiIsoShadow}></div>
                            </div>
                        </div>
                    </div>

                    {/* Footer bar */}
                    <div className={styles.wiFooter}>
                        {FOOTER_ITEMS.map((item, index) => (
                            <div key={index} className={styles.wiFooterItem}>
                                <item.icon />
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default WhatsIncluded;
