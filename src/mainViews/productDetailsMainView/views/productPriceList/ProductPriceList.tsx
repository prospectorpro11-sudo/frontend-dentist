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
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";
import { IProductPriceListSeed } from "@/shared/interface";
import type { IconType } from "react-icons";

const TRUST_ICON_MAP: Record<string, IconType> = {
    'shield-check': BsShieldCheck,
    lock: BsLock,
    'patch-check': BsPatchCheck,
};

const ProductPriceList = (props: IProductPriceListSeed) => {
    const { content, pricingTiers, includedDataFields, trustBadges } = props;

    return (
        <section className={styles.pricingTiers}>
            <Container>
                <div className={styles.header}>
                    <h1 className={styles.headerTitle}>{content.title}</h1>
                    <p className={styles.headerDescription}>{content.description}</p>
                </div>
                <Col xs={12} lg={9} className="mx-auto" >
                    <Row>
                        <Col xs={12} lg={7}>
                            <div className={styles.pricingCard}>
                                <div className={styles.pricingCardHeader}>
                                    <div>
                                        <div className={styles.pricingCardHeaderTitle}>
                                            <BsCashCoin className={styles.pricingCardHeaderTitleIcon} />
                                            {content.tableTitle}
                                        </div>
                                        <div className={styles.pricingCardHeaderSubtitle}>{content.tableSubtitle}</div>
                                    </div>

                                    <div className={styles.tabGroup}>
                                        {content.tabs.map((tab, index) => (
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
                                            {content.tableHeaders.map((header, index) => (
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
                                            <td className={classnames(styles.tableCell, styles.centerCell, styles.bulkCell)}>{content.footerBulkPricing}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </Col>
                        <Col xs={12} lg={5} className="mt-5 mt-lg-0">
                            <div className={styles.rightPanel}>
                                <div className={styles.dataFieldsCard}>
                                    <div className={styles.dataFieldsCardTitle}>
                                        <div className={styles.dataFieldsCardIcon}>
                                            <BsFileEarmarkText />
                                        </div>
                                        {content.includedTitle}
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
                                        {content.starterOfferTitle}
                                    </div>
                                    <div className={styles.starterCardSubtitle}>{content.starterSubtitle}</div>
                                    <div className={styles.starterCardLeads}>{content.starterLeads}</div>
                                    <div className={styles.starterCardLeadsLabel}>{content.starterLeadsLabel}</div>
                                    <div className={styles.starterCardPrice}>{content.starterPrice}</div>
                                    <p className={styles.starterCardDescription}>{content.starterDescription}</p>

                                    <Button variant={BUTTON_VARIANT_ENUM.PRIMARY} className={styles.starterCardButton}>
                                        <BsSliders />
                                        {content.starterButtonLabel}
                                    </Button>

                                    <div className={styles.starterCardGuarantee}>
                                        <BsPatchCheck />
                                        {content.guaranteeLabel}
                                    </div>
                                </div>

                                <div className={styles.badges}>
                                    {trustBadges.map((badge) => {
                                        const Icon = TRUST_ICON_MAP[badge.icon];
                                        if (!Icon) {
                                            return null;
                                        }

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
