import styles from "./styles.module.scss";
import classnames from "classnames";
import { Col, Container, Row } from "react-bootstrap";
import {
    BsCashStack,
    BsCalendarEventFill,
    BsDownload,
    BsEnvelopeFill,
    BsEnvelopeXFill,
    BsExclamationOctagonFill,
    BsExclamationTriangleFill,
    BsGraphDownArrow,
    BsPersonVcardFill,
    BsPersonXFill,
    BsSendFill,
    BsSendXFill,
    BsShieldX,
    BsTelephoneFill,
    BsXCircleFill,
} from "react-icons/bs";
import type { IconType } from "react-icons";

type PainPoint = {
    title: string;
    desc: string;
    icon: string;
    delayClass: string;
};

type FloatingBadge = {
    title: string;
    subtitle: string;
    icon: string;
    positionClass: string;
};

type MockupField = {
    label: string;
    value: string;
    icon: string;
    masked?: boolean;
    danger?: boolean;
};

type MockupAction = {
    label: string;
    icon: string;
    secondary?: boolean;
};

type ContentProfile = {
    initials: string;
    name: string;
    specialty: string;
    status: string;
};

type Content = {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    profile: ContentProfile;
};

type WhyChooseUsData = {
    content: Content;
    painPoints: PainPoint[];
    floatingBadges: FloatingBadge[];
    mockupFields: MockupField[];
    mockupActions: MockupAction[];
};

const iconMap: Record<string, IconType> = {
    BsEnvelopeXFill,
    BsPersonXFill,
    BsGraphDownArrow,
    BsCashStack,
    BsSendXFill,
    BsExclamationOctagonFill,
    BsXCircleFill,
    BsShieldX,
    BsEnvelopeFill,
    BsTelephoneFill,
    BsPersonVcardFill,
    BsCalendarEventFill,
    BsSendFill,
    BsDownload,
    BsExclamationTriangleFill,
};

const WhyChooseUs = (props: WhyChooseUsData) => {
    const { content, painPoints, floatingBadges, mockupFields, mockupActions } = props;

    return (
        <section className={styles.whyChooseUs}>
            <div className={styles.bgDecoration}>
                <div className={classnames(styles.bgBlob, styles.bgBlob1)}></div>
                <div className={classnames(styles.bgBlob, styles.bgBlob2)}></div>
                <div className={styles.bgGrid}></div>
            </div>

            <Container className={styles.container}>
                <header className={classnames(styles.sectionHeader, styles.fadeIn, styles.visible)}>
                    <div className={styles.sectionBadge}>
                        <BsExclamationTriangleFill />
                        {content.badge}
                    </div>
                    <h2>
                        {content.title} <span className="shifting-accent-danger">{content.highlight}</span>
                    </h2>
                    <p>{content.subtitle}</p>
                </header>

                <Row className={styles.sectionLayout}>
                    <Col lg={7}>
                        <div className={styles.painContent}>
                            {painPoints.map((item) => {
                                const Icon = iconMap[item.icon];

                                return (
                                    <div
                                        key={item.title}
                                        className={classnames(
                                            styles.painCard,
                                            styles[item.delayClass],
                                            styles.fadeIn,
                                            styles.visible
                                        )}
                                    >
                                        <div className={styles.painCardIcon}>
                                            <Icon />
                                        </div>
                                        <div className={styles.painCardContent}>
                                            <h4>{item.title}</h4>
                                            <p>{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Col>
                    <Col lg={5}>
                        <div className={styles.mockupScene}>
                            <div className={styles.mockupGlow}></div>

                            {floatingBadges.map((badge) => {
                                const Icon = iconMap[badge.icon];

                                return (
                                    <div
                                        key={badge.title}
                                        className={classnames(styles.floatingBadge, styles[badge.positionClass])}
                                    >
                                        <div className={styles.floatingBadgeIcon}>
                                            <Icon />
                                        </div>
                                        <div className={styles.floatingBadgeText}>
                                            {badge.title}
                                            <span>{badge.subtitle}</span>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className={styles.mockupCard}>
                                <div className={styles.mockupCardInner}>
                                    <div className={styles.mockupUserHeader}>
                                        <div className={styles.mockupAvatar}>{content.profile.initials}</div>
                                        <div className={styles.mockupUserInfo}>
                                            <h4>{content.profile.name}</h4>
                                            <span>{content.profile.specialty}</span>
                                        </div>
                                        <div className={styles.mockupStatus}>
                                            <div className={styles.pulseDot}></div>
                                            {content.profile.status}
                                        </div>
                                    </div>

                                    <div className={styles.mockupFields}>
                                        {mockupFields.map((field) => {
                                            const Icon = iconMap[field.icon];

                                            return (
                                                <div key={field.label} className={styles.mockupField}>
                                                    <div className={styles.mockupFieldLabel}>
                                                        <Icon />
                                                        {field.label}
                                                    </div>
                                                    <div
                                                        className={classnames(
                                                            styles.mockupFieldValue,
                                                            field.masked && styles.masked,
                                                            field.danger && styles.danger
                                                        )}
                                                    >
                                                        {field.value}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className={styles.mockupActions}>
                                        {mockupActions.map((action) => {
                                            const Icon = iconMap[action.icon];

                                            return (
                                                <button
                                                    key={action.label}
                                                    type="button"
                                                    className={classnames(
                                                        styles.mockupBtn,
                                                        action.secondary ? styles.mockupBtnSecondary : styles.mockupBtnPrimary
                                                    )}
                                                >
                                                    <Icon />
                                                    {action.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default WhyChooseUs;
