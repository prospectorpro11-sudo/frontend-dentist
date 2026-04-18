'use client';
import { useEffect, useMemo, useState } from "react";
import {
    BsAt,
    BsArrowClockwise,
    BsAwardFill,
    BsCollectionFill,
    BsDownload,
    BsEnvelopeCheckFill,
    BsEnvelopeFill,
    BsFileEarmarkFill,
    BsFire,
    BsFunnelFill,
    BsGrid3X3GapFill,
    BsHeadset,
    BsLightningChargeFill,
    BsPatchCheckFill,
    BsPatchCheck,
    BsPersonLinesFill,
    BsShieldFillCheck,
    BsStarFill,
    BsStars,
    BsTelephoneFill,
    BsPrinterFill,
} from "react-icons/bs";
import { Container } from "react-bootstrap";
import CtaSection from "@/components/ctaSection/CtaSection";
import styles from "./productListMainView.module.scss";
import { FaHashtag } from "react-icons/fa6";
import HeroAndStatsSection from "./views/HeroAndStatsSection";
import ProductControlsSection from "./views/ProductControlsSection";
import ProductDataViewsSection from "./views/ProductDataViewsSection";
import ProductTrustSection from "./views/ProductTrustSection";
import { IProductListItem } from "@/shared/interface";

type FilterKey = "all" | "hot" | "popular" | "new" | "verified";
type SortKey = "default" | "npis-desc" | "npis-asc" | "name-az" | "emails-desc";
type ViewKey = "grid" | "list";
type HideableColumnKey = "npis" | "emails" | "phones" | "faxes" | "licenses";


const iconGradients: Record<IProductListItem["color"], string> = {
    rose: "linear-gradient(135deg, #f43f5e, #e11d48)",
    teal: "linear-gradient(135deg, #14b8a6, #0d9488)",
    blue: "linear-gradient(135deg, #0ea5e9, #0284c7)",
    amber: "linear-gradient(135deg, #f59e0b, #d97706)",
    indigo: "linear-gradient(135deg, #6366f1, #4f46e5)",
    emerald: "linear-gradient(135deg, #10b981, #059669)",
};
//dummy data
const DB: IProductListItem[] = [
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
            { key: "hash" as const, label: "", icon: <FaHashtag />, className: "", width: ".45fr" },
            { key: "specialty" as const, label: "Specialty", icon: <BsPersonLinesFill />, className: "", width: "2.2fr" },
            { key: "npis" as const, label: "NPIs", icon: <BsFileEarmarkFill />, className: styles.colCenter, width: ".75fr" },
            { key: "emails" as const, label: "Emails", icon: <BsEnvelopeFill />, className: styles.colCenter, width: ".75fr" },
            { key: "phones" as const, label: "Phones", icon: <BsTelephoneFill />, className: styles.colCenter, width: ".75fr" },
            { key: "faxes" as const, label: "Faxes", icon: <BsPrinterFill />, className: styles.colCenter, width: ".75fr" },
            { key: "licenses" as const, label: "Licenses", icon: <BsPatchCheckFill />, className: styles.colCenter, width: ".85fr" },
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
            <HeroAndStatsSection animatedStats={animatedStats} fmt={fmt} styles={styles} />

            <Container as="main">
                <ProductControlsSection
                    search={search}
                    sort={sort}
                    view={view}
                    filter={filter}
                    chips={chips}
                    sortOptions={sortOptions}
                    hideableColumns={hideableColumns}
                    visibleColumns={visibleColumns}
                    isColumnsMenuOpen={isColumnsMenuOpen}
                    filteredCount={filteredData.length}
                    tagMeta={tagMeta}
                    defaultVisibleColumns={defaultHideableColumns}
                    styles={styles}
                    onSearchChange={setSearch}
                    onSortChange={(value) => setSort(value as SortKey)}
                    onViewChange={setView}
                    onFilterChange={(value) => setFilter(value as FilterKey)}
                    onToggleColumnsMenu={() => setIsColumnsMenuOpen((prev) => !prev)}
                    onToggleColumnVisibility={(columnKey) => toggleColumnVisibility(columnKey as HideableColumnKey)}
                    onResetColumns={() => setVisibleColumns(defaultHideableColumns)}
                />

                <ProductDataViewsSection
                    view={view}
                    filteredData={filteredData}
                    itemIcons={itemIcons}
                    iconGradients={iconGradients}
                    featured={featured}
                    fmt={fmt}
                    tagMeta={tagMeta}
                    styles={styles}
                    visibleListColumns={visibleListColumns}
                    listGridTemplateColumns={listGridTemplateColumns}
                />

                <ProductTrustSection trustItems={trustItems} styles={styles} />

                <CtaSection />
            </Container>
        </div>
    );
};

export default ProductListMainView;