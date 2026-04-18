import classNames from "classnames";
import type { ChangeEvent } from "react";
import {
    BsArrowClockwise,
    BsCheck2,
    BsFire,
    BsFunnel,
    BsFunnelFill,
    BsGrid3X3GapFill,
    BsListUl,
    BsPatchCheck,
    BsSearch,
    BsStarFill,
    BsStars,
} from "react-icons/bs";

type ChipItem = {
    key: string;
    label: string;
    count: number;
    icon: React.ReactNode;
};

type HideableColumn = {
    key: string;
    label: string;
};

type TagMeta = Record<string, { lbl: string }>;

type ProductControlsSectionProps = {
    search: string;
    sort: string;
    view: "grid" | "list";
    filter: string;
    chips: ChipItem[];
    sortOptions: Array<{ value: string; label: string }>;
    hideableColumns: HideableColumn[];
    visibleColumns: Record<string, boolean>;
    isColumnsMenuOpen: boolean;
    filteredCount: number;
    tagMeta: TagMeta;
    defaultVisibleColumns: Record<string, boolean>;
    styles: Record<string, string>;
    onSearchChange: (value: string) => void;
    onSortChange: (value: string) => void;
    onViewChange: (value: "grid" | "list") => void;
    onFilterChange: (value: string) => void;
    onToggleColumnsMenu: () => void;
    onToggleColumnVisibility: (columnKey: string) => void;
    onResetColumns: () => void;
};

const ProductControlsSection = ({
    search,
    sort,
    view,
    filter,
    chips,
    sortOptions,
    hideableColumns,
    visibleColumns,
    isColumnsMenuOpen,
    filteredCount,
    tagMeta,
    styles,
    onSearchChange,
    onSortChange,
    onViewChange,
    onFilterChange,
    onToggleColumnsMenu,
    onToggleColumnVisibility,
    onResetColumns,
}: ProductControlsSectionProps) => {
    return (
        <>
            <div className={classNames(styles.tools)}>
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
                                onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
                            />
                        </div>
                        <select
                            className={styles.select}
                            id="sortSelect"
                            value={sort}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value)}
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
                            onClick={() => onViewChange("list")}
                        >
                            <BsListUl />
                        </button>
                        <button
                            type="button"
                            className={classNames(styles.viewToggleBtn, view === "grid" && styles.active)}
                            id="gridBtn"
                            title="Grid View"
                            onClick={() => onViewChange("grid")}
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
                            onClick={() => onFilterChange(chip.key)}
                        >
                            {chip.icon} {chip.label} <span className={styles.count}>{chip.count}</span>
                        </div>
                    ))}
                    <button
                        type="button"
                        className={classNames(styles.chip, styles.columnsChipBtn, isColumnsMenuOpen && styles.active)}
                        onClick={onToggleColumnsMenu}
                    >
                        <BsListUl /> Columns
                    </button>
                </div>

                <div className={classNames(styles.columnsRow, isColumnsMenuOpen && styles.visible)}>
                    {hideableColumns.map((column) => {
                        const checked = visibleColumns[column.key];

                        return (
                            <button
                                key={column.key}
                                type="button"
                                className={classNames(styles.columnBadge, checked && styles.active)}
                                onClick={() => onToggleColumnVisibility(column.key)}
                            >
                                <BsCheck2 className={styles.columnCheckIcon} /> {column.label || "#"}
                            </button>
                        );
                    })}
                    <button
                        type="button"
                        className={classNames(styles.columnBadge, styles.resetBadge)}
                        onClick={onResetColumns}
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
                                    onClick={() => onFilterChange("all")}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            onFilterChange("all");
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

            <div className={classNames(styles.resultsBar)}>
                <div className={styles.resultsCount}>Showing <strong>{filteredCount}</strong> specialty lists</div>
                <div className={classNames(styles.activeFilterLbl, filter !== "all" && styles.visible)} id="filterLbl">
                    <BsFunnelFill />
                    <span id="filterLblText">Showing {filteredCount} results</span>
                </div>
            </div>
        </>
    );
};

export default ProductControlsSection;
