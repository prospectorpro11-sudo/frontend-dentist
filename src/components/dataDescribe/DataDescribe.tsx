'use client';
import classNames from 'classnames';
import Image from 'next/image';
import {
    BiCheckDouble,
    BiBadgeCheck,
    BiShield,
    BiFilterAlt,
    BiEnvelope,
    BiShieldQuarter
} from 'react-icons/bi';
import styles from './dataDescribe.module.scss';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { IDataDescribe } from '../../shared/interface';
import Button from '../button/Button';
import { BUTTON_SIZE_ENUM } from '@/shared/enums';

const featureIconMap = {
    shield: BiShield,
    filter: BiFilterAlt,
    envelope: BiEnvelope,
    shieldQuarter: BiShieldQuarter,
} as const;

const PROGRESS_DURATION = 4000; // 4 seconds per slide
const DataDescribe = (props: IDataDescribe) => {
    const { topSection: TOP_SECTION, panelData: PANEL_DATA, featureColumns: FEATURE_COLUMNS } = props;

    const [activeFeature, setActiveFeature] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [visited, setVisited] = useState<Set<number>>(new Set([0]));

    // Auto-advance carousel
    useEffect(() => {
        if (isPaused) return;

        const timer = setTimeout(() => {
            if (progress >= 100) {
                setActiveFeature((current) => {
                    const next = (current + 1) % FEATURE_COLUMNS.length;

                    // If we're looping back to start, reset visited
                    if (next === 0) {
                        setVisited(new Set([0]));
                    } else {
                        setVisited((prev) => {
                            const newVisited = new Set(prev);
                            newVisited.add(next);
                            return newVisited;
                        });
                    }

                    return next;
                });
                setProgress(0);
            } else {
                setProgress((prev) => prev + (100 / (PROGRESS_DURATION / 50)));
            }
        }, 50);

        return () => clearTimeout(timer);
    }, [progress, isPaused]);

    const handleFeatureClick = (index: number) => {
        setActiveFeature(index);
        setProgress(0);
        setVisited((prev) => {
            const newVisited = new Set(prev);
            newVisited.add(index);
            return newVisited;
        });
    };

    const activePanel = PANEL_DATA[activeFeature];

    return (
        <section className={styles.productDescribe}>
            <Container>
                {/* Background blobs */}
                <div className={classNames(styles.pdBlob, styles.pdBlob1)}></div>
                <div className={classNames(styles.pdBlob, styles.pdBlob2)}></div>
                <div className={classNames(styles.pdBlob, styles.pdBlob3)}></div>
                <div className={classNames(styles.decoOrb, styles.decoOrb7)}></div>

                <Row className="align-items-center mb-5">
                    <Col xs={12} lg={7}>
                        <h2 className={styles.pdHeading}>
                            {TOP_SECTION.heading}<br /><span dangerouslySetInnerHTML={{ __html: TOP_SECTION.headingLine2 }} />
                        </h2>
                        <p className={styles.pdSub}>
                            {TOP_SECTION.subtitle}
                        </p>
                        <a href={TOP_SECTION.ctaHref}><Button size={BUTTON_SIZE_ENUM.LARGE}>{TOP_SECTION.ctaText}</Button></a>
                    </Col>
                    <Col xs={12} lg={5}>
                        <div className={styles.pdIllScene}>
                            <div className={styles.pdIllGlow}></div>
                            <Image
                                src="/data-details.png"
                                alt="Data description illustration"
                                width={520}
                                height={480}
                                className={styles.pdIllImage}
                                priority
                                style={{ objectFit: "scale-down" }}
                            />
                        </div>
                    </Col>
                </Row>

                {/* BIG WHITE CARD: verified section + feature columns */}
                <div className={styles.pdBigCard}>

                    {/* INNER LIGHT-BLUE PANEL: dynamic verified info */}
                    <div className={styles.pdInnerPanel}>
                        <div className={styles.pdPanelText}>
                            <h3 className={styles.pdPanelHeading}>{activePanel.heading}</h3>
                            <p className={styles.pdPanelSub}>
                                {activePanel.subtitle}
                            </p>
                            <p className={styles.pdPanelLabel}>{activePanel.label}</p>
                            <ul className={styles.pdPanelChks}>
                                {activePanel.checklist.map((item, index) => (
                                    <li key={index}>
                                        <BiBadgeCheck /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.pdPanelVisual}>
                            {/* Dynamic document card illustration */}
                            <div className={styles.pdDocCardNew}>
                                <div className={styles.pdDocNewLines}>
                                    <div className={styles.pdDnl}></div>
                                    <div className={classNames(styles.pdDnl, styles.w3)}></div>
                                    <div className={classNames(styles.pdDnl, styles.w2)}></div>
                                    <div className={classNames(styles.pdDnl, styles.w4)}></div>
                                    <div className={classNames(styles.pdDnl, styles.w1)}></div>
                                </div>
                                <div className={styles.pdDocNewChks}>
                                    <div className={styles.pdDnc}><BiCheckDouble /></div>
                                    <div className={styles.pdDnc}><BiCheckDouble /></div>
                                    <div className={styles.pdDnc}><BiCheckDouble /></div>
                                </div>
                                {/* Dynamic badge */}
                                <div className={styles.pdDocNewBadge} style={{ backgroundColor: activePanel.panelVisual.accentColor }}>
                                    <span>{activePanel.panelVisual.title}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div className={styles.pdCardDivider}></div>

                    {/* RADIO BUTTONS NAVIGATION */}
                    <div className={styles.pdRadioNav}>
                        {FEATURE_COLUMNS.map((col, index) => {
                            const isActive = activeFeature === index;
                            const isVisited = visited.has(index);

                            return (
                                <button
                                    key={index}
                                    className={classNames(styles.pdRadioBtn, {
                                        [styles.pdRadioActive]: isActive,
                                        [styles.pdRadioVisited]: isVisited && !isActive,
                                    })}
                                    onClick={() => handleFeatureClick(index)}
                                    aria-label={`Feature ${index + 1}: ${col.title}`}
                                >
                                    <span className={styles.pdRadioInner}></span>
                                </button>
                            );
                        })}
                    </div>

                    {/* PROGRESS LINES - one per feature */}
                    <div className={styles.pdProgressLines}>
                        {FEATURE_COLUMNS.map((_, index) => {
                            const isActive = activeFeature === index;
                            const isVisited = visited.has(index) && !isActive;
                            const progressWidth = isActive ? `${progress}%` : isVisited ? '100%' : '0%';

                            return (
                                <button
                                    key={index}
                                    className={classNames(styles.pdProgressLineBtn, {
                                        [styles.pdProgressActive]: isActive,
                                    })}
                                    onClick={() => handleFeatureClick(index)}
                                    aria-label={`Feature ${index + 1}: ${FEATURE_COLUMNS[index].title}`}
                                >
                                    <div className={styles.pdProgressTrack}>
                                        <div
                                            className={styles.pdProgressFillLine}
                                            style={{
                                                width: progressWidth,
                                                background: isActive
                                                    ? 'linear-gradient(90deg, #0ea5e9, #38bdf8)'
                                                    : isVisited
                                                        ? '#10b981'
                                                        : 'rgba(219, 234, 254, 0.3)',
                                            }}
                                        ></div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* FEATURE COLUMNS - All displayed */}
                    <div className={styles.pdFeatureGrid}>
                        {/* Vertical dividers */}
                        <div className={styles.pdFeatureDivider} style={{ left: '25%' }}></div>
                        <div className={styles.pdFeatureDivider} style={{ left: '50%' }}></div>
                        <div className={styles.pdFeatureDivider} style={{ left: '75%' }}></div>

                        {FEATURE_COLUMNS.map((col, index) => {
                            const isActive = activeFeature === index;
                            const isVisited = visited.has(index);

                            return (
                                <button
                                    key={index}
                                    className={classNames(styles.pdFeatureCard, {
                                        [styles.pdFeatureActive]: isActive,
                                        [styles.pdFeatureVisited]: isVisited && !isActive,
                                    })}
                                    onClick={() => handleFeatureClick(index)}
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                    aria-label={`Feature ${index + 1}: ${col.title}`}
                                >
                                    <div className={styles.pdCol}>
                                        <div className={classNames(styles.pdColIcon, styles[col.iconClass])}>
                                            {(() => {
                                                const Icon = featureIconMap[col.icon as keyof typeof featureIconMap];
                                                return <Icon />;
                                            })()}
                                        </div>
                                        <h4>{col.title}</h4>
                                        <p>{col.description}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default DataDescribe;
