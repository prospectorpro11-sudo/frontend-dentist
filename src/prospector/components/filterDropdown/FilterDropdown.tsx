"use client";

import { CSSProperties, Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FaSearch, FaTimes } from "react-icons/fa";

import styles from "./filterDropdown.module.scss";
import { internalApi } from "@/services/baseServices";
import { IProspectorFilter } from "@/shared/interface";

const PAGE_SIZE = 100;

type FilterDropdownProps = {
    title: string;
    searchPlaceholder: string;
    api: string;
    filterValues: IProspectorFilter[] | null;
    setFilterValues: Dispatch<SetStateAction<IProspectorFilter[] | null>>;
    onClose: () => void;
    state?: string[];
    county?: string[];
    city?: string[];
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

const FilterDropdown = ({
    title,
    searchPlaceholder,
    api,
    filterValues,
    setFilterValues,
    onClose,
    state,
    county,
    city,
    position,
}: FilterDropdownProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const optionsRef = useRef<HTMLDivElement | null>(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

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

    const stateKey = state?.length ? state.join(",") : null;
    const countyKey = county?.length ? county.join(",") : null;
    const cityKey = city?.length ? city.join(",") : null;

    const {
        data,
        isPending,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
    } = useInfiniteQuery<FilterPage>({
        queryKey: ["prospector-filter-dropdown", api, debouncedSearch || null, stateKey, countyKey, cityKey],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const params = new URLSearchParams({
                page: String(pageParam),
                limit: String(PAGE_SIZE),
            });

            if (debouncedSearch) {
                params.set("search", debouncedSearch);
            }

            state?.forEach((value) => params.append("state", value));
            county?.forEach((value) => params.append("county", value));
            city?.forEach((value) => params.append("city", value));

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