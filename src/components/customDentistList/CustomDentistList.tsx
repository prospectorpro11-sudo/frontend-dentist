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

type Step = {
    id: number;
    title: string;
    desc: string;
    color: string;
};

type Feature = {
    title: string;
    desc: string;
    color: string;
    icon: IconType;
};

type SmartFilterItem = {
    title: string;
    desc: string;
    color: string;
    bg: string;
    icon: IconType;
};

const CONTENT_DATA = {
    header: {
        title: "Build Custom Dentist Lists",
        highlight: "In Minutes",
        subtitle: "Quickly build a tailored list of dental specialists using our advanced filters — perfect for outreach, market research, or product promotion.",
    },
    howItWorks: {
        title: "How It Works",
        steps: [
            {
                id: 1,
                title: "Select Filters",
                desc: "Choose from dental specialty, state, city, ZIP code, credentials, and more.",
                color: "var(--blue-500)",
            },
            {
                id: 2,
                title: "Apply Segmentation",
                desc: "Refine your search with precision targeting — cosmetic, pediatric, orthodontics, etc.",
                color: "var(--teal-500)",
            },
            {
                id: 3,
                title: "Download Instantly",
                desc: "Get your customized CSV with emails, phones, faxes & NPI numbers.",
                color: "var(--blue-600)",
            },
        ] as Step[],
    },
    features: [
        {
            title: "Instant Results",
            desc: "Build and download your custom list in seconds with real-time filtering.",
            color: "var(--blue-500)",
            icon: BsLightning,
        },
        {
            title: "Verified Data",
            desc: "95%+ deliverability rate with multi-source verification and regular updates.",
            color: "var(--emerald-500)",
            icon: BsCheckCircle,
        },
        {
            title: "GDPR Compliant",
            desc: "Fully compliant with GDPR, HIPAA, and CAN-SPAM regulations.",
            color: "var(--indigo-500)",
            icon: BsShieldCheck,
        },
    ] as Feature[],
    smartFilters: {
        title: "Smart Filters",
        items: [
            {
                title: "Location",
                desc: "State, city, ZIP code, radius targeting",
                color: "var(--blue-500)",
                bg: "var(--blue-100)",
                icon: BsGeoAlt,
            },
            {
                title: "Specialty",
                desc: "Cosmetic, pediatric, orthodontics & more",
                color: "var(--teal-500)",
                bg: "var(--teal-100)",
                icon: BsHeartPulse,
            },
            {
                title: "Credentials",
                desc: "License, NPI number, DDS/DMD degree",
                color: "var(--indigo-500)",
                bg: "var(--indigo-100)",
                icon: BsPersonVcard,
            },
            {
                title: "Practice Size",
                desc: "Solo, group, hospital, clinic size",
                color: "var(--amber-500)",
                bg: "var(--amber-100)",
                icon: BsBuilding,
            },
        ],
    },
};


const CustomDentistList = () => {
    const { header, howItWorks, features, smartFilters } = CONTENT_DATA;

    return (
        <section className={styles.dentistLists}>
            <Container>
                {/* Header */}
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        {header.title} <span className="shifting-accent">{header.highlight}</span>
                    </h1>
                    <p className={styles.subtitle}>{header.subtitle}</p>
                </div>
                <Row>
                    <Col xs={12} lg={8}>
                        {/* Left Column */}
                        <div className={styles.leftColumn}>

                            {/* How It Works */}
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

                            {/* Bottom Features */}
                            <div className={styles.featuresContainer}>
                                {features.map((feature) => {
                                    const Icon = feature.icon;

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
                                        const Icon = item.icon;
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