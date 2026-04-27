import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import type { ReactNode } from "react";
import { FiDownload } from "react-icons/fi";
import Stats from "@/components/stats/Stats";
import { IoMdPricetag } from "react-icons/io";
import { COMMON_URLS } from "@/shared/constant";
import Button from "@/components/button/Button";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./productDetailsBanner.module.scss";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { ProductStats, formatCatalogNumber } from "@/shared/productCatalog";
import { BsCalendarEvent, BsCheckCircleFill, BsCircleFill } from "react-icons/bs";

type BadgeVariant = "blue" | "amber" | "teal";

interface IBadgeItem {
    variant: BadgeVariant;
    icon: ReactNode;
    label: string;
}

interface IProductDetailsBanner {
    stats: ProductStats;
    productName?: string;
    description?: string;
    productId?: string;
}
const ProductDetailsBanner = (props: IProductDetailsBanner) => {
    const { stats: productStats, productName, description, productId } = props;
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Specialists', href: '/products/specialists' },
        { label: productName || productId || "", href: null },
    ]
    const badgeItems: IBadgeItem[] = [
        {
            variant: 'blue',
            icon: <BsCircleFill size={12} />,
            label: 'Live Database',
        },
        {
            variant: 'amber',
            icon: <BsCalendarEvent size={14} />,
            label: 'Jan 01, 2026',
        },
        {
            variant: 'teal',
            icon: <BsCheckCircleFill size={14} />,
            label: 'Verified Database',
        },
    ];

    const stats = [
        { icon: 'people', value: formatCatalogNumber(productStats.totalContacts), label: 'Total Contacts', iconClass: 'spIc1', highlight: true },
        { icon: 'email', value: formatCatalogNumber(productStats.verifiedEmails), label: 'Verified Emails', iconClass: 'spIc2' },
        { icon: 'phone', value: formatCatalogNumber(productStats.directPhones), label: 'Direct Phones', iconClass: 'spIc3' },
        { icon: 'fax', value: formatCatalogNumber(productStats.facilityCount), label: 'Facilities', iconClass: 'spIc4', last: true },
    ]

    const formatTitle = (title: string = "") => {
        const words = title.split(" ");
        if (words.length <= 2) return <>{title}</>;

        const emailIndex = words.findIndex(w => w.toLowerCase() === "email");
        const targetIndex = emailIndex > 0 ? emailIndex - 1 : Math.ceil(words.length / 2) - 1;

        const before = words.slice(0, targetIndex).join(" ");
        const highlight = words[targetIndex];
        const after = words.slice(targetIndex + 1).join(" ");

        return (
            <>
                {before ? <>{before} <br /></> : null}
                <span className="shifting-accent">{highlight}</span> {after}
            </>
        );
    };

    return (
        <section className="banner">
            <div className="surface"></div>
            <Container>
                <Row>
                    <Col xs={12} lg={5}>
                        <Breadcrumb
                            items={breadcrumbs}
                        />
                        <div className={styles.productBadges}>
                            {badgeItems.map((badge, index) => (
                                <div
                                    key={`${badge.variant}-${index}`}
                                    className={classNames(styles.productBadge, styles[`productBadge${badge.variant.charAt(0).toUpperCase() + badge.variant.slice(1)}`])}
                                >
                                    <span className={styles.badgeIcon} aria-hidden="true">{badge.icon}</span>
                                    <span className={styles.badgeLabel}>{badge.label}</span>
                                </div>
                            ))}
                        </div>
                        <h1 className={styles.heroTitle}>
                            {formatTitle(productName || 'Emergency Medicine Physicians Email List')}
                        </h1>
                        <p className={classNames(styles.heroDescription, "mt-4")}>
                            {description || 'Precision-targeted database of emergency medicine professionals — verified, CRM-ready, and optimized for 95%+ deliverability.'}
                        </p>
                        <div className="d-flex align-items-center gap-3 mt-5">
                            <Link href={`/prospector?specialization=${productId || 'Nurse'}`}>
                                <Button variant={BUTTON_VARIANT_ENUM.PRIMARY_LIGHT}><IoMdPricetag size={22} /> Customize List</Button>
                            </Link>
                            <a href={COMMON_URLS.freeSample}>
                                <Button variant={BUTTON_VARIANT_ENUM.GLASS}><FiDownload size={22} /> Free Sample</Button>
                            </a>
                        </div>
                    </Col>
                    <Col xs={12} lg={3}>
                        <Stats stats={stats} isProductDetails={true} />
                    </Col>
                    <Col xs={12} lg={4}>
                        <Image width={450} height={450} style={{ objectFit: "scale-down" }} src="/product-hero-image.png" alt="Product Hero Image" />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProductDetailsBanner;