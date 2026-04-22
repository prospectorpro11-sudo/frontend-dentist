"use client";

import { CSSProperties, Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { FaSearch, FaTimes } from "react-icons/fa";
import Select, { MultiValue, StylesConfig } from "react-select";

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

type SelectOption = {
    value: string;
    label: string;
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
    const stateSelectOptions = useMemo<SelectOption[]>(() => stateFilterOptions.map((item) => ({ value: item.value, label: item.label })), [stateFilterOptions]);
    const zipCitySelectOptions = useMemo<SelectOption[]>(() => zipCityFilterOptions.map((item) => ({ value: item.value, label: item.label })), [zipCityFilterOptions]);
    const zipStateSelectValue = useMemo(() => stateSelectOptions.filter((item) => zipStateValues.includes(item.value)), [stateSelectOptions, zipStateValues]);
    const cityStateSelectValue = useMemo(() => stateSelectOptions.filter((item) => cityStateValues.includes(item.value)), [stateSelectOptions, cityStateValues]);
    const zipCitySelectValue = useMemo(() => zipCitySelectOptions.filter((item) => zipCityValues.includes(item.value)), [zipCitySelectOptions, zipCityValues]);

    const selectStyles: StylesConfig<SelectOption, true> = {
        control: (base, state) => ({
            ...base,
            minHeight: 38,
            borderRadius: 8,
            borderColor: state.isFocused ? "#3b82f6" : "#c5d0dc",
            boxShadow: state.isFocused ? "0 0 0 3px rgba(59, 130, 246, 0.14)" : "none",
            backgroundColor: "#fff",
            cursor: "text",
        }),
        valueContainer: (base) => ({
            ...base,
            padding: "2px 8px",
            gap: 4,
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: "#e2ecff",
            borderRadius: 6,
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: "#1e3a8a",
            fontSize: 11,
            fontWeight: 600,
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: "#1e3a8a",
            ":hover": {
                backgroundColor: "#c7dbff",
                color: "#1e3a8a",
            },
        }),
        placeholder: (base) => ({
            ...base,
            color: "#94a3b8",
            fontSize: 12,
        }),
        option: (base, state) => ({
            ...base,
            fontSize: 12,
            backgroundColor: state.isSelected ? "#dbeafe" : state.isFocused ? "#eff6ff" : "#fff",
            color: "#334155",
        }),
        menu: (base) => ({
            ...base,
            zIndex: 10030,
        }),
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
            <div className={styles.dropdown} ref={containerRef} style={dropdownStyle}>
                <div className={styles.header}>
                    <h4>{title}</h4>
                    <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close filter dropdown">
                        <FaTimes />
                    </button>
                </div>

                <div className={styles.searchRow}>
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
                                <span>State</span>
                                <Select<SelectOption, true>
                                    isMulti
                                    isClearable={false}
                                    className={styles.auxSelect}
                                    classNamePrefix="aux-select"
                                    styles={selectStyles}
                                    options={stateSelectOptions}
                                    value={isZipFilter ? zipStateSelectValue : cityStateSelectValue}
                                    placeholder="Select State"
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    onChange={(selected: MultiValue<SelectOption>) => {
                                        const nextValues = selected.map((item) => item.value);
                                        if (isZipFilter) {
                                            setZipStateValues(nextValues);
                                            setZipCityValues([]);
                                            return;
                                        }

                                        setCityStateValues(nextValues);
                                    }}
                                />
                            </div>

                            {isZipFilter && (
                                <div className={styles.inlineSelectWrap}>
                                    <span>City</span>
                                    <Select<SelectOption, true>
                                        isMulti
                                        isClearable={false}
                                        className={styles.auxSelect}
                                        classNamePrefix="aux-select"
                                        styles={selectStyles}
                                        options={zipCitySelectOptions}
                                        value={zipCitySelectValue}
                                        placeholder={zipStateValues.length ? "Select City" : "Select State First"}
                                        closeMenuOnSelect={false}
                                        hideSelectedOptions={false}
                                        isDisabled={zipStateValues.length === 0}
                                        onChange={(selected: MultiValue<SelectOption>) => setZipCityValues(selected.map((item) => item.value))}
                                    />
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
                        options.map((option) => {
                            const optionKey = String(option.value || option.id || option.label).toLowerCase();
                            const checked = selectedKeys.has(optionKey);

                            return (
                                <label key={option.id || option.value} className={styles.optionRow}>
                                    <input type="checkbox" checked={checked} onChange={() => toggleSelection(option)} />
                                    <span>{option.label}</span>
                                </label>
                            );
                        })
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