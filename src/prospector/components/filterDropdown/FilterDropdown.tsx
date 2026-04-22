"use client";

import { CSSProperties, Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { FaSearch, FaTimes } from "react-icons/fa";
import { FaChevronDown, FaMap } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

import styles from "./filterDropdown.module.scss";
import { internalApi } from "@/services/baseServices";
import { IProspectorFilter } from "@/shared/interface";
import { PROSPECTOR_FILTER_VARIANT_ENUM } from "@/shared/enums";
import { PROSPECTOR_FILTER_ENDPOINTS } from "@/shared/constant";

const PAGE_SIZE = 100;

type FilterDropdownProps = {
    title: string;
    variant: PROSPECTOR_FILTER_VARIANT_ENUM;
    searchPlaceholder: string;
    api: string;
    filterValues: IProspectorFilter[] | null;
    setFilterValues: Dispatch<SetStateAction<IProspectorFilter[] | null>>;
    onClose: () => void;
    position?: {
        top: number;
        left: number;
    } | null;
};

type RawFilterRecord = {
    id?: unknown;
    label?: unknown;
    value?: unknown;
    state?: unknown;
    city?: unknown;
    category?: unknown;
    subCategory?: unknown;
};

type RawFilterResponse = {
    success: boolean;
    data?: RawFilterRecord[];
    page?: number;
    total?: number;
    totalPages?: number;
    hasNextPage?: boolean;
};

type FilterPage = {
    data: IProspectorFilter[];
    page: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
};

type AllResponse = {
    success: boolean;
    data?: RawFilterRecord[];
};

const toText = (value: unknown): string => {
    if (typeof value === "string" || typeof value === "number") {
        return String(value);
    }

    return "";
};

const toOption = (item: RawFilterRecord): IProspectorFilter | null => {
    const value = toText(item.value ?? item.id ?? item.label);
    const label = toText(item.label ?? item.value ?? item.id);
    const id = toText((item.id ?? value) || label);

    if (!value || !label || !id) {
        return null;
    }

    return {
        id,
        label,
        value,
        state: toText(item.state),
        city: toText(item.city),
        category: toText(item.category),
        subCategory: toText(item.subCategory),
    };
};

const toUniqueOptions = (rows: RawFilterRecord[] | undefined): IProspectorFilter[] => {
    const mapped = (rows ?? [])
        .map((item) => toOption(item))
        .filter((item): item is IProspectorFilter => Boolean(item));

    const unique = new Map<string, IProspectorFilter>();
    for (const item of mapped) {
        const key = String(item.value || item.id || item.label).toLowerCase();
        if (!key || unique.has(key)) {
            continue;
        }

        unique.set(key, item);
    }

    return Array.from(unique.values());
};

const FilterDropdown = ({
    title,
    variant,
    searchPlaceholder,
    api,
    filterValues,
    setFilterValues,
    onClose,
    position,
}: FilterDropdownProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const optionsRef = useRef<HTMLDivElement | null>(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [zipStateValues, setZipStateValues] = useState<string[]>([]);
    const [zipCityValues, setZipCityValues] = useState<string[]>([]);
    const [cityStateValues, setCityStateValues] = useState<string[]>([]);
    const [openAuxDropdown, setOpenAuxDropdown] = useState<"state" | "city" | null>(null);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebouncedSearch(search.trim());
        }, 250);

        return () => window.clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const handleOutsideClick = (event: PointerEvent) => {
            const target = event.target as Node | null;
            if (!target) {
                return;
            }

            if (containerRef.current && !containerRef.current.contains(target)) {
                onClose();
            }
        };

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("pointerdown", handleOutsideClick, true);
        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("pointerdown", handleOutsideClick, true);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    const isZipFilter = variant === PROSPECTOR_FILTER_VARIANT_ENUM.ZIP_CODE;
    const isCityFilter = variant === PROSPECTOR_FILTER_VARIANT_ENUM.CITY;
    const effectiveState = isZipFilter ? zipStateValues : isCityFilter ? cityStateValues : [];
    const effectiveCity = isZipFilter ? (zipStateValues.length > 0 ? zipCityValues : []) : [];
    const stateKey = effectiveState.length ? effectiveState.join(",") : null;
    const cityKey = effectiveCity.length ? effectiveCity.join(",") : null;

    const { data: stateFilterOptionsData } = useQuery<AllResponse>({
        queryKey: ["prospector-filter-states"],
        queryFn: async () => {
            const response = await internalApi.get<AllResponse>(`${PROSPECTOR_FILTER_ENDPOINTS.STATE}?all=1`);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    const { data: zipCityFilterOptionsData } = useQuery<AllResponse>({
        queryKey: ["prospector-filter-cities", stateKey],
        queryFn: async () => {
            const params = new URLSearchParams({ all: "1" });
            zipStateValues.forEach((value) => params.append("state", value));

            const response = await internalApi.get<AllResponse>(`${PROSPECTOR_FILTER_ENDPOINTS.CITY}?${params.toString()}`);
            return response.data;
        },
        enabled: isZipFilter && zipStateValues.length > 0,
        staleTime: 5 * 60 * 1000,
    });

    const stateFilterOptions = useMemo(() => toUniqueOptions(stateFilterOptionsData?.data), [stateFilterOptionsData?.data]);
    const zipCityFilterOptions = useMemo(() => toUniqueOptions(zipCityFilterOptionsData?.data), [zipCityFilterOptionsData?.data]);
    const selectedStateValues = isZipFilter ? zipStateValues : cityStateValues;
    const selectedStateCount = selectedStateValues.length;
    const selectedCityCount = zipCityValues.length;
    const selectedStateSet = useMemo(() => new Set(selectedStateValues.map((item) => item.toLowerCase())), [selectedStateValues]);
    const selectedCitySet = useMemo(() => new Set(zipCityValues.map((item) => item.toLowerCase())), [zipCityValues]);

    const toggleStateValue = (value: string) => {
        if (isZipFilter) {
            setZipStateValues((prev) => {
                const hasValue = prev.includes(value);
                return hasValue ? prev.filter((item) => item !== value) : [...prev, value];
            });
            setZipCityValues([]);
            return;
        }

        setCityStateValues((prev) => {
            const hasValue = prev.includes(value);
            return hasValue ? prev.filter((item) => item !== value) : [...prev, value];
        });
    };

    const toggleZipCityValue = (value: string) => {
        setZipCityValues((prev) => {
            const hasValue = prev.includes(value);
            return hasValue ? prev.filter((item) => item !== value) : [...prev, value];
        });
    };

    const {
        data,
        isPending,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
    } = useInfiniteQuery<FilterPage>({
        queryKey: ["prospector-filter-dropdown", api, debouncedSearch || null, stateKey, cityKey],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const params = new URLSearchParams({
                page: String(pageParam),
                limit: String(PAGE_SIZE),
            });

            if (debouncedSearch) {
                params.set("search", debouncedSearch);
            }

            effectiveState.forEach((value) => params.append("state", value));
            effectiveCity.forEach((value) => params.append("city", value));

            const response = await internalApi.get<RawFilterResponse>(`${api}?${params.toString()}`);
            const raw = response.data ?? {};
            const page = Number(raw.page ?? pageParam) || 1;
            const totalPages = Math.max(1, Number(raw.totalPages ?? page));
            const hasNextPage = Boolean(raw.hasNextPage) || page < totalPages;
            const rows = Array.isArray(raw.data) ? raw.data : [];

            const mapped = rows
                .map((item) => toOption(item))
                .filter((item): item is IProspectorFilter => Boolean(item));

            return {
                data: mapped,
                page,
                total: Number(raw.total ?? mapped.length) || 0,
                totalPages,
                hasNextPage,
            };
        },
        getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.page + 1 : undefined),
        staleTime: 5 * 60 * 1000,
    });

    const options = useMemo(() => {
        const merged = data?.pages.flatMap((page) => page.data) ?? [];
        const unique = new Map<string, IProspectorFilter>();

        for (const item of merged) {
            const key = String(item.value || item.id || item.label).toLowerCase();
            if (!key || unique.has(key)) {
                continue;
            }

            unique.set(key, item);
        }

        return Array.from(unique.values());
    }, [data]);

    const selectedKeys = useMemo(() => {
        const values = filterValues ?? [];
        return new Set(values.map((item) => String(item.value || item.id || item.label).toLowerCase()));
    }, [filterValues]);

    const totalFound = data?.pages[0]?.total ?? options.length;
    const selectedCount = filterValues?.length ?? 0;

    const toggleSelection = (option: IProspectorFilter) => {
        const current = filterValues ?? [];
        const optionKey = String(option.value || option.id || option.label).toLowerCase();
        const exists = current.some((item) => String(item.value || item.id || item.label).toLowerCase() === optionKey);

        if (exists) {
            const nextValues = current.filter((item) => String(item.value || item.id || item.label).toLowerCase() !== optionKey);
            setFilterValues(nextValues);
            return;
        }

        setFilterValues([...current, option]);
    };

    const clearAll = () => {
        setFilterValues([]);
    };

    const handleListScroll = () => {
        if (!optionsRef.current || !hasNextPage || isFetchingNextPage) {
            return;
        }

        const { scrollTop, clientHeight, scrollHeight } = optionsRef.current;
        if (scrollHeight - scrollTop - clientHeight < 40) {
            fetchNextPage();
        }
    };

    const dropdownStyle: CSSProperties | undefined = position
        ? { top: `${position.top}px`, left: `${position.left}px` }
        : undefined;

    return (
        <div className={styles.overlay}>
            <div className={`${styles.dropdown} ${isZipFilter ? styles.dropdownZip : ""}`.trim()} ref={containerRef} style={dropdownStyle}>
                <div className={styles.header}>
                    <h4>{title}</h4>
                    <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close filter dropdown">
                        <FaTimes />
                    </button>
                </div>

                <div
                    className={`${styles.searchRow} ${isZipFilter
                        ? styles.searchRowThree
                        : isCityFilter
                            ? styles.searchRowTwo
                            : styles.searchRowSingle
                        }`.trim()}
                >
                    <div className={styles.searchWrap}>
                        <FaSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder={`${searchPlaceholder}...`}
                            aria-label={`Search ${title}`}
                        />
                    </div>

                    {(isCityFilter || isZipFilter) && (
                        <div className={styles.inlineFilters}>
                            <div className={styles.inlineSelectWrap}>
                                <button
                                    type="button"
                                    className={styles.inlineTrigger}
                                    onClick={() => setOpenAuxDropdown((prev) => (prev === "state" ? null : "state"))}
                                >
                                    <span className={styles.inlineTriggerLabel}><FaMap /> State</span>
                                    {selectedStateCount > 0 && <span className={styles.inlineCount}>{selectedStateCount}</span>}
                                    <span className={`${styles.inlineArrow} ${openAuxDropdown === "state" ? styles.inlineArrowOpen : ""}`.trim()}><FaChevronDown /></span>
                                </button>

                                {openAuxDropdown === "state" && (
                                    <div className={styles.inlineMenu}>
                                        <div className={styles.inlineMenuList}>
                                            {stateFilterOptions.map((option) => {
                                                const checked = selectedStateSet.has(option.value.toLowerCase());

                                                return (
                                                    <label key={option.id || option.value} className={styles.inlineOptionRow}>
                                                        <input
                                                            type="checkbox"
                                                            checked={checked}
                                                            onChange={() => toggleStateValue(option.value)}
                                                        />
                                                        <span>{option.label}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {isZipFilter && (
                                <div className={styles.inlineSelectWrap}>
                                    <button
                                        type="button"
                                        className={styles.inlineTrigger}
                                        onClick={() => setOpenAuxDropdown((prev) => (prev === "city" ? null : "city"))}
                                        disabled={zipStateValues.length === 0}
                                    >
                                        <span className={styles.inlineTriggerLabel}><FaMapMarkerAlt /> City</span>
                                        {selectedCityCount > 0 && <span className={styles.inlineCount}>{selectedCityCount}</span>}
                                        <span className={`${styles.inlineArrow} ${openAuxDropdown === "city" ? styles.inlineArrowOpen : ""}`.trim()}><FaChevronDown /></span>
                                    </button>

                                    {openAuxDropdown === "city" && zipStateValues.length > 0 && (
                                        <div className={styles.inlineMenu}>
                                            <div className={styles.inlineMenuList}>
                                                {zipCityFilterOptions.map((option) => {
                                                    const checked = selectedCitySet.has(option.value.toLowerCase());

                                                    return (
                                                        <label key={option.id || option.value} className={styles.inlineOptionRow}>
                                                            <input
                                                                type="checkbox"
                                                                checked={checked}
                                                                onChange={() => toggleZipCityValue(option.value)}
                                                            />
                                                            <span>{option.label}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.options} ref={optionsRef} onScroll={handleListScroll}>
                    {isPending ? (
                        <div className={styles.empty}>Loading options...</div>
                    ) : isError ? (
                        <div className={styles.empty}>Failed to load options.</div>
                    ) : options.length === 0 ? (
                        <div className={styles.empty}>No options found.</div>
                    ) : (
                        <div className={isZipFilter ? styles.optionGridZip : undefined}>
                            {options.map((option) => {
                                const optionKey = String(option.value || option.id || option.label).toLowerCase();
                                const checked = selectedKeys.has(optionKey);

                                return (
                                    <label key={option.id || option.value} className={styles.optionRow}>
                                        <input type="checkbox" checked={checked} onChange={() => toggleSelection(option)} />
                                        <span>{option.label}</span>
                                    </label>
                                );
                            })}
                        </div>
                    )}

                    {(isFetchingNextPage || isFetching) && options.length > 0 && (
                        <div className={styles.loadingMore}>Loading more...</div>
                    )}
                </div>

                <div className={styles.footer}>
                    <div>
                        <strong>{selectedCount}</strong> of <strong>{totalFound}</strong> Selected
                    </div>
                    <div>
                        <strong>{totalFound}</strong> Found
                    </div>
                </div>

                <div className={styles.actions}>
                    <button type="button" onClick={clearAll} className={styles.secondaryBtn}>Clear</button>
                    <button type="button" onClick={onClose} className={styles.primaryBtn}>Done</button>
                </div>
            </div>
        </div>
    );
};

export default FilterDropdown;