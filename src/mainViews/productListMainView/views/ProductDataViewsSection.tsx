import { IProductListItem } from "@/shared/interface";
import classNames from "classnames";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import LogoIcon from "@/components/logoIcon/LogoIcon";
import Link from "next/link";

type TagMeta = Record<string, { lbl: string; cls: string; tcls: string }>;

type HeaderColumn = {
    key: string;
    label: string;
    icon: React.ReactNode;
    className: string;
};

type ProductDataViewsSectionProps = {
    view: "grid" | "list";
    filteredData: IProductListItem[];
    iconGradients: Record<string, string>;
    featured: Set<string>;
    fmt: (n: number) => string;
    tagMeta: TagMeta;
    styles: Record<string, string>;
    visibleListColumns: HeaderColumn[];
    listGridTemplateColumns: string;
};

const ProductDataViewsSection = ({
    view,
    filteredData,
    iconGradients,
    featured,
    fmt,
    tagMeta,
    styles,
    visibleListColumns,
    listGridTemplateColumns,
}: ProductDataViewsSectionProps) => {
    return (
        <>
            {view === "grid" && (
                <div className={styles.grid} id="gridView">
                    {filteredData.length === 0 && <div>No results found.</div>}
                    {filteredData.map((item) => {
                        return (
                            <div
                                key={item.name}
                                className={classNames(styles.card, featured.has(item.name) && styles.featured)}
                            >
                                <div className={styles.cardTop}>
                                    <div className={styles.cardIcon} style={{ background: iconGradients[item.color], position: "relative" }}>
                                        <div className={styles.cardIconGlow}></div>
                                        <LogoIcon width={28} height={28} variant="white" style={{ objectFit: "scale-down" }} />
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
                                                        <LogoIcon width={24} height={24} variant="white" style={{ objectFit: "scale-down" }} />
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
                                            <Link href={`/prospector?specialization=${item.id}`} className={styles.tActionBtn}>
                                                <span>Customize</span>
                                                <span><HiMiniArrowUpRight size={18} /></span>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ProductDataViewsSection;
