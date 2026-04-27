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
            <section className={styles.wrapper}>
                <Container>
                    <Row>
                        <Col xs={12} lg={5}>
                            <div className={styles.leftPanel}>
                                <div className={styles.buildListCard}>
                                    <h3 className={styles.buildListTitle}>{buildListTitle}</h3>

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
                                                                {tag.label}{' '}
                                                                {tag.removable && (
                                                                    <span className={styles.tagClose}>✕</span>
                                                                )}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <div className={styles.dentistList}>
                                        {dentistData.map(function (dentist) {
                                            return (
                                                <div className={styles.dentistCard} key={dentist.id}>
                                                    <div className={classnames(styles.dentistAvatar, styles[dentist.avatarVariant])}>
                                                        {dentist.initials}
                                                    </div>
                                                    <div className={styles.dentistInfo}>
                                                        <div className={styles.dentistName}>{dentist.name}</div>
                                                        <div className={styles.dentistSpecialty}>
                                                            {dentist.specialty}
                                                        </div>
                                                    </div>
                                                    {dentist.verified && (
                                                        <span className={styles.verifiedBadge}>Verified</span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className={styles.loadingSection}>
                                        <div className={styles.loadingSpinner} />
                                        <span className={styles.loadingText}>
                                            {loadingContent.text}{' '}
                                            <span className={styles.loadingTextBold}>{loadingContent.count}</span>{' '}
                                            {loadingContent.suffix}
                                        </span>
                                    </div>
                                    <div className={styles.loadingBar}>
                                        <div className={styles.loadingBarFill} />
                                    </div>
                                </div>

                                <div className={styles.personalizePanel}>
                                    <h4 className={styles.personalizeTitle}>{personalizeTitle}</h4>

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
                                                                    <span className={styles.pTagClose}>✕</span>
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
                        <Col xs={12} lg={7}>
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
