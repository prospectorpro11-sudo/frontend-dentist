'use client';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BsGlobeAmericas, BsShieldCheck, BsGeoAltFill, BsArrowRepeat, BsMapFill, BsArrowRight, BsBuildingFill, BsBullseye } from 'react-icons/bs';
import styles from './locationSegmentation.module.scss';

const CONTENT = {
    badge: "Real-Time Data",
    title: {
        prefix: "Geo-Targeted",
        highlight: "Dentist Database"
    },
    description: "Every contact pinned on the map. Target by state, city, or radius with surgical precision.",
    mapCard: {
        title: "United States — Dentist Coverage",
        legend: [
            { label: "High Density", active: true },
            { label: "Medium", active: false },
            { label: "Low", active: false }
        ],
        footer: [
            { icon: BsShieldCheck, text: "930K+ verified" },
            { icon: BsGeoAltFill, text: "50 states", subtext: "25K cities" },
            { icon: BsArrowRepeat, text: "Updated Jan 2026" }
        ]
    },
    features: [
        {
            id: 1,
            icon: BsMapFill,
            badge: "Most Used",
            title: "State-Wise Targeting",
            desc: "Filter any state and pull contacts instantly. From broad regional campaigns to hyper-local outreach.",
            linkText: "Explore by state",
            linkUrl: "#"
        },
        {
            id: 2,
            icon: BsBuildingFill,
            badge: "Precision",
            title: "City-Level Drill",
            desc: "Pinpoint dental professionals in any city. 25,000+ cities mapped with real density data.",
            linkText: "Explore cities",
            linkUrl: "#",
            variant: "2"
        },
        {
            id: 3,
            icon: BsBullseye,
            badge: null,
            title: "Zip-Code Radius",
            desc: "Drop a pin and grab every dentist within 5, 10, 25 or custom mile radius. Perfect territory coverage.",
            linkText: "Try radius search",
            linkUrl: "#",
            variant: "3"
        }
    ]
};

const LocationSegmentation = () => {
    useEffect(() => {
        const initializeMap = async () => {
            const L = await import('leaflet');
            await import('leaflet/dist/leaflet.css');

            const el = document.getElementById("lsLeafletMap");
            if (!el) return;

            delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            });

            const map = L.map(el, {
                zoomControl: false,
                dragging: false,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                touchZoom: false,
                boxZoom: false,
                keyboard: false,
                zoomSnap: 0,
                zoomDelta: 0,
                attributionControl: false
            });

            L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
                maxZoom: 16
            }).addTo(map);

            map.setView([39.5, -96], 4);

            // Marker: dot + label on map surface
            function dotMarker(dotClass: string, breatheClass: string, label: string) {
                return L.divIcon({
                    className: styles.lsLocMarker,
                    html: `<div class="${styles.lsLocDot} ${dotClass}">` +
                        `<div class="${styles.lsLocBreathe} ${breatheClass}"></div>` +
                        `</div>` +
                        `<span class="${styles.lsLocLabel}">${label}</span>`,
                    iconSize: [20, 32],
                    iconAnchor: [10, 20],
                    popupAnchor: [0, -22]
                });
            }

            // Card HTML (small info card)
            function makeCard(type: string, icon: string, title: string, count: string, breatheClass: string) {
                const labels: { [key: string]: string } = { state: 'State', city: 'City', zip: 'Zip Code' };
                return `<div class="${styles.lsMapCardMini}">` +
                    `<div class="${styles.lsMcTop}">` +
                    `<i class="bi ${icon}"></i>` +
                    `<span class="${styles.lsMcType}">${labels[type]}</span>` +
                    `</div>` +
                    `<div class="${styles.lsMcName}">${title}</div>` +
                    `<div class="${styles.lsMcBreath} ${breatheClass}"></div>` +
                    `<div class="${styles.lsMcCount}">${count} <span>contacts</span></div>` +
                    `</div>`;
            }

            // 3 always-visible pins with cards
            const points = [
                {
                    coords: [37.75, -119.25] as [number, number],
                    dot: dotMarker(styles.lsDotState, styles.lsBreatheRingState, "California"),
                    card: makeCard("state", "bi-map-fill", "California", "45,320", styles.lsBreatheInlineState)
                },
                {
                    coords: [38.97, -95.24] as [number, number],
                    dot: dotMarker(styles.lsDotCity, styles.lsBreatheRingCity, "Lawrence"),
                    card: makeCard("city", "bi-building-fill", "Lawrence, KS", "9,520", styles.lsBreatheInlineCity)
                },
                {
                    coords: [40.75, -73.99] as [number, number],
                    dot: dotMarker(styles.lsDotZip, styles.lsBreatheRingZip, "10001"),
                    card: makeCard("zip", "bi-geo-alt-fill", "10001", "1,240", styles.lsBreatheInlineZip)
                }
            ];

            for (let i = 0; i < points.length; i++) {
                const marker = L.marker(points[i].coords, { icon: points[i].dot }).addTo(map);

                marker.bindTooltip(points[i].card, {
                    permanent: true,
                    interactive: false,
                    offset: [0, -5],
                    direction: "top",
                    className: styles.lsTooltipCard,
                    opacity: 1
                });
            }
        };

        initializeMap();
    }, []);

    return (
        <section className={styles.locationSegmentation}>
            <div className={styles.lsAmbientBg}></div>
            <Container>
                <div className={styles.lsHead}>
                    <div className={styles.lsHeadInner}>
                        <div className={styles.lsHeadLeft}>
                            <div className={styles.lsLiveBadge}>
                                <span className={styles.lsLiveDot}></span> {CONTENT.badge}
                            </div>
                            <h2 className={styles.lsMainTitle}>
                                {CONTENT.title.prefix} <span className={styles.lsTitleGlow}>{CONTENT.title.highlight}</span>
                            </h2>
                            <p className={styles.lsHeadDesc}>{CONTENT.description}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.lsGrid}>
                    <div className={styles.lsMapCard}>
                        <div className={styles.lsMapHeader}>
                            <div className={styles.lsMapHLeft}>
                                <BsGlobeAmericas />
                                <span>{CONTENT.mapCard.title}</span>
                            </div>
                            <div className={styles.lsMapHRight}>
                                <div className={styles.lsMapLegend}>
                                    {CONTENT.mapCard.legend.map((item, idx) => (
                                        <span
                                            key={idx}
                                            className={`${styles.lsLeg} ${item.active ? styles.lsLegActive : ''}`}
                                        >
                                            <span></span> {item.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={styles.lsMapViewport}>
                            <div id="lsLeafletMap" className={styles.lsLeafletMap}></div>
                        </div>

                        <div className={styles.lsMapFooter}>
                            {CONTENT.mapCard.footer.map((item, idx) => (
                                <div key={idx} className={styles.lsMfItem}>
                                    <item.icon />
                                    <span>
                                        {item.text}
                                        {item.subtext && <> <span className={styles.lsMfDot}></span> {item.subtext}</>}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.lsFeatures}>
                        {CONTENT.features.map((feature) => (
                            <div key={feature.id} className={styles.lsFcard}>
                                <div className={styles.lsFcardGlow}></div>
                                <div className={styles.lsFcardInner}>
                                    <div className={styles.lsFcHead}>
                                        <div className={`${styles.lsFcIconWrap} ${feature.variant ? styles[`lsFcIc${feature.variant}`] : ''}`}>
                                            <feature.icon />
                                        </div>
                                        {feature.badge && (
                                            <div className={`${styles.lsFcBadge} ${feature.variant ? styles[`lsFcBadge${feature.variant}`] : ''}`}>
                                                {feature.badge}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className={styles.lsFcTitle}>{feature.title}</h3>
                                    <p className={styles.lsFcDesc}>{feature.desc}</p>
                                    <a
                                        href={feature.linkUrl}
                                        className={`${styles.lsFcLink} ${feature.variant ? styles[`lsFcLink${feature.variant}`] : ''}`}
                                    >
                                        {feature.linkText} <BsArrowRight style={{ marginLeft: '6px' }} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default LocationSegmentation;