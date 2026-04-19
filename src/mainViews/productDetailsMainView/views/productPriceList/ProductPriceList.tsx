import styles from "./productPriceList.module.scss";
import classnames from "classnames";
import { Col, Container, Row } from "react-bootstrap";
import {
    BsCashCoin,
    BsFileEarmarkText,
    BsShieldCheck,
    BsLock,
    BsPatchCheck,
    BsStars,
    BsCheck2,
    BsSliders,
} from "react-icons/bs";

type PricingTier = {
    leads: string;
    costPerLead: string;
    totalPrice: string;
    isPopular?: boolean;
};

type DataField = {
    label: string;
    fullWidth?: boolean;
};

const pageContent = {
    title: "Allergist & Dentist Contact List Pricing",
    description:
        "Access targeted healthcare contacts through our Prospector Tool with smart filters to ensure outreach precision. Volume discounts applied automatically.",
    tableTitle: "Pricing Tiers",
    tableSubtitle: "Select your preferred lead volume",
    tableHeaders: ["Leads", "Cost / Lead", "Total Price"],
    tabs: ["All Tiers", "Popular"],
    includedTitle: "Included Data Fields",
    starterOfferTitle: "STARTER OFFER",
    starterSubtitle: "Start with",
    starterLeads: "250",
    starterLeadsLabel: "leads for only",
    starterPrice: "$39",
    starterDescription:
        "Perfect for testing your outreach campaign before scaling up.",
    starterButtonLabel: "Customize this List",
    guaranteeLabel: "100% data accuracy guarantee",
    footerBulkPricing: "Bulk pricing on prospector",
};

const pricingTiers: PricingTier[] = [
    { leads: "66", costPerLead: "$0.06", totalPrice: "$3.96" },
    { leads: "100", costPerLead: "$0.05", totalPrice: "$5.00" },
    { leads: "500", costPerLead: "$0.035", totalPrice: "$17.50" },
    { leads: "1,000", costPerLead: "$0.03", totalPrice: "$30.00" },
    { leads: "2,500", costPerLead: "$0.025", totalPrice: "$62.50", isPopular: true },
    { leads: "5,000", costPerLead: "$0.02", totalPrice: "$100.00" },
    { leads: "10,000", costPerLead: "$0.015", totalPrice: "$150.00" },
    { leads: "15,000", costPerLead: "$0.014", totalPrice: "$210.00" },
    { leads: "20,000", costPerLead: "$0.013", totalPrice: "$260.00" },
    { leads: "25,000", costPerLead: "$0.0125", totalPrice: "$312.50" },
    { leads: "50,000", costPerLead: "$0.01", totalPrice: "$500.00" },
    { leads: "100,000", costPerLead: "$0.008", totalPrice: "$800.00" },
];

const includedDataFields: DataField[] = [
    { label: "Full Name + Credentials" },
    { label: "Verified Emails" },
    { label: "NPI & License" },
    { label: "Phone & Fax Numbers" },
    { label: "Mailing Addresses" },
    { label: "State, ZIP, City" },
    { label: "Specialty, License State, Graduation Year", fullWidth: true },
];

const trustBadges = [
    { label: "HIPAA Compliant", icon: BsShieldCheck },
    { label: "Secure Data", icon: BsLock },
    { label: "Verified Sources", icon: BsPatchCheck },
];

const ProductPriceList = () => {
    return (
        <section className={styles.pricingTiers}>
            <Container>
                <div className={styles.header}>
                    <h1 className={styles.headerTitle}>{pageContent.title}</h1>
                    <p className={styles.headerDescription}>{pageContent.description}</p>
                </div>
                <Col xs={12} lg={9} className="mx-auto" >
                    <Row>
                        <Col xs={12} lg={7}>
                            <div className={styles.pricingCard}>
                                <div className={styles.pricingCardHeader}>
                                    <div>
                                        <div className={styles.pricingCardHeaderTitle}>
                                            <BsCashCoin className={styles.pricingCardHeaderTitleIcon} />
                                            {pageContent.tableTitle}
                                        </div>
                                        <div className={styles.pricingCardHeaderSubtitle}>{pageContent.tableSubtitle}</div>
                                    </div>

                                    <div className={styles.tabGroup}>
                                        {pageContent.tabs.map((tab, index) => (
                                            <button
                                                key={tab}
                                                type="button"
                                                className={classnames(styles.tab, index === 0 && styles.activeTab)}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <table className={styles.table}>
                                    <thead className={styles.tableHead}>
                                        <tr>
                                            {pageContent.tableHeaders.map((header, index) => (
                                                <th key={header} className={classnames(styles.tableCell, index === 0 ? styles.leftCell : styles.centerCell)}>
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody className={styles.tableBody}>
                                        {pricingTiers.map((tier) => (
                                            <tr key={tier.leads} className={styles.tableRow}>
                                                <td className={classnames(styles.tableCell, styles.leftCell, styles.primaryCell)}>
                                                    <span className={styles.leadCount}>
                                                        {tier.leads}
                                                        {tier.isPopular && <span className={styles.popularBadge}>Popular</span>}
                                                    </span>
                                                </td>
                                                <td className={classnames(styles.tableCell, styles.centerCell)}>{tier.costPerLead}</td>
                                                <td className={classnames(styles.tableCell, styles.centerCell)}>{tier.totalPrice}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                    <tfoot className={styles.tableFooter}>
                                        <tr>
                                            <td className={classnames(styles.tableCell, styles.leftCell, styles.primaryCell)}>&gt; 100,000</td>
                                            <td className={classnames(styles.tableCell, styles.centerCell)}>-</td>
                                            <td className={classnames(styles.tableCell, styles.centerCell, styles.bulkCell)}>{pageContent.footerBulkPricing}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </Col>
                        <Col xs={12} lg={5}>
                            <div className={styles.rightPanel}>
                                <div className={styles.dataFieldsCard}>
                                    <div className={styles.dataFieldsCardTitle}>
                                        <div className={styles.dataFieldsCardIcon}>
                                            <BsFileEarmarkText />
                                        </div>
                                        {pageContent.includedTitle}
                                    </div>

                                    <div className={styles.dataFieldsCardGrid}>
                                        {includedDataFields.map((field) => (
                                            <div
                                                key={field.label}
                                                className={classnames(
                                                    styles.dataFieldsCardItem,
                                                    field.fullWidth && styles.dataFieldsCardItemFullWidth
                                                )}
                                            >
                                                <div className={styles.dataFieldsCardCheck}>
                                                    <BsCheck2 />
                                                </div>
                                                <span className={styles.dataFieldsCardLabel}>{field.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.starterCard}>
                                    <div className={styles.starterCardOffer}>
                                        <BsStars className={styles.starterCardOfferSparkle} />
                                        {pageContent.starterOfferTitle}
                                    </div>
                                    <div className={styles.starterCardSubtitle}>{pageContent.starterSubtitle}</div>
                                    <div className={styles.starterCardLeads}>{pageContent.starterLeads}</div>
                                    <div className={styles.starterCardLeadsLabel}>{pageContent.starterLeadsLabel}</div>
                                    <div className={styles.starterCardPrice}>{pageContent.starterPrice}</div>
                                    <p className={styles.starterCardDescription}>{pageContent.starterDescription}</p>

                                    <button type="button" className={styles.starterCardButton}>
                                        <BsSliders />
                                        {pageContent.starterButtonLabel}
                                    </button>

                                    <div className={styles.starterCardGuarantee}>
                                        <BsPatchCheck />
                                        {pageContent.guaranteeLabel}
                                    </div>
                                </div>

                                <div className={styles.badges}>
                                    {trustBadges.map((badge) => {
                                        const Icon = badge.icon;

                                        return (
                                            <div key={badge.label} className={styles.badge}>
                                                <Icon />
                                                {badge.label}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Container>
        </section>
    );
};

export default ProductPriceList;