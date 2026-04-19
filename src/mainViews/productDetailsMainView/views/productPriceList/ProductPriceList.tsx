import Button from "@/components/button/Button";
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
import type { IconType } from "react-icons";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";

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

type TrustBadge = {
    label: string;
    icon: string;
};

type PageContent = {
    title: string;
    description: string;
    tableTitle: string;
    tableSubtitle: string;
    tableHeaders: string[];
    tabs: string[];
    includedTitle: string;
    starterOfferTitle: string;
    starterSubtitle: string;
    starterLeads: string;
    starterLeadsLabel: string;
    starterPrice: string;
    starterDescription: string;
    starterButtonLabel: string;
    guaranteeLabel: string;
    footerBulkPricing: string;
};

type ProductPriceListData = {
    pageContent: PageContent;
    pricingTiers: PricingTier[];
    includedDataFields: DataField[];
    trustBadges: TrustBadge[];
};

const iconMap: Record<string, IconType> = {
    BsShieldCheck,
    BsLock,
    BsPatchCheck,
};

const ProductPriceList = (props: ProductPriceListData) => {
    const { pageContent, pricingTiers, includedDataFields, trustBadges } = props;

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
                                    <thead className={styles.tableHeader}>
                                        <tr>
                                            {pageContent.tableHeaders.map((header) => (
                                                <th key={header} className={classnames(styles.tableCell, header === "Leads" && styles.leftCell)}>{header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className={styles.tableBody}>
                                        {pricingTiers.map((tier) => (
                                            <tr key={tier.leads} className={classnames(styles.tableRow, tier.isPopular && styles.popularRow)}>
                                                <td className={classnames(styles.tableCell, styles.leftCell)}>
                                                    {tier.leads}
                                                    {tier.isPopular && (
                                                        <span className={styles.popularBadge}>Popular</span>
                                                    )}
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

                                    <Button variant={BUTTON_VARIANT_ENUM.PRIMARY} className={styles.starterCardButton}>
                                        <BsSliders />
                                        {pageContent.starterButtonLabel}
                                    </Button>

                                    <div className={styles.starterCardGuarantee}>
                                        <BsPatchCheck />
                                        {pageContent.guaranteeLabel}
                                    </div>
                                </div>

                                <div className={styles.badges}>
                                    {trustBadges.map((badge) => {
                                        const Icon = iconMap[badge.icon];

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
