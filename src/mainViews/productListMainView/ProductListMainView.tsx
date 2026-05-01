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
import { ProductCatalogItem } from "@/shared/productCatalog";

type FilterKey = "all" | "hot" | "popular" | "new" | "verified";
type SortKey = "default" | "npis-desc" | "npis-asc" | "name-az" | "emails-desc";
type ViewKey = "grid" | "list";
type HideableColumnKey = "npis" | "emails" | "phones" | "faxes";


const iconGradients: Record<IProductListItem["color"], string> = {
    rose: "linear-gradient(135deg, #f43f5e, #e11d48)",
    teal: "linear-gradient(135deg, #14b8a6, #0d9488)",
    blue: "linear-gradient(135deg, #0ea5e9, #0284c7)",
    amber: "linear-gradient(135deg, #f59e0b, #d97706)",
    indigo: "linear-gradient(135deg, #6366f1, #4f46e5)",
    emerald: "linear-gradient(135deg, #10b981, #059669)",
};


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



const fmt = (n: number) => n.toLocaleString("en-US");

const defaultHideableColumns: Record<HideableColumnKey, boolean> = {
    npis: true,
    emails: true,
    phones: true,
    faxes: true,
};

interface IProductListMainView {
    products: ProductCatalogItem[];
}

const ProductListMainView = (props: IProductListMainView) => {
    const { products } = props
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

    const mappedProducts = useMemo(() => {
        return products.map((item, index) => {
            const tags = ["verified"];
            if (item.stats.totalContacts >= 50000) {
                tags.push("hot", "popular");
            } else if (item.stats.totalContacts >= 10000) {
                tags.push("popular");
            }

            const colorKeys = ["rose", "teal", "blue", "amber", "indigo", "emerald"];
            const color = colorKeys[index % colorKeys.length] as any;

            return {
                id: item.stateId || item.slug,
                slug: item.slug,
                name: item.productName,
                npis: item.stats.totalContacts,
                emails: item.stats.verifiedEmails,
                phones: item.stats.directPhones,
                faxes: item.stats.facilityCount,
                color,
                tags,
                cat: item.stateName || "Specialists",
            } as IProductListItem;
        });
    }, [products]);

    const sortOptions = [
        { value: "default", label: "Sort: Default" },
        { value: "npis-desc", label: "Contacts: Highest -> Lowest" },
        { value: "npis-asc", label: "Contacts: Lowest -> Highest" },
        { value: "name-az", label: "Name: A -> Z" },
        { value: "emails-desc", label: "Emails: Most -> Least" },
    ];

    const chips = useMemo(() => {
        const countFor = (tag: Exclude<FilterKey, "all">) => mappedProducts.filter((d) => d.tags.includes(tag)).length;

        return [
            { key: "all" as const, label: "All", count: mappedProducts.length, icon: <BsGrid3X3GapFill /> },
            { key: "hot" as const, label: "Hot", count: countFor("hot"), icon: <BsFire /> },
            { key: "popular" as const, label: "Popular", count: countFor("popular"), icon: <BsStarFill /> },
            { key: "new" as const, label: "New", count: countFor("new"), icon: <BsStars /> },
            { key: "verified" as const, label: "Verified", count: countFor("verified"), icon: <BsPatchCheck /> },
        ];
    }, [mappedProducts]);

    const statsSummary = useMemo(() => {
        const totalContacts = mappedProducts.reduce((sum, item) => sum + item.npis, 0);
        const emailAddresses = mappedProducts.reduce((sum, item) => sum + item.emails, 0);
        const phoneNumbers = mappedProducts.reduce((sum, item) => sum + item.phones, 0);

        return {
            specialtyLists: mappedProducts.length,
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
        let result = [...mappedProducts];

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
            { key: "npis" as const, label: "Contacts", icon: <BsFileEarmarkFill />, className: styles.colCenter, width: ".75fr" },
            { key: "emails" as const, label: "Emails", icon: <BsEnvelopeFill />, className: styles.colCenter, width: ".75fr" },
            { key: "phones" as const, label: "Phones", icon: <BsTelephoneFill />, className: styles.colCenter, width: ".75fr" },
            { key: "faxes" as const, label: "Facilities", icon: <BsPrinterFill />, className: styles.colCenter, width: ".75fr" },
            { key: "action" as const, label: "Action", icon: null, className: styles.colRight, width: "2fr" },
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