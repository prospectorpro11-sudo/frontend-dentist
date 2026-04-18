import classNames from "classnames";
import {
    BsDownload,
    BsEnvelopeCheckFill,
    BsFunnelFill,
    BsPatchCheckFill,
    BsShieldLockFill,
} from "react-icons/bs";
import { Container } from "react-bootstrap";
import styles from "./productListMainView.module.scss";

const ProductListMainView = () => {
    return (
        <div>
            <section className={styles.hero}>
                <div className={styles.heroSurface}></div>
                <Container>
                    <div className={styles.heroContent}>
                        <div className={styles.heroText}>
                            <div className={styles.liveBadge}>
                                <span className={styles.pulseDot}></span>
                                24 Verified Specialty Databases — Updated Weekly
                            </div>
                            <h1 className={styles.heroTitle}>
                                Premium <span className="shifting-accent">Specialty</span><br />
                                Medical Contact Lists
                            </h1>
                            <p className={styles.heroSub}>
                                Precision-targeted healthcare contact databases for B2B lead generation — verified, GDPR-compliant, and optimized for 95%+ email deliverability.
                            </p>
                            <div className={styles.heroActions}>
                                <a href="#" className={classNames(styles.btn, styles.btnWhite)}>
                                    <BsFunnelFill /> Open Prospector
                                </a>
                                <a href="#" className={classNames(styles.btn, styles.btnGhost)}>
                                    <BsDownload /> Full Catalog
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
        </div>
    );
};

export default ProductListMainView;