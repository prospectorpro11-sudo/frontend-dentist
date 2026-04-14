import Link from "next/link";
import styles from "./publicFooterMenu.module.scss";

const PublicFooterMenu = () => {
    return (
        <footer className={styles.siteFooter}>
            <div className={styles.ftPattern}></div>
            <div className={styles.ftPatternFt}></div>
            <div className={styles.ftNoise}></div>
            <div className={`${styles.ftBlob} ${styles.ftBlob1}`}></div>
            <div className={`${styles.ftBlob} ${styles.ftBlob2}`}></div>

            <div className={`container ${styles.ftContainer}`}>
                {/* Footer Main */}
                <div className={styles.ftMain}>
                    {/* Brand Column */}
                    <div className={styles.ftBrandCol}>
                        <Link href="/" className={styles.ftBrand}>
                            <svg viewBox="0 0 32 32" fill="none" width="30" height="30">
                                <path d="M16 4C11 4 6.5 8 5 13.5C3.5 19 4 25 5 30C5.5 33 7 34 8 34C9 34 9.5 28 12.5 28C15.5 28 16 34 16 34C16 34 16.5 28 19.5 28C22.5 28 23 34 24 34C25 34 26.5 33 27 30C28 25 28.5 19 27 13.5C25.5 8 21 4 16 4Z" fill="url(#ft-lg)" />
                                <path d="M11 15L14 23L17 17L20 23L23 15" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                <defs><linearGradient id="ft-lg" x1="16" y1="4" x2="16" y2="34"><stop stopColor="#0ea5e9" /><stop offset="1" stopColor="#0284c7" /></linearGradient></defs>
                            </svg>
                            <span className={styles.ftBrandText}>Dentist<br />Email List</span>
                        </Link>
                        <p className={styles.ftBrandDesc}>
                            Verified dentist contact database built for precision marketing. GDPR compliant, 95%+ deliverability.
                        </p>
                        <div className={styles.ftSocials}>
                            {/* Facebook */}
                            <a href="#" className={`${styles.ftSoc} ${styles.ftSocFb}`} aria-label="Facebook">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 12a8 8 0 10-9.3 7.88V14h-1.9v-2.95H10.7V9.2c0-1.8.6-3.28 3-3.28h2.2v2.9H14.2c-.7 0-1 .45-1 1v1.23h2.9l-.39 2.95H13.9v6A8 8 0 0020 12z" /></svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="#" className={`${styles.ftSoc} ${styles.ftSocLi}`} aria-label="LinkedIn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.76A1.76 1.76 0 000 1.76v20.48A1.76 1.76 0 001.76 24h20.46A1.76 1.76 0 0024 22.24V1.76A1.76 1.76 0 0022.22 0z" /></svg>
                            </a>
                            {/* WhatsApp */}
                            <a href="#" className={`${styles.ftSoc} ${styles.ftSocWa}`} aria-label="WhatsApp">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.38-.27.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.13 4.54.72.31 1.28.49 1.72.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.58-.35l-.01-.01zM12 2a10 10 0 100 20 10 10 0 000-20zm4.64 15.3c-.2.55-1.1 1.01-1.53 1.07-.37.05-.84.08-1.36-.1-.31-.1-.71-.24-1.22-.46-2.15-.93-3.56-3.1-3.67-3.25-.11-.15-.93-1.24-.93-2.36s.59-1.67.8-1.9c.21-.23.46-.29.61-.29.15 0 .31 0 .45.01.15 0 .35-.06.54.41.2.47.68 1.63.74 1.74.05.12.1.25.02.4-.08.16-.12.25-.23.39-.12.14-.25.3-.35.4-.12.12-.24.24-.1.48.14.23.61.99 1.3 1.62.89.79 1.64 1.04 1.87 1.15.24.11.37.1.51-.05.14-.15.59-.69.75-.93.16-.24.32-.2.54-.12.22.08 1.38.65 1.62.77.24.12.4.18.46.28.06.1.06.58-.14 1.14z" /></svg>
                            </a>
                            {/* X / Twitter */}
                            <a href="#" className={`${styles.ftSoc} ${styles.ftSocTw}`} aria-label="X">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2.25l-.55 2.41c-.05.23-.25.38-.49.34l-3.28-.58c-.18-.03-.36.05-.46.21l-4.05 6.28c-.08.13-.07.29.02.41.1.12.26.17.41.12l2.18-.78c.22-.08.47 0 .6.2l2.4 3.78c.11.17.15.38.12.58-.03.2-.16.37-.34.44l-1.22.5c-.21.09-.36.29-.37.52l-.28 3.87c-.02.22.1.43.3.52l3.6 1.64c.46.2 1-.16 1-.66v-7.32c0-.26.11-.5.3-.68l5.95-5.7c.35-.34.08-.92-.4-.89l-2.72.16c-.18.01-.34-.07-.44-.22l-1.47-2.16c-.14-.21-.04-.49.21-.54l2.83-.62c.25-.05.42-.3.35-.55l-.54-1.95c-.12-.44-.51-.76-.97-.81L19 2.24c-.35-.04-.66.22-.72.56-.03.14-.14.26-.28.3.18-.06.38 0 .5.15.14.15.18.36.1.55-.06.15-.06.28 0 .38.1.15.32.2.51.12.18-.06.27-.22.24-.42-.02-.14.05-.3.2-.37.22-.09.47-.02.58.18.12.22.04.5-.18.66-.16.12-.4.14-.58.07-.18-.06-.29-.23-.27-.43.01-.12-.02-.22-.1-.3-.18-.2-.49-.2-.67-.01-.17.18-.18.47-.02.66.1.12.25.17.4.14.16-.04.27-.18.26-.35-.01-.12-.07-.2-.17-.24-.15-.05-.32.02-.38.17-.08.16-.02.35.11.46.13.1.3.12.46.04.17-.1.25-.3.2-.47-.05-.2-.23-.33-.43-.32-.22.01-.38.18-.37.4 0 .22.17.4.4.38.25-.02.43-.24.38-.5-.05-.26-.28-.43-.55-.38-.28.04-.47.29-.41.56.05.28.33.47.6.42z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div className={styles.ftLinks}>
                        <div className={styles.ftLinkCol}>
                            <h4>Product</h4>
                            <Link href="#">Product Tour</Link>
                            <Link href="#">Analytics</Link>
                            <Link href="#">Product Overview</Link>
                            <Link href="#">Pricing</Link>
                            <Link href="#">Free Sample</Link>
                        </div>
                        <div className={styles.ftLinkCol}>
                            <h4>Company</h4>
                            <Link href="#">About Us</Link>
                            <Link href="#">Careers</Link>
                            <Link href="#">Blog</Link>
                            <Link href="#">Contact</Link>
                        </div>
                        <div className={styles.ftLinkCol}>
                            <h4>Resources</h4>
                            <Link href="#">Documentation</Link>
                            <Link href="#">Help Center</Link>
                            <Link href="#">API Reference</Link>
                            <Link href="#">Community</Link>
                            <Link href="#">Status</Link>
                        </div>
                        <div className={styles.ftLinkCol}>
                            <h4>Legal</h4>
                            <Link href="#">Privacy Policy</Link>
                            <Link href="#">Terms of Service</Link>
                            <Link href="#">GDPR Compliance</Link>
                            <Link href="#">Cookie Policy</Link>
                        </div>
                    </div>
                </div>

                {/* Credit / Copyright */}
                <div className={styles.ftBottom}>
                    {/* Animated glow elements */}
                    {/* <div className={styles.ftGlowTail}></div> */}
                    <div className={styles.ftGlowSparks}>
                        <div className={`${styles.glowSpark} ${styles.glowSpark1}`}></div>
                        <div className={`${styles.glowSpark} ${styles.glowSpark2}`}></div>
                        <div className={`${styles.glowSpark} ${styles.glowSpark3}`}></div>
                        <div className={`${styles.glowSpark} ${styles.glowSpark4}`}></div>
                        <div className={`${styles.glowSpark} ${styles.glowSpark5}`}></div>
                    </div>
                    {/* <div className={styles.ftGlowReverse}></div> */}
                    {/* <div className={styles.ftGlowRing}></div> */}
                    {/* <div className={styles.ftPulseRing}></div> */}
                    {/* <div className={styles.ftPulseRing}></div> */}
                    {/* <div className={styles.ftPulseRing}></div> */}
                    {/* <div className={styles.ftGlowBeam}></div> */}
                    {/* <div className={styles.ftGlowFloor}></div> */}
                    
                    <p>Copyright &copy; {new Date().getFullYear()} <strong>Dentist Email List</strong>. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default PublicFooterMenu;
