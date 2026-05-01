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
import { Col, Container, Row } from 'react-bootstrap';
import { IWhatsIncluded } from '../../shared/interface';
import Button from '../button/Button';
import { BUTTON_SIZE_ENUM } from '@/shared/enums';
import { COMMON_URLS } from '@/shared/constant';

const footerIconMap = {
    check: BiCheckCircle,
    download: BiSolidDownload,
    time: BiTimeFive,
    customize: BiCustomize,
} as const;

const WhatsIncluded = (props: IWhatsIncluded) => {
    const { checklistItems: CHECKLIST_ITEMS,
        tableData: TABLE_DATA,
        footerItems: FOOTER_ITEMS,
        stats: STATS,
        content: CONTENT } = props;

    return (
        <section className={styles.whatsIncluded}>
            <Container>
                {/* Background decorations */}
                <div className={classNames(styles.wiBlob, styles.wiBlob1)}></div>
                <div className={classNames(styles.wiBlob, styles.wiBlob2)}></div>

                <div className={styles.wiMainCard}>
                    <Row className={styles.wiInner}>
                        {/* LEFT: Content */}
                        <Col xs={12} lg={6}>
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
                            <br />
                            <br />
                            <a href={COMMON_URLS.freeSample} className={styles.wiCta}>
                                <Button size={BUTTON_SIZE_ENUM.LARGE}><BiGift /> {CONTENT.ctaText}</Button>
                            </a>
                        </Col>
                        <Col xs={12} lg={6}>
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
                                                                    <div className={classNames(styles.wiIsoAvatar, styles[row.avatarClass])}>{row.initials}</div>
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
                                                    <BiUser color="#fff" />
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
                        </Col>
                    </Row>

                    {/* Footer bar */}
                    <div className={styles.wiFooter}>
                        {FOOTER_ITEMS.map((item, index) => (
                            <div key={index} className={styles.wiFooterItem}>
                                {(() => {
                                    const Icon = footerIconMap[item.icon as keyof typeof footerIconMap];
                                    return <Icon />;
                                })()}
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
