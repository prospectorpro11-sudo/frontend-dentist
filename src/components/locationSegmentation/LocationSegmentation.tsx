'use client';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BsGlobeAmericas, BsShieldCheck, BsGeoAltFill, BsArrowRepeat, BsMapFill, BsArrowRight, BsBuildingFill, BsBullseye } from 'react-icons/bs';
import styles from './locationSegmentation.module.scss';
import { ILocationSegmentation } from '../../shared/interface';

const uiIconMap = {
    shield: BsShieldCheck,
    geo: BsGeoAltFill,
    refresh: BsArrowRepeat,
    map: BsMapFill,
    building: BsBuildingFill,
    target: BsBullseye,
} as const;

const dotClassMap = {
    state: styles.lsDotState,
    city: styles.lsDotCity,
    zip: styles.lsDotZip,
} as const;

const breatheRingClassMap = {
    state: styles.lsBreatheRingState,
    city: styles.lsBreatheRingCity,
    zip: styles.lsBreatheRingZip,
} as const;

const breatheInlineClassMap = {
    state: styles.lsBreatheInlineState,
    city: styles.lsBreatheInlineCity,
    zip: styles.lsBreatheInlineZip,
} as const;

const LocationSegmentation = (props: ILocationSegmentation) => {
    const { content: CONTENT, mapPoints } = props;

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

            const points = mapPoints.map((point) => ({
                coords: point.coords,
                dot: dotMarker(
                    dotClassMap[point.dotType as keyof typeof dotClassMap],
                    breatheRingClassMap[point.dotType as keyof typeof breatheRingClassMap],
                    point.label
                ),
                card: makeCard(
                    point.card.type,
                    point.card.icon,
                    point.card.title,
                    point.card.count,
                    breatheInlineClassMap[point.card.breatheType as keyof typeof breatheInlineClassMap]
                ),
            }));

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
                                    {(() => {
                                        const Icon = uiIconMap[item.icon as keyof typeof uiIconMap];
                                        return <Icon />;
                                    })()}
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
                                            {(() => {
                                                const Icon = uiIconMap[feature.icon as keyof typeof uiIconMap];
                                                return <Icon />;
                                            })()}
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