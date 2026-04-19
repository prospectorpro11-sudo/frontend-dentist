import styles from "./dentalSpecialtyList.module.scss";
import classnames from "classnames";
import { Container } from "react-bootstrap";
import { IconType } from "react-icons";
import {
    BsPersonBadge,
    BsScissors,
    BsCheckCircle,
    BsEmojiSmile,
    BsArrowRight,
    BsPeopleFill,
    BsEnvelopeCheckFill,
} from "react-icons/bs";
import Button from "../button/Button";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";

type SpecialtyCard = {
    id: string;
    title: string;
    description: string;
    icon: string;
    iconColor: "blue" | "teal" | "indigo" | "amber";
    contactCount: string;
    verificationRate: string;
};

type PageContent = {
    sectionTitle: string;
    sectionSubtitle: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
};

type DentalSpecialtyListData = {
    pageContent: PageContent;
    specialtyCards: SpecialtyCard[];
};

const iconMap: Record<string, IconType> = {
    BsPersonBadge,
    BsScissors,
    BsCheckCircle,
    BsEmojiSmile,
};

const DentalSpecialtyList = (props: DentalSpecialtyListData) => {
    const { pageContent, specialtyCards } = props;

    return (
        <section className={styles.mainContent}>
            {/* Section Header */}
            <Container>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle} dangerouslySetInnerHTML={{ __html: pageContent.sectionTitle }} />
                    <p className={styles.sectionSubtitle}>{pageContent.sectionSubtitle}</p>
                </div>
                {/* Specialty Cards Grid */}
                <div className={styles.specialtyGrid}>
                    {specialtyCards.map((card) => {
                        const Icon = iconMap[card.icon];
                        return (
                            <div key={card.id} className={styles.specialtyCard}>
                                <div className={styles.specialtyHeader}>
                                    <div
                                        className={classnames(
                                            styles.specialtyIconWrap,
                                            styles[card.iconColor]
                                        )}
                                    >
                                        <Icon />
                                    </div>
                                    <div className={styles.specialtyInfo}>
                                        <h3>{card.title}</h3>
                                        <p>{card.description}</p>
                                    </div>
                                </div>
                                <div className={styles.specialtyMeta}>
                                    <div className={styles.metaItem}>
                                        <BsPeopleFill />
                                        {card.contactCount}
                                    </div>
                                    <div className={styles.metaItem}>
                                        <BsEnvelopeCheckFill />
                                        {card.verificationRate}
                                    </div>
                                    <div className={styles.specialtyArrow}>
                                        <BsArrowRight />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* CTA Section */}
                <div className={styles.ctaSection}>
                    <div className={styles.ctaContent}>
                        <h3 className={styles.ctaTitle}>{pageContent.ctaTitle}</h3>
                        <p className={styles.ctaDescription}>{pageContent.ctaDescription}</p>
                    </div>
                    <a href="#">
                        <Button variant={BUTTON_VARIANT_ENUM.PRIMARY_LIGHT}>
                            {pageContent.ctaButtonText}
                            <BsArrowRight />
                        </Button>
                    </a>
                </div>
            </Container>
        </section>
    );
};

export default DentalSpecialtyList;
