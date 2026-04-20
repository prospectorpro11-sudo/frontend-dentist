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
    icon: IconType;
    delayClass: string;
};

type FloatingBadge = {
    title: string;
    subtitle: string;
    icon: IconType;
    positionClass: string;
};

type MockupField = {
    label: string;
    value: string;
    icon: IconType;
    masked?: boolean;
    danger?: boolean;
};

type MockupAction = {
    label: string;
    icon: IconType;
    secondary?: boolean;
};

const content = {
    badge: "The Problem",
    title: "Why Other List Providers",
    highlight: "Fall Short",
    subtitle:
        "Most email list providers leave you stranded with outdated data, no support, and zero guarantees.",
    profile: {
        initials: "DR",
        name: "Dr. Sarah Mitchell",
        specialty: "Cosmetic Dentistry • San Francisco, CA",
        status: "Invalid",
    },
};

const painPoints: PainPoint[] = [
    {
        title: "No Delivery Guarantee",
        desc: "You're stuck if your messages bounce — no backup, no replacements, no recourse.",
        icon: BsEnvelopeXFill,
        delayClass: "fadeInDelay1",
    },
    {
        title: "No Sending Support",
        desc: "You have to manage all outreach on your own with zero guidance or assistance.",
        icon: BsPersonXFill,
        delayClass: "fadeInDelay2",
    },
    {
        title: "High Bounce Rates",
        desc: "Risk of blacklisting and poor sender reputation that damages your campaigns long-term.",
        icon: BsGraphDownArrow,
        delayClass: "fadeInDelay3",
    },
    {
        title: "No Refunds",
        desc: "Bad data? You're out of luck — most providers offer zero refund or replacement options.",
        icon: BsCashStack,
        delayClass: "fadeInDelay4",
    },
];

const floatingBadges: FloatingBadge[] = [
    {
        title: "Not Sending",
        subtitle: "Delivery failed",
        icon: BsSendXFill,
        positionClass: "badge1",
    },
    {
        title: "High Bounce Rate",
        subtitle: "42% bounced",
        icon: BsExclamationOctagonFill,
        positionClass: "badge2",
    },
    {
        title: "No Refund",
        subtitle: "Request denied",
        icon: BsXCircleFill,
        positionClass: "badge3",
    },
    {
        title: "Not Verified",
        subtitle: "Data outdated",
        icon: BsShieldX,
        positionClass: "badge4",
    },
];

const mockupFields: MockupField[] = [
    {
        label: "Email Address",
        value: "sm***@oldclinic.com",
        icon: BsEnvelopeFill,
        masked: true,
    },
    {
        label: "Phone Number",
        value: "(415) ***-**89",
        icon: BsTelephoneFill,
        masked: true,
    },
    {
        label: "NPI Number",
        value: "1234567890",
        icon: BsPersonVcardFill,
    },
    {
        label: "Last Verified",
        value: "18 months ago",
        icon: BsCalendarEventFill,
        danger: true,
    },
];

const mockupActions: MockupAction[] = [
    { label: "Send Email", icon: BsSendFill },
    { label: "Export", icon: BsDownload, secondary: true },
];

const WhyChooseUs = () => {
    return (
        <section className={styles.whyChooseUs}>
            <div className={styles.bgDecoration}>
                <div className={classnames(styles.bgBlob, styles.bgBlob1)}></div>
                <div className={classnames(styles.bgBlob, styles.bgBlob2)}></div>
                <div className={styles.bgGrid}></div>
            </div>

            <Container>
                <div className={styles.contentWrapper}>
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
                        <Col lg={6}>
                            <div className={styles.painContent}>
                                {painPoints.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <article
                                            key={item.title}
                                            className={classnames(
                                                styles.painItem,
                                                styles.fadeIn,
                                                styles.visible,
                                                styles[item.delayClass]
                                            )}
                                        >
                                            <div className={styles.painIconWrap}>
                                                <Icon />
                                            </div>
                                            <div className={styles.painText}>
                                                <h3>{item.title}</h3>
                                                <p>{item.desc}</p>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </Col>

                        <Col lg={6}>
                            <div className={classnames(styles.mockupScene, styles.fadeIn, styles.visible)}>
                                <div className={styles.mockupGlow}></div>

                                {floatingBadges.map((badge) => {
                                    const Icon = badge.icon;

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
                                                const Icon = field.icon;

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
                                                const Icon = action.icon;

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
                </div>
            </Container>
        </section>
    );
};

export default WhyChooseUs;