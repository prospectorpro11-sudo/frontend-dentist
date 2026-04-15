import Link from "next/link";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import styles from "./publicFooterMenu.module.scss";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

interface FooterLink {
    label: string;
    href: string;
}

interface FooterLinkSection {
    title: string;
    links: FooterLink[];
}

const footerLinks: FooterLinkSection[] = [
    {
        title: "Product",
        links: [
            { label: "Product Tour", href: "#" },
            { label: "Analytics", href: "#" },
            { label: "Product Overview", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Free Sample", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Contact", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", href: "#" },
            { label: "Help Center", href: "#" },
            { label: "API Reference", href: "#" },
            { label: "Community", href: "#" },
            { label: "Status", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "GDPR Compliance", href: "#" },
            { label: "Cookie Policy", href: "#" },
        ],
    },
];

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
                        <Link href="/" aria-label="Dentist Email List Home">
                            <Image
                                src="/logo-white.png"
                                alt="Dentist Email List"
                                width={120}
                                height={50}
                                priority
                                style={{ objectFit: "scale-down" }}
                            />
                        </Link>
                        <p className={styles.ftBrandDesc}>
                            Verified dentist contact database built for precision marketing. GDPR compliant, 95%+ deliverability.
                        </p>
                        <div className={styles.ftSocials}>
                            {/* Facebook */}
                            <a href="#" className={`${styles.ftSoc} ${styles.ftSocFb}`} aria-label="Facebook">
                                <FaFacebookF size={18} />
                            </a>
                            {/* LinkedIn */}
                            <a href="#" className={`${styles.ftSoc} ${styles.ftSocLi}`} aria-label="LinkedIn">
                                <FaLinkedinIn size={18} />
                            </a>
                            {/* WhatsApp */}
                            <a href="#" className={`${styles.ftSoc} ${styles.ftSocWa}`} aria-label="WhatsApp">
                                <FaWhatsapp size={18} />
                            </a>
                            {/* X / Twitter */}
                            <a href="#" className={`${styles.ftSoc} ${styles.ftSocTw}`} aria-label="X">
                                <FaXTwitter size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div className={styles.ftLinks}>
                        {footerLinks.map((section) => (
                            <div key={section.title} className={styles.ftLinkCol}>
                                <h4>{section.title}</h4>
                                {section.links.map((link) => (
                                    <Link key={link.label} href={link.href}>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Credit / Copyright */}
                <div className={styles.ftBottom}>
                    {/* Animated glow elements */}
                    {/* <div className={styles.ftGlowTail}></div> */}
                    {/* <div className={styles.ftGlowSparks}>
                        <div className={`${styles.glowSpark} ${styles.glowSpark1}`}></div>
                        <div className={`${styles.glowSpark} ${styles.glowSpark2}`}></div>
                        <div className={`${styles.glowSpark} ${styles.glowSpark3}`}></div>
                        <div className={`${styles.glowSpark} ${styles.glowSpark4}`}></div>
                        <div className={`${styles.glowSpark} ${styles.glowSpark5}`}></div>
                    </div> */}
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
