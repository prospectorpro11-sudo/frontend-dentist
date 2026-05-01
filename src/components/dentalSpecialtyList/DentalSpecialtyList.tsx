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
import { IDentalSpecialtySeed } from "@/shared/interface";

const ICON_MAP: Record<string, IconType> = {
    'person-badge': BsPersonBadge,
    scissors: BsScissors,
    'check-circle': BsCheckCircle,
    'emoji-smile': BsEmojiSmile,
};

const DentalSpecialtyList = (props: IDentalSpecialtySeed) => {
    const { content, specialtyCards } = props;

    return (
        <section className={styles.mainContent}>
            <Container>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        {content.sectionTitle} <span className="shifting-accent">{content.sectionTitleAccent}</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>{content.sectionSubtitle}</p>
                </div>
                <div className={styles.specialtyGrid}>
                    {specialtyCards.map((card) => {
                        const Icon = ICON_MAP[card.icon];
                        if (!Icon) {
                            return null;
                        }

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
                <div className={styles.ctaSection}>
                    <div className={styles.ctaContent}>
                        <h3 className={styles.ctaTitle}>{content.ctaTitle}</h3>
                        <p className={styles.ctaDescription}>{content.ctaDescription}</p>
                    </div>
                    <a href="#">
                        <Button variant={BUTTON_VARIANT_ENUM.PRIMARY_LIGHT}>
                            {content.ctaButtonText}
                            <BsArrowRight />
                        </Button>
                    </a>
                </div>
            </Container>
        </section>
    );
};

export default DentalSpecialtyList;
