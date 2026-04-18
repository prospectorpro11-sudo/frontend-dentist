'use client';
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import {
    BsAt,
    BsArrowClockwise,
    BsAwardFill,
    BsBullseye,
    BsCollectionFill,
    BsDownload,
    BsEnvelope,
    BsEnvelopeCheckFill,
    BsCheck2,
    BsFileEarmarkCode,
    BsFire,
    BsFunnel,
    BsFunnelFill,
    BsGrid3X3GapFill,
    BsHash,
    BsHeadset,
    BsLightningChargeFill,
    BsListUl,
    BsPatchCheckFill,
    BsPatchCheck,
    BsPersonLinesFill,
    BsSearch,
    BsShieldLockFill,
    BsShieldFillCheck,
    BsStarFill,
    BsStars,
    BsTelephone,
    BsTelephoneFill,
    BsPrinterFill,
} from "react-icons/bs";
import { Container } from "react-bootstrap";
import styles from "./productListMainView.module.scss";

type FilterKey = "all" | "hot" | "popular" | "new" | "verified";
type SortKey = "default" | "npis-desc" | "npis-asc" | "name-az" | "emails-desc";
type ViewKey = "grid" | "list";
type HideableColumnKey = "npis" | "emails" | "phones" | "faxes" | "licenses";

type DbItem = {
    name: string;
    npis: number;
    emails: number;
    phones: number;
    faxes: number;
    licenses: number;
    color: "rose" | "teal" | "blue" | "amber" | "indigo" | "emerald";
    tags: Array<"hot" | "popular" | "new" | "verified">;
    cat: string;
};

const iconGradients: Record<DbItem["color"], string> = {
    rose: "linear-gradient(135deg, #f43f5e, #e11d48)",
    teal: "linear-gradient(135deg, #14b8a6, #0d9488)",
    blue: "linear-gradient(135deg, #0ea5e9, #0284c7)",
    amber: "linear-gradient(135deg, #f59e0b, #d97706)",
    indigo: "linear-gradient(135deg, #6366f1, #4f46e5)",
    emerald: "linear-gradient(135deg, #10b981, #059669)",
};

