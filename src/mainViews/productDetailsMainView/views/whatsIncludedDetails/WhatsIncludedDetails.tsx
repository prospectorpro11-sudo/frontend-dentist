import { Col, Container, Row } from "react-bootstrap";
import styles from "./whatsIncludedDetails.module.scss";
import classnames from "classnames";

type Tag = {
    id: number;
    label: string;
    removable: boolean;
    className: string;
};

type FilterSection = {
    label: string;
    tags: Tag[];
};

type DentistDataItem = {
    id: number;
    initials: string;
    name: string;
    specialty: string;
    verified: boolean;
    avatarClass: string;
};

type LoadingContent = {
    text: string;
    count: string;
    suffix: string;
};

type PersonalizeSection = {
    label: string;
    tags: Tag[];
};

type DataCard = {
    id: number;
    title: string;
    titleSuffix: string;
    description: string;
    isLast: boolean;
};

type HeaderContent = {
    title: string;
    description: string;
};

type WhatsIncludedDetailsData = {
    headerContent: HeaderContent;
    buildListTitle: string;
    filterSections: FilterSection[];
    dentistData: DentistDataItem[];
    loadingContent: LoadingContent;
    personalizeTitle: string;
    personalizeSections: PersonalizeSection[];
    verifiedTitle: string;
    dataCards: DataCard[];
    footerStats: string[];
};

const styleClassMap: Record<string, string> = {
    filterTagState: styles.filterTagState,
    filterTagSpecialty: styles.filterTagSpecialty,
    filterTagSpecialtyPurple: styles.filterTagSpecialtyPurple,
    filterTagPractice: styles.filterTagPractice,
    avatarBlue: styles.avatarBlue,
    avatarGreen: styles.avatarGreen,
    avatarPurple: styles.avatarPurple,
    pTagBlue: styles.pTagBlue,
    pTagGreen: styles.pTagGreen,
    pTagPurple: styles.pTagPurple,
    genderTagMale: styles.genderTagMale,
    genderTagFemale: styles.genderTagFemale,
    associationTag: styles.associationTag,
    associationTagPurple: styles.associationTagPurple,
};

const WhatsIncludedDetails = (props: WhatsIncludedDetailsData) => {
    const {
        headerContent,
        buildListTitle,
        filterSections,
        dentistData,
        loadingContent,
        personalizeTitle,
        personalizeSections,
        verifiedTitle,
        dataCards,
        footerStats,
    } = props;

    const resolveClassName = (className: string): string => {
        return styleClassMap[className] || className;
    };

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
                                                                className={classnames(styles.filterTag, resolveClassName(tag.className))}
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
                                                <div className={styles.dentistItem} key={dentist.id}>
                                                    <div className={classnames(styles.dentistAvatar, resolveClassName(dentist.avatarClass))}>
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
                                                                className={classnames(styles.personalizeTag, resolveClassName(tag.className))}
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
                        <Col xs={12} lg={7}>
                            <div className={styles.rightPanel}>

                                {/* Section Title Description */}
                                <div className={styles.headerSection}>
                                    <h1 className={styles.headerTitle}>
                                        {headerContent.title}
                                    </h1>
                                    <p className={styles.headerDescription}>
                                        {headerContent.description}
                                    </p>
                                </div>
                                {/* Section Content */}
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
                                                <div className={styles.dataIcon}>
                                                </div>
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
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default WhatsIncludedDetails;
