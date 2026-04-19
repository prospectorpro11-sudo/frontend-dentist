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
    BsGridFill,
} from "react-icons/bs";
import Button from "../button/Button";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";

interface SpecialtyCard {
    id: string;
    title: string;
    description: string;
    icon: IconType;
    iconColor: "blue" | "teal" | "indigo" | "amber";
    contactCount: string;
    verificationRate: string;
}

interface PageContent {
    sectionTitle: string;
    sectionSubtitle: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
}

const pageContent: PageContent = {
    sectionTitle: "Explore <span class='shifting-accent'>Dental Specialty</span> Lists",
    sectionSubtitle:
        "Select a specialty to view available contacts and build your targeted marketing campaign.",
    ctaTitle: "Need a Custom Dental Contact List?",
    ctaDescription:
        "Filter by location, specialty, experience level, and more. Build your perfect targeted list in minutes.",
    ctaButtonText: "Explore All Dental Lists",
};

const specialtyCards: SpecialtyCard[] = [
    {
        id: "dental-surgeon",
        title: "Dental Surgeon",
        description: "Surgical procedures and oral surgery specialists",
        icon: BsPersonBadge,
        iconColor: "blue",
        contactCount: "45,320 contacts",
        verificationRate: "98% verified",
    },
    {
        id: "oral-surgeon",
        title: "Oral Surgeon",
        description: "Advanced oral and maxillofacial surgery experts",
        icon: BsScissors,
        iconColor: "teal",
        contactCount: "38,750 contacts",
        verificationRate: "97% verified",
    },
    {
        id: "general-dentist",
        title: "General Dentist",
        description: "Primary dental care and routine checkup providers",
        icon: BsCheckCircle,
        iconColor: "indigo",
        contactCount: "52,180 contacts",
        verificationRate: "99% verified",
    },
    {
        id: "pediatric-dentist",
        title: "Pediatric Dentist",
        description: "Children and adolescent dental care specialists",
        icon: BsEmojiSmile,
        iconColor: "amber",
        contactCount: "28,940 contacts",
        verificationRate: "96% verified",
    },
];

const DentalSpecialtyList = () => {
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
                        const Icon = card.icon;
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