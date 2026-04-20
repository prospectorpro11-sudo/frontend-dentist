import styles from "./customDentistList.module.scss";
import {
    BsBuilding,
    BsCheckCircle,
    BsFilter,
    BsGear,
    BsLightning,
    BsGeoAlt,
    BsHeartPulse,
    BsPersonVcard,
    BsShieldCheck,
} from "react-icons/bs";
import type { IconType } from "react-icons";
import { Col, Container, Row } from "react-bootstrap";
import { ICustomDentistListSeed } from "@/shared/interface";

const ICON_MAP: Record<string, IconType> = {
    lightning: BsLightning,
    'check-circle': BsCheckCircle,
    'shield-check': BsShieldCheck,
    'geo-alt': BsGeoAlt,
    'heart-pulse': BsHeartPulse,
    'person-vcard': BsPersonVcard,
    building: BsBuilding,
};

const CustomDentistList = (props: ICustomDentistListSeed) => {
    const { header, howItWorks, features, smartFilters } = props;

    return (
        <section className={styles.dentistLists}>
            <Container>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        {header.title} <span className="shifting-accent">{header.highlight}</span>
                    </h1>
                    <p className={styles.subtitle}>{header.subtitle}</p>
                </div>
                <Row>
                    <Col xs={12} lg={8}>
                        <div className={styles.leftColumn}>
                            <div className={styles.howItWorksCard}>
                                <h2 className={styles.sectionTitle}>
                                    <BsGear />
                                    {howItWorks.title}
                                </h2>
                                <div className={styles.stepsContainer}>
                                    {howItWorks.steps.map((step) => (
                                        <div key={step.id} className={styles.step}>
                                            <div
                                                className={styles.stepIconWrapper}
                                                style={{ backgroundColor: step.color }}
                                            >
                                                {step.id}
                                            </div>
                                            <h3 className={styles.stepTitle}>{step.title}</h3>
                                            <p className={styles.stepDesc}>{step.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.featuresContainer}>
                                {features.map((feature) => {
                                    const Icon = ICON_MAP[feature.icon];
                                    if (!Icon) {
                                        return null;
                                    }

                                    return (
                                        <div key={feature.title} className={styles.featureCard}>
                                            <div
                                                className={styles.featureIcon}
                                                style={{ backgroundColor: feature.color }}
                                            >
                                                <Icon />
                                            </div>
                                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                                            <p className={styles.featureDesc}>{feature.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} lg={4}>
                        <div className={styles.rightColumn}>
                            <div className={styles.smartFiltersCard}>
                                <div className={styles.filterHeader}>
                                    <div className={styles.filterIconMain}>
                                        <BsFilter />
                                    </div>
                                    <h2>{smartFilters.title}</h2>
                                </div>

                                <div className={styles.filterList}>
                                    {smartFilters.items.map((item, idx) => {
                                        const Icon = ICON_MAP[item.icon];
                                        if (!Icon) {
                                            return null;
                                        }

                                        return (
                                            <div key={idx} className={styles.filterItem}>
                                                <div
                                                    className={styles.filterItemIcon}
                                                    style={{
                                                        backgroundColor: item.bg,
                                                        color: item.color,
                                                    }}
                                                >
                                                    <Icon />
                                                </div>
                                                <div className={styles.filterItemContent}>
                                                    <h4>{item.title}</h4>
                                                    <p>{item.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CustomDentistList;
