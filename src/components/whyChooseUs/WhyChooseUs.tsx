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
import { IWhyChooseUsSeed } from "@/shared/interface";

const ICON_MAP: Record<string, IconType> = {
    'envelope-x': BsEnvelopeXFill,
    'person-x': BsPersonXFill,
    'graph-down': BsGraphDownArrow,
    cash: BsCashStack,
    'send-x': BsSendXFill,
    warning: BsExclamationOctagonFill,
    'x-circle': BsXCircleFill,
    'shield-x': BsShieldX,
    envelope: BsEnvelopeFill,
    telephone: BsTelephoneFill,
    vcard: BsPersonVcardFill,
    calendar: BsCalendarEventFill,
    send: BsSendFill,
    download: BsDownload,
};

const WhyChooseUs = (props: IWhyChooseUsSeed) => {
    const { content, painPoints, floatingBadges, mockupFields, mockupActions } = props;

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
                                    const Icon = ICON_MAP[item.icon];
                                    if (!Icon) {
                                        return null;
                                    }

                                    return (
                                        <article
                                            key={item.title}
                                            className={classnames(
                                                styles.painItem,
                                                styles.fadeIn,
                                                styles.visible,
                                                item.delayClass && styles[item.delayClass]
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
                                    const Icon = ICON_MAP[badge.icon];
                                    if (!Icon) {
                                        return null;
                                    }

                                    return (
                                        <div
                                            key={badge.title}
                                            className={classnames(styles.floatingBadge, badge.positionClass && styles[badge.positionClass])}
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
                                                const Icon = ICON_MAP[field.icon];
                                                if (!Icon) {
                                                    return null;
                                                }

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
                                                const Icon = ICON_MAP[action.icon];
                                                if (!Icon) {
                                                    return null;
                                                }

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
