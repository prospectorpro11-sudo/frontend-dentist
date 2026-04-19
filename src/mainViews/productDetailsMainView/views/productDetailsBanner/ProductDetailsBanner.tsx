import { Col, Container, Row } from "react-bootstrap";
import styles from "./productDetailsBanner.module.scss";
import Stats from "@/components/stats/Stats";
import Image from "next/image";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Button from "@/components/button/Button";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";
import { IoMdPricetag } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { BsCalendarEvent, BsCheckCircleFill, BsCircleFill } from "react-icons/bs";
import classNames from "classnames";
import type { ReactNode } from "react";

type BadgeVariant = "blue" | "amber" | "teal";

interface IBadgeItem {
    variant: BadgeVariant;
    icon: ReactNode;
    label: string;
}
const stats = [
    { icon: 'people', value: '930,285', label: 'Total Contacts', iconClass: 'spIc1', highlight: true },
    { icon: 'email', value: '930,285', label: 'Emails', iconClass: 'spIc2' },
    { icon: 'phone', value: '930,285', label: 'Phones', iconClass: 'spIc3' },
    { icon: 'fax', value: '930,285', label: 'Faxes', iconClass: 'spIc4' },
    { icon: 'license', value: '930,285', label: 'Licenses', iconClass: 'spIc5', last: true },
]

const ProductDetailsBanner = () => {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Specialists', href: '/products/specialists' },
        { label: 'Emergency Medicine Physicians', href: null },
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
                            Emergency Medicine <br /><span className="shifting-accent">Physicians</span> Email List
                        </h1>
                        <p className={classNames(styles.heroDescription, "mt-4")}>
                            Precision-targeted database of emergency medicine professionals — verified, CRM-ready, and optimized for 95%+ deliverability.
                        </p>
                        <div className="d-flex align-items-center gap-3 mt-5">
                            <Button variant={BUTTON_VARIANT_ENUM.PRIMARY_LIGHT}><IoMdPricetag size={22} /> View Pricing</Button>
                            <Button variant={BUTTON_VARIANT_ENUM.GLASS}><FiDownload size={22} /> Free Sample</Button>
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