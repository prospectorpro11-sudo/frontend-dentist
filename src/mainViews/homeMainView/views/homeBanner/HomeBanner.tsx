import styles from './homeBanner.module.scss';
import classNames from 'classnames';
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

const HomeBanner = () => {
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
                        <span className={styles.badgeLive}><span></span> Live Database</span>
                        <span className={styles.badgeDate}><BsCalendar3 /> Jan 01, 2026</span>
                    </div>

                    <h1 className={styles.heroH1}>
                        Build Your Targeted<br />
                        <span className="shifting-accent">Dentist Email List</span>
                    </h1>

                    <p className={styles.heroP}>
                        Get direct access to <strong>930,000+</strong> verified dentist contacts
                        — emails, phones, faxes &amp; licenses — all GDPR compliant,
                        built for precision marketing campaigns.
                    </p>

                    <div className={styles.heroBtns}>
                        <a href="#" className={styles.btnPrimaryCustom}>
                            <BsCurrencyDollar /> View Pricing
                        </a>
                        <a href="#" className={styles.btnSecondaryCustom}>
                            <BsGift /> Download Free Sample
                        </a>
                    </div>

                    <div className={styles.trustStrip}>
                        <div className={styles.tsItem}>
                            <div className={classNames(styles.tsIcon, styles.tsI1)}><BsPatchCheckFill /></div>
                            <span>Verified Contacts</span>
                        </div>
                        <div className={styles.tsItem}>
                            <div className={classNames(styles.tsIcon, styles.tsI2)}><BsShieldFillCheck /></div>
                            <span>GDPR Compliant</span>
                        </div>
                        <div className={styles.tsItem}>
                            <div className={classNames(styles.tsIcon, styles.tsI3)}><BsStarFill /></div>
                            <span>4.9 Rating</span>
                        </div>
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

                        <div className={classNames(styles.spRow, styles.spRowHighlight)}>
                            <div className={classNames(styles.spIcon, styles.spIc1)}><BsPeopleFill size={18} /></div>
                            <div className={styles.spInfo}>
                                <strong>930,285</strong>
                                <span>Total Contacts</span>
                            </div>
                            <BsArrowUpRight />
                        </div>

                        <div className={styles.spRow}>
                            <div className={classNames(styles.spIcon, styles.spIc2)}><BsEnvelopeCheckFill size={18} /></div>
                            <div className={styles.spInfo}>
                                <strong>930,285</strong>
                                <span>Emails</span>
                            </div>
                            <BsArrowUpRight />
                        </div>

                        <div className={styles.spRow}>
                            <div className={classNames(styles.spIcon, styles.spIc3)}><BsTelephoneForwardFill size={18} /></div>
                            <div className={styles.spInfo}>
                                <strong>930,285</strong>
                                <span>Phones</span>
                            </div>
                            <BsArrowUpRight />
                        </div>

                        <div className={styles.spRow}>
                            <div className={classNames(styles.spIcon, styles.spIc4)}><BsPrinterFill size={18} /></div>
                            <div className={styles.spInfo}>
                                <strong>930,285</strong>
                                <span>Faxes</span>
                            </div>
                            <BsArrowUpRight />
                        </div>

                        <div className={classNames(styles.spRow, styles.spRowLast)}>
                            <div className={classNames(styles.spIcon, styles.spIc5)}><BsPatchCheckFill size={18} /></div>
                            <div className={styles.spInfo}>
                                <strong>930,285</strong>
                                <span>Licenses</span>
                            </div>
                            <BsArrowUpRight />
                        </div>

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
                                <img src="/hero.png" alt="Dentist Professionals" className={styles.chamberImgMain} />
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

                            <div className={classNames(styles.chamberPill, styles.cPillTl)}>
                                <div className={classNames(styles.cpIcon, styles.cpIc1)}><BsGeoAltFill /></div>
                                <div><strong>95%</strong><span>Delivery Rate</span></div>
                            </div>

                            <div className={classNames(styles.chamberPill, styles.cPillTr)}>
                                <div className={classNames(styles.cpIcon, styles.cpIc2)}><BsShieldLockFill /></div>
                                <div><strong>100%</strong><span>GDPR</span></div>
                            </div>

                            <div className={classNames(styles.chamberPill, styles.cPillBl)}>
                                <div className={classNames(styles.cpIcon, styles.cpIc3)}><BsRocketTakeoffFill /></div>
                                <div><strong>+500k</strong><span>Verified</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HomeBanner;
