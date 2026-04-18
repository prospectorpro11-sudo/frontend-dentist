import Button from "@/components/button/Button";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import {
    BsAt,
    BsCollectionFill,
    BsDownload,
    BsEnvelopeCheckFill,
    BsFunnelFill,
    BsPatchCheckFill,
    BsPersonLinesFill,
    BsShieldLockFill,
    BsTelephoneFill,
} from "react-icons/bs";

type AnimatedStats = {
    specialtyLists: number;
    totalContacts: number;
    emailAddresses: number;
    phoneNumbers: number;
};

type HeroAndStatsSectionProps = {
    animatedStats: AnimatedStats;
    fmt: (n: number) => string;
    styles: Record<string, string>;
};

const HeroAndStatsSection = ({ animatedStats, fmt, styles }: HeroAndStatsSectionProps) => {
    return (
        <>
            <section className={styles.hero}>
                <div className={styles.heroSurface}></div>
                <Container>
                    <div className={styles.heroContent}>
                        <div className={styles.heroText}>
                            <div className={styles.liveBadge}>
                                <span className={styles.pulseDot}></span>
                                24 Verified Specialty Databases - Updated Weekly
                            </div>
                            <h1 className={styles.heroTitle}>
                                Premium <span className="shifting-accent">Specialty</span><br />
                                Medical Contact Lists
                            </h1>
                            <p className={styles.heroSub}>
                                Precision-targeted healthcare contact databases for B2B lead generation - verified, GDPR-compliant, and optimized for 95%+ email deliverability.
                            </p>
                            <div className={styles.heroActions}>
                                <a href="#">
                                    <Button variant={BUTTON_VARIANT_ENUM.WHITE}><BsFunnelFill /> Open Prospector</Button>
                                </a>
                                <a href="#">
                                    <Button variant={BUTTON_VARIANT_ENUM.GLASS}><BsDownload /> Full Catalog</Button>
                                </a>
                            </div>
                        </div>
                        <div className={styles.heroVisual}>
                            <div className={classNames(styles.heroFloat, styles.heroFloat1)}>
                                <BsEnvelopeCheckFill />
                                <div>
                                    <div className={styles.val}>930K+</div>
                                    <div className={styles.lbl}>Verified Contacts</div>
                                </div>
                            </div>
                            <div className={classNames(styles.heroFloat, styles.heroFloat2)}>
                                <BsPatchCheckFill />
                                <div>
                                    <div className={styles.val}>95%</div>
                                    <div className={styles.lbl}>Deliverability</div>
                                </div>
                            </div>
                            <div className={classNames(styles.heroFloat, styles.heroFloat3)}>
                                <BsShieldLockFill />
                                <div>
                                    <div className={styles.val}>100%</div>
                                    <div className={styles.lbl}>GDPR Compliant</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <Container className={styles.statsFloat}>
                <div className={styles.statsFloatInner}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <div className={classNames(styles.statIcon, styles.gBlue)}>
                                <BsCollectionFill />
                            </div>
                            <div className={styles.statInfo}>
                                <div className={styles.statVal} data-target="24">{fmt(animatedStats.specialtyLists)}</div>
                                <div className={styles.statLbl}>Specialty Lists</div>
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={classNames(styles.statIcon, styles.gTeal)}>
                                <BsPersonLinesFill />
                            </div>
                            <div className={styles.statInfo}>
                                <div className={styles.statVal} data-target="930285">{fmt(animatedStats.totalContacts)}</div>
                                <div className={styles.statLbl}>Total Contacts</div>
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={classNames(styles.statIcon, styles.gIndigo)}>
                                <BsAt />
                            </div>
                            <div className={styles.statInfo}>
                                <div className={styles.statVal} data-target="885150">{fmt(animatedStats.emailAddresses)}</div>
                                <div className={styles.statLbl}>Email Addresses</div>
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={classNames(styles.statIcon, styles.gAmber)}>
                                <BsTelephoneFill />
                            </div>
                            <div className={styles.statInfo}>
                                <div className={styles.statVal} data-target="142350">{fmt(animatedStats.phoneNumbers)}</div>
                                <div className={styles.statLbl}>Phone Numbers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default HeroAndStatsSection;
