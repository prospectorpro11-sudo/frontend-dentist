import { Col, Container, Row } from "react-bootstrap";
import styles from "./whatsIncludedDetails.module.scss";
import classnames from "classnames";
import { IWhatsIncludedDetailsSeed } from "@/shared/interface";

const WhatsIncludedDetails = (props: IWhatsIncludedDetailsSeed) => {
    const {
        buildListTitle,
        filterSections,
        dentistData,
        loadingContent,
        personalizeTitle,
        personalizeSections,
        header,
        verifiedTitle,
        dataCards,
        footerStats,
        isProductDetails,
        idealUseCases,
    } = props;

    return (
        <>
            <section className={styles.dataSection}>
                <Container>
                    <Row>
                        <Col xs={12} lg={5}>
                            <div className={styles.leftPanel}>
                                {/* Build List Card */}
                                <div className={styles.buildListCard}>
                                    <div className={styles.buildListHeader}>
                                        <div className={styles.buildListIcon}></div>
                                        <span className={styles.buildListText}>{buildListTitle}</span>
                                    </div>

                                    {filterSections.map(function (section) {
                                        return (
                                            <div className={styles.filterSection} key={section.label}>
                                                <div className={styles.filterLabel}>{section.label}</div>
                                                <div className={styles.filterTags}>
                                                    {section.tags.map(function (tag) {
                                                        return (
                                                            <span
                                                                className={classnames(styles.filterTag, styles[tag.variant])}
                                                                key={tag.id}
                                                            >
                                                                {tag.label}
                                                                {tag.removable && (
                                                                    <span className={styles.tagClose}>?</span>
                                                                )}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Dentist Data Card */}
                                <div className={styles.dentistCard}>
                                    <div className={styles.dentistList}>
                                        {dentistData.map(function (dentist) {
                                            return (
                                                <div className={styles.dentistCard} key={dentist.id}>
                                                    <div className={classnames(styles.dentistAvatar, styles[dentist.avatarVariant])}>
                                                        {dentist.initials}
                                                    </div>
                                                    <div className={styles.dentistInfo}>
                                                        <div className={styles.dentistNameRow}>
                                                            <span className={styles.dentistName}>{dentist.name}</span>
                                                            {dentist.verified && (
                                                                <span className={styles.verifiedBadge}>Verified</span>
                                                            )}
                                                        </div>
                                                        <div className={styles.dentistSpecialty}>{dentist.specialty}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className={styles.loadingBar}>
                                        <span className={styles.loadingText}>{loadingContent.text}</span>
                                        <span className={styles.loadingCount}>{loadingContent.count}</span>
                                        <span className={styles.loadingSuffix}>{loadingContent.suffix}</span>
                                    </div>
                                </div>

                                {/* Personalize Card */}
                                <div className={styles.personalizeCard}>
                                    <div className={styles.personalizeHeader}>
                                        <div className={styles.personalizeIcon}></div>
                                        <span className={styles.personalizeText}>{personalizeTitle}</span>
                                    </div>
                                    {personalizeSections.map(function (section) {
                                        return (
                                            <div className={styles.personalizeSection} key={section.label}>
                                                <div className={styles.personalizeLabel}>{section.label}</div>
                                                <div className={styles.personalizeTags}>
                                                    {section.tags.map(function (tag) {
                                                        return (
                                                            <span
                                                                className={classnames(styles.personalizeTag, styles[tag.variant])}
                                                                key={tag.id}
                                                            >
                                                                {tag.label}{' '}
                                                                {tag.removable && (
                                                                    <span className={styles.pTagClose}>?</span>
                                                                )}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} lg={7} className="mt-4 mt-lg-0">
                            <div className={styles.rightPanel}>
                                {isProductDetails && idealUseCases ? (
                                    <>
                                        <div className={styles.headerSection}>
                                            <h1 className={styles.headerTitle}>{idealUseCases.title}</h1>
                                            <p className={styles.headerDescription}>{idealUseCases.description}</p>
                                        </div>
                                        <div className={styles.dataCardsGrid}>
                                            {idealUseCases.features.map(function (feature, index) {
                                                return (
                                                    <div className={styles.dataCardGridItem} key={index}>
                                                        <div className={styles.dataIcon}>
                                                            <i className="bi bi-check" style={{ color: '#fff', fontSize: '1.2rem' }}></i>
                                                        </div>
                                                        <div className={styles.dataContent}>
                                                            <div className={styles.dataCardTitle}>
                                                                {feature}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.headerSection}>
                                            <h1 className={styles.headerTitle}>{header.title}</h1>
                                            <p className={styles.headerDescription}>{header.description}</p>
                                        </div>
                                        <h3 className={styles.verifiedTitle}>{verifiedTitle}</h3>

                                        <div className={styles.dataCards}>
                                            {dataCards.map(function (card) {
                                                return (
                                                    <div
                                                        className={classnames(
                                                            styles.dataCard,
                                                            card.isLast && styles.dataCardLast
                                                        )}
                                                        key={card.id}
                                                    >
                                                        <div className={styles.dataIcon}></div>
                                                        <div className={styles.dataContent}>
                                                            <div className={styles.dataCardTitle}>
                                                                {card.title}{' '}
                                                                <span className={styles.dataCardTitleSpan}>
                                                                    {card.titleSuffix}
                                                                </span>
                                                            </div>
                                                            <div className={styles.dataCardDesc}>
                                                                {card.description}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className={styles.footerStats}>
                                            {footerStats.map(function (stat, index) {
                                                return (
                                                    <span className={styles.footerStat} key={index}>
                                                        {stat}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default WhatsIncludedDetails;