const DB: DbItem[] = [
    { name: "Allergist Email List", npis: 5072, emails: 889, phones: 3521, faxes: 2617, licenses: 5004, color: "rose", tags: ["hot"], cat: "Specialists" },
    { name: "Allergy Immunology Email List", npis: 5151, emails: 919, phones: 3582, faxes: 2656, licenses: 5079, color: "teal", tags: ["verified"], cat: "Specialists" },
    { name: "Anesthesiologist Email List", npis: 51351, emails: 18309, phones: 16771, faxes: 7785, licenses: 49549, color: "blue", tags: ["hot", "popular"], cat: "Surgical" },
    { name: "Bariatric Physician Email List", npis: 79, emails: 15, phones: 79, faxes: 48, licenses: 78, color: "amber", tags: ["new"], cat: "General Practice" },
    { name: "Cardiologist Email List", npis: 24828, emails: 7461, phones: 11500, faxes: 8695, licenses: 23850, color: "rose", tags: ["hot", "popular"], cat: "Specialists" },
    { name: "Dermatologist Email List", npis: 13338, emails: 6520, phones: 8107, faxes: 5935, licenses: 12956, color: "teal", tags: ["popular"], cat: "Specialists" },
    { name: "Diabetes Specialist Email List", npis: 7881, emails: 1856, phones: 5184, faxes: 3627, licenses: 7647, color: "blue", tags: ["verified"], cat: "Specialists" },
    { name: "Emergency Medicine Email List", npis: 61025, emails: 10071, phones: 23593, faxes: 9418, licenses: 58675, color: "indigo", tags: ["hot", "popular"], cat: "Acute Care" },
    { name: "Emergency Physicians Email List", npis: 61011, emails: 10057, phones: 23585, faxes: 9417, licenses: 58675, color: "indigo", tags: ["hot"], cat: "Acute Care" },
    { name: "Endocrinologist Email List", npis: 7880, emails: 1855, phones: 5184, faxes: 3627, licenses: 7647, color: "teal", tags: ["new"], cat: "Specialists" },
    { name: "ENT Specialist Email List", npis: 9796, emails: 2375, phones: 5512, faxes: 3858, licenses: 9599, color: "amber", tags: ["verified", "new"], cat: "Specialists" },
    { name: "Gastroenterologist Email List", npis: 15342, emails: 4201, phones: 9876, faxes: 6543, licenses: 15100, color: "blue", tags: ["popular"], cat: "Specialists" },
    { name: "General Surgeon Email List", npis: 28400, emails: 8900, phones: 14200, faxes: 11000, licenses: 27800, color: "rose", tags: ["hot", "popular", "verified"], cat: "Surgical" },
    { name: "Hematologist Email List", npis: 4200, emails: 980, phones: 2800, faxes: 1900, licenses: 4100, color: "rose", tags: ["new"], cat: "Specialists" },
    { name: "Infectious Disease Email List", npis: 8100, emails: 2100, phones: 5600, faxes: 3900, licenses: 7900, color: "teal", tags: ["verified"], cat: "Specialists" },
    { name: "Nephrologist Email List", npis: 9100, emails: 2500, phones: 6200, faxes: 4100, licenses: 8900, color: "blue", tags: [], cat: "Specialists" },
    { name: "Neurologist Email List", npis: 17400, emails: 5100, phones: 10800, faxes: 7500, licenses: 17000, color: "indigo", tags: ["hot", "popular"], cat: "Specialists" },
    { name: "Obstetrician Email List", npis: 13200, emails: 3800, phones: 8900, faxes: 6000, licenses: 12900, color: "teal", tags: ["popular"], cat: "Women's Health" },
    { name: "Oncologist Email List", npis: 11500, emails: 3400, phones: 7800, faxes: 5400, licenses: 11200, color: "emerald", tags: ["verified", "hot"], cat: "Specialists" },
    { name: "Ophthalmologist Email List", npis: 12200, emails: 3600, phones: 8100, faxes: 5700, licenses: 11900, color: "blue", tags: ["new"], cat: "Specialists" },
    { name: "Orthopedist Email List", npis: 16800, emails: 4900, phones: 11200, faxes: 7800, licenses: 16400, color: "amber", tags: ["popular"], cat: "Surgical" },
    { name: "Otolaryngologist Email List", npis: 6800, emails: 1900, phones: 4600, faxes: 3100, licenses: 6700, color: "teal", tags: [], cat: "Specialists" },
    { name: "Pulmonologist Email List", npis: 7500, emails: 2200, phones: 5000, faxes: 3400, licenses: 7300, color: "blue", tags: ["verified"], cat: "Specialists" },
    { name: "Pediatrician Email List", npis: 32000, emails: 12000, phones: 22000, faxes: 14000, licenses: 31000, color: "emerald", tags: ["hot", "popular"], cat: "General Practice" },
];

const tagMeta = {
    hot: { lbl: "Hot", cls: "rHot", tcls: "ctHot" },
    popular: { lbl: "Popular", cls: "rPopular", tcls: "ctPopular" },
    new: { lbl: "New", cls: "rNew", tcls: "ctNew" },
    verified: { lbl: "Verified", cls: "rVerified", tcls: "ctVerified" },
};

const featured = new Set([
    "Emergency Medicine Email List",
    "Emergency Physicians Email List",
    "Pediatrician Email List",
]);

const itemIcons = [
    BsCollectionFill,
    BsPersonLinesFill,
    BsAt,
    BsTelephoneFill,
    BsShieldFillCheck,
    BsPatchCheckFill,
    BsEnvelopeCheckFill,
    BsFunnelFill,
    BsStarFill,
    BsFire,
    BsHeadset,
    BsDownload,
];

const fmt = (n: number) => n.toLocaleString("en-US");

const defaultHideableColumns: Record<HideableColumnKey, boolean> = {
    npis: true,
    emails: true,
    phones: true,
    faxes: true,
    licenses: true,
};

const ProductListMainView = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterKey>("all");
    const [sort, setSort] = useState<SortKey>("default");
    const [view, setView] = useState<ViewKey>("list");
    const [isColumnsMenuOpen, setIsColumnsMenuOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState<Record<HideableColumnKey, boolean>>(defaultHideableColumns);
    const [animatedStats, setAnimatedStats] = useState({
        specialtyLists: 0,
        totalContacts: 0,
        emailAddresses: 0,
        phoneNumbers: 0,
    });

    const sortOptions = [
        { value: "default", label: "Sort: Default" },
        { value: "npis-desc", label: "NPIs: Highest -> Lowest" },
        { value: "npis-asc", label: "NPIs: Lowest -> Highest" },
        { value: "name-az", label: "Name: A -> Z" },
        { value: "emails-desc", label: "Emails: Most -> Least" },
    ];

    const chips = useMemo(() => {
        const countFor = (tag: Exclude<FilterKey, "all">) => DB.filter((d) => d.tags.includes(tag)).length;

        return [
            { key: "all" as const, label: "All", count: DB.length, icon: <BsGrid3X3GapFill /> },
            { key: "hot" as const, label: "Hot", count: countFor("hot"), icon: <BsFire /> },
            { key: "popular" as const, label: "Popular", count: countFor("popular"), icon: <BsStarFill /> },
            { key: "new" as const, label: "New", count: countFor("new"), icon: <BsStars /> },
            { key: "verified" as const, label: "Verified", count: countFor("verified"), icon: <BsPatchCheck /> },
        ];
    }, []);

    const statsSummary = useMemo(() => {
        const totalContacts = DB.reduce((sum, item) => sum + item.npis, 0);
        const emailAddresses = DB.reduce((sum, item) => sum + item.emails, 0);
        const phoneNumbers = DB.reduce((sum, item) => sum + item.phones, 0);

        return {
            specialtyLists: DB.length,
            totalContacts,
            emailAddresses,
            phoneNumbers,
        };
    }, []);

    useEffect(() => {
        const duration = 1500;
        const start = performance.now();
        let raf = 0;

        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setAnimatedStats({
                specialtyLists: Math.floor(statsSummary.specialtyLists * eased),
                totalContacts: Math.floor(statsSummary.totalContacts * eased),
                emailAddresses: Math.floor(statsSummary.emailAddresses * eased),
                phoneNumbers: Math.floor(statsSummary.phoneNumbers * eased),
            });

            if (progress < 1) {
                raf = requestAnimationFrame(tick);
            }
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [statsSummary]);

    const filteredData = useMemo(() => {
        let result = [...DB];

        if (filter !== "all") {
            result = result.filter((d) => d.tags.includes(filter));
        }

        const q = search.trim().toLowerCase();
        if (q) {
            result = result.filter(
                (d) => d.name.toLowerCase().includes(q) || d.cat.toLowerCase().includes(q),
            );
        }

        if (sort === "npis-desc") result.sort((a, b) => b.npis - a.npis);
        if (sort === "npis-asc") result.sort((a, b) => a.npis - b.npis);
        if (sort === "name-az") result.sort((a, b) => a.name.localeCompare(b.name));
        if (sort === "emails-desc") result.sort((a, b) => b.emails - a.emails);

        return result;
    }, [filter, search, sort]);

    const listHeaderColumns = useMemo(
        () => [
            { key: "hash" as const, label: "", icon: <BsHash />, className: "", width: ".45fr" },
            { key: "specialty" as const, label: "Specialty", icon: <BsListUl />, className: "", width: "2.2fr" },
            { key: "npis" as const, label: "NPIs", icon: <BsFileEarmarkCode />, className: styles.colCenter, width: ".75fr" },
            { key: "emails" as const, label: "Emails", icon: <BsEnvelope />, className: styles.colCenter, width: ".75fr" },
            { key: "phones" as const, label: "Phones", icon: <BsTelephone />, className: styles.colCenter, width: ".75fr" },
            { key: "faxes" as const, label: "Faxes", icon: <BsPrinterFill />, className: styles.colCenter, width: ".75fr" },
            { key: "licenses" as const, label: "Licenses", icon: <BsPatchCheck />, className: styles.colCenter, width: ".85fr" },
            { key: "action" as const, label: "Action", icon: null, className: styles.colRight, width: "1.3fr" },
        ],
        [],
    );

    const visibleListColumns = useMemo(
        () => listHeaderColumns.filter((column) => {
            if (column.key === "hash" || column.key === "specialty" || column.key === "action") {
                return true;
            }

            return visibleColumns[column.key as HideableColumnKey];
        }),
        [listHeaderColumns, visibleColumns],
    );

    const hideableColumns = useMemo(
        () => listHeaderColumns.filter((column) => column.key !== "hash" && column.key !== "specialty" && column.key !== "action"),
        [listHeaderColumns],
    );

    const listGridTemplateColumns = useMemo(
        () => (visibleListColumns.length > 0 ? visibleListColumns.map((column) => column.width).join(" ") : "1fr"),
        [visibleListColumns],
    );

    const toggleColumnVisibility = (columnKey: HideableColumnKey) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [columnKey]: !prev[columnKey],
        }));
    };

    const trustItems = [
        { key: "gdpr", label: "GDPR Compliant", icon: <BsShieldFillCheck className={styles.trustTeal} /> },
        { key: "verified", label: "Multi-Verified Data", icon: <BsPatchCheckFill className={styles.trustSky} /> },
        { key: "deliverability", label: "95%+ Deliverability", icon: <BsLightningChargeFill className={styles.trustAmber} /> },
        { key: "replace", label: "Free Replacements", icon: <BsArrowClockwise className={styles.trustEmerald} /> },
        { key: "canSpam", label: "CAN-SPAM Ready", icon: <BsAwardFill className={styles.trustIndigo} /> },
    ];

    return (
        <div>
            <section className={styles.hero}>
                <div className={styles.heroSurface}></div>
                <Container>
                    <div className={styles.heroContent}>
                        <div className={styles.heroText}>
                            <div className={styles.liveBadge}>
                                <span className={styles.pulseDot}></span>
                                24 Verified Specialty Databases — Updated Weekly
                            </div>
                            <h1 className={styles.heroTitle}>
                                Premium <span className="shifting-accent">Specialty</span><br />
                                Medical Contact Lists
                            </h1>
                            <p className={styles.heroSub}>
                                Precision-targeted healthcare contact databases for B2B lead generation — verified, GDPR-compliant, and optimized for 95%+ email deliverability.
                            </p>
                            <div className={styles.heroActions}>
                                <a href="#" className={classNames(styles.btn, styles.btnWhite)}>
                                    <BsFunnelFill /> Open Prospector
                                </a>
                                <a href="#" className={classNames(styles.btn, styles.btnGhost)}>
                                    <BsDownload /> Full Catalog
                                </a>
                            </div>
                        </div>
                        <div className={styles.heroVisual}>
                            <div className={classNames(styles.heroFloat, styles.heroFloat1)}>
                                <BsEnvelopeCheckFill />
                                <div>
                                    <div className={styles.val}>930K+</div>
                                    <div className={styles.lbl}>Verified Contacts</div>
                                </div>
                            </div>
                            <div className={classNames(styles.heroFloat, styles.heroFloat2)}>
                                <BsPatchCheckFill />
                                <div>
                                    <div className={styles.val}>95%</div>
                                    <div className={styles.lbl}>Deliverability</div>
                                </div>
                            </div>
                            <div className={classNames(styles.heroFloat, styles.heroFloat3)}>
                                <BsShieldLockFill />
                                <div>
                                    <div className={styles.val}>100%</div>
                                    <div className={styles.lbl}>GDPR Compliant</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <Container className={styles.statsFloat}>
                <div className={styles.statsFloatInner}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <div className={classNames(styles.statIcon, styles.gBlue)}>
                                <BsCollectionFill />
                            </div>
                            <div className={styles.statInfo}>
                                <div className={styles.statVal} data-target="24">{fmt(animatedStats.specialtyLists)}</div>
                                <div className={styles.statLbl}>Specialty Lists</div>
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={classNames(styles.statIcon, styles.gTeal)}>
                                <BsPersonLinesFill />
                            </div>
                            <div className={styles.statInfo}>
                                <div className={styles.statVal} data-target="930285">{fmt(animatedStats.totalContacts)}</div>
                                <div className={styles.statLbl}>Total Contacts</div>
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={classNames(styles.statIcon, styles.gIndigo)}>
                                <BsAt />
                            </div>
                            <div className={styles.statInfo}>
                                <div className={styles.statVal} data-target="885150">{fmt(animatedStats.emailAddresses)}</div>
                                <div className={styles.statLbl}>Email Addresses</div>
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={classNames(styles.statIcon, styles.gAmber)}>
                                <BsTelephoneFill />
                            </div>
                            <div className={styles.statInfo}>
                                <div className={styles.statVal} data-target="142350">{fmt(animatedStats.phoneNumbers)}</div>
                                <div className={styles.statLbl}>Phone Numbers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container as="main" className={styles.mainSection}>
                <div className={classNames(styles.tools, styles.reveal)}>
                    <div className={styles.toolsPrimary}>
                        <div className={styles.toolsLeft}>
                            <div className={styles.search}>
                                <BsSearch />
                                <input
                                    type="text"
                                    id="searchInput"
                                    placeholder="Search specialties, categories..."
                                    autoComplete="off"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <select
                                className={styles.select}
                                id="sortSelect"
                                value={sort}
                                onChange={(e) => setSort(e.target.value as SortKey)}
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.viewToggle}>
                            <button
                                type="button"
                                className={classNames(styles.viewToggleBtn, view === "list" && styles.active)}
                                id="listBtn"
                                title="List View"
                                onClick={() => setView("list")}
                            >
                                <BsListUl />
                            </button>
                            <button
                                type="button"
                                className={classNames(styles.viewToggleBtn, view === "grid" && styles.active)}
                                id="gridBtn"
                                title="Grid View"
                                onClick={() => setView("grid")}
                            >
                                <BsGrid3X3GapFill />
                            </button>
                        </div>
                    </div>

                    <div className={styles.chips}>
                        {chips.map((chip) => (
                            <div
                                key={chip.key}
                                className={classNames(styles.chip, filter === chip.key && styles.active)}
                                data-filter={chip.key}
                                onClick={() => setFilter(chip.key)}
                            >
                                {chip.icon} {chip.label} <span className={styles.count}>{chip.count}</span>
                            </div>
                        ))}
                        <button
                            type="button"
                            className={classNames(styles.chip, styles.columnsChipBtn, isColumnsMenuOpen && styles.active)}
                            onClick={() => setIsColumnsMenuOpen((prev) => !prev)}
                        >
                            <BsListUl /> Columns
                        </button>
                    </div>

                    <div className={classNames(styles.columnsRow, isColumnsMenuOpen && styles.visible)}>
                        {hideableColumns.map((column) => {
                            const checked = visibleColumns[column.key as HideableColumnKey];

                            return (
                                <button
                                    key={column.key}
                                    type="button"
                                    className={classNames(styles.columnBadge, checked && styles.active)}
                                    onClick={() => toggleColumnVisibility(column.key as HideableColumnKey)}
                                >
                                    <BsCheck2 className={styles.columnCheckIcon} /> {column.label || "#"}
                                </button>
                            );
                        })}
                        <button
                            type="button"
                            className={classNames(styles.columnBadge, styles.resetBadge)}
                            onClick={() => setVisibleColumns(defaultHideableColumns)}
                        >
                            <BsArrowClockwise className={styles.columnCheckIcon} /> Reset
                        </button>
                    </div>

                    <div className={classNames(styles.filterTags, filter !== "all" && styles.visible)} id="filterTags">
                        <BsFunnel className={styles.filterIcon} />
                        <span className={styles.filteringLabel}>Filtering:</span>
                        <div id="activeTags">
                            {filter !== "all" && (
                                <span className={styles.filterTag}>
                                    {tagMeta[filter].lbl}
                                    <span
                                        className={styles.remove}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => setFilter("all")}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                setFilter("all");
                                            }
                                        }}
                                    >
                                        x
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className={classNames(styles.resultsBar, styles.reveal)}>
                    <div className={styles.resultsCount}>Showing <strong>{filteredData.length}</strong> specialty lists</div>
                    <div className={classNames(styles.activeFilterLbl, filter !== "all" && styles.visible)} id="filterLbl">
                        <BsFunnelFill />
                        <span id="filterLblText">Showing {filteredData.length} results</span>
                    </div>
                </div>

                {view === "grid" && (
                    <div className={styles.grid} id="gridView">
                        {filteredData.length === 0 && <div>No results found.</div>}
                        {filteredData.map((item, index) => {
                            const Icon = itemIcons[index % itemIcons.length];
                            return (
                                <div
                                    key={item.name}
                                    className={classNames(styles.card, featured.has(item.name) && styles.featured)}
                                >
                                    <div className={styles.cardTop}>
                                        <div className={styles.cardIcon} style={{ background: iconGradients[item.color], position: "relative" }}>
                                            <div className={styles.cardIconGlow}></div>
                                            <Icon />
                                        </div>
                                        <div className={styles.cardMeta}>
                                            <div className={styles.cardCat}>{item.cat}</div>
                                            <div className={styles.cardName}>{item.name}</div>
                                        </div>
                                    </div>

                                    <div className={styles.cardStats}>
                                        <div className={styles.cardStat}>
                                            <div className={classNames(styles.statV, styles.svBlue)}>{fmt(item.npis)}</div>
                                            <div className={styles.statL}>NPI Records</div>
                                        </div>
                                        <div className={styles.cardStat}>
                                            <div className={classNames(styles.statV, styles.svTeal)}>{fmt(item.emails)}</div>
                                            <div className={styles.statL}>Emails</div>
                                        </div>
                                        <div className={styles.cardStat}>
                                            <div className={classNames(styles.statV, styles.svIndigo)}>{fmt(item.phones)}</div>
                                            <div className={styles.statL}>Phones</div>
                                        </div>
                                    </div>

                                    <div className={styles.cardDivider}></div>

                                    <div className={styles.cardFoot}>
                                        <div className={styles.cardRibbons}>
                                            {item.tags.map((tag) => (
                                                <span key={tag} className={classNames(styles.ribbon, styles[tagMeta[tag].cls])}>
                                                    {tagMeta[tag].lbl}
                                                </span>
                                            ))}
                                        </div>
                                        <div className={styles.cardHoverArrow}>{">"}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className={classNames(styles.listView, view === "list" && styles.active)} id="listView">
                    <div className={styles.thead} style={{ gridTemplateColumns: listGridTemplateColumns }}>
                        {visibleListColumns.map((col) => (
                            <div key={col.key} className={col.className}>
                                {col.icon ? <>{col.icon} {col.label}</> : col.label}
                            </div>
                        ))}
                    </div>
                    <div id="listBody">
                        {view === "list" && filteredData.map((item, index) => {
                            const Icon = itemIcons[index % itemIcons.length];
                            const serial = index + 1;
                            return (
                                <div key={item.name} className={styles.trow} style={{ gridTemplateColumns: listGridTemplateColumns }}>
                                    {visibleListColumns.map((column) => {
                                        if (column.key === "hash") {
                                            return (
                                                <div key={column.key} className={styles.tSerial}>
                                                    <span className={styles.tSerialNum}>{serial}</span>
                                                </div>
                                            );
                                        }

                                        if (column.key === "specialty") {
                                            return (
                                                <div key={column.key}>
                                                    <div className={styles.tSpec}>
                                                        <div className={styles.tSpecIcon} style={{ background: iconGradients[item.color] }}>
                                                            <Icon />
                                                        </div>
                                                        <div>
                                                            <div className={styles.tSpecName}>
                                                                {item.name}
                                                                <span className={styles.tSpecExternal}>{">"}</span>
                                                            </div>
                                                            <div>
                                                                {item.tags.map((tag) => (
                                                                    <span key={tag} className={classNames(styles.tTag, styles[tagMeta[tag].tcls])}>
                                                                        {tagMeta[tag].lbl}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        if (column.key === "npis") {
                                            return <div key={column.key} className={classNames(styles.tNum, styles.tnBlue)}><span className={styles.tNumVal}>{fmt(item.npis)}</span></div>;
                                        }

                                        if (column.key === "emails") {
                                            return <div key={column.key} className={classNames(styles.tNum, styles.tnTeal)}><span className={styles.tNumVal}>{fmt(item.emails)}</span></div>;
                                        }

                                        if (column.key === "phones") {
                                            return <div key={column.key} className={classNames(styles.tNum, styles.tnIndigo)}><span className={styles.tNumVal}>{fmt(item.phones)}</span></div>;
                                        }

                                        if (column.key === "faxes") {
                                            return <div key={column.key} className={classNames(styles.tNum, styles.tnAmber)}><span className={styles.tNumVal}>{fmt(item.faxes)}</span></div>;
                                        }

                                        if (column.key === "licenses") {
                                            return <div key={column.key} className={classNames(styles.tNum, styles.tnIndigo)}><span className={styles.tNumVal}>{fmt(item.licenses)}</span></div>;
                                        }

                                        return (
                                            <div key={column.key} style={{ display: "flex", justifyContent: "flex-end" }}>
                                                <a href="#" className={styles.tActionBtn}>
                                                    <span>Customize</span>
                                                    <span>{">"}</span>
                                                </a>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={classNames(styles.trust, styles.reveal)}>
                    <div className={styles.trustInner}>
                        {trustItems.map((item) => (
                            <div key={item.key} className={styles.trustItem}>
                                {item.icon}
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={classNames(styles.cta, styles.reveal)}>
                    <div className={styles.ctaInner}>
                        <div className={styles.ctaRing}></div>
                        <div className={styles.ctaIcon}><BsBullseye /></div>
                        <h2>Build a Custom List from 930,000+ Contacts</h2>
                        <p>
                            Use the Prospector to filter by specialty, location, gender, license type, and more
                            - one-time purchase, no subscription.
                        </p>
                        <div className={styles.ctaBtns}>
                            <a href="#" className={classNames(styles.btn, styles.btnWhite)}>
                                <BsFunnelFill /> Open Prospector
                            </a>
                            <a href="#" className={classNames(styles.btn, styles.btnGhost)}>
                                <BsHeadset /> Talk to Sales
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProductListMainView;