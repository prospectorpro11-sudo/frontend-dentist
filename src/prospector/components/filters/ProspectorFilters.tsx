import styles from "./prospectorFilters.module.scss";
import { internalApi } from "@/services/baseServices";
import { IProspectorFilter } from "@/shared/interface";
import { useQueryClient } from "@tanstack/react-query";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import EmailAvailability from "./views/EmailAvailability";
import FilterDropdown from "../filterDropdown/FilterDropdown";
import { EMAIL_AVAILABILITY_OPTIONS } from "@/seeds/filterData";
import { PROSPECTOR_FILTER_ENDPOINTS } from "@/shared/constant";
import { PROSPECTOR_FILTER_VARIANT_ENUM } from "@/shared/enums";
import { useProspectorContext } from "@/contexts/ProspectorContext";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaChevronDown, FaFilter, FaIdCard, FaMap, FaMapPin, FaStethoscope, FaVenusMars } from "react-icons/fa6";

const PAGE_SIZE = 100;

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

type AllResponse = {
    success: boolean;
    data?: RawFilterRecord[];
};

type FilterPage = {
    data: IProspectorFilter[];
    page: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
};

const PREFETCH_FILTER_APIS = [
    PROSPECTOR_FILTER_ENDPOINTS.STATE,
    PROSPECTOR_FILTER_ENDPOINTS.CITY,
    PROSPECTOR_FILTER_ENDPOINTS.ZIP_CODE,
    PROSPECTOR_FILTER_ENDPOINTS.SPECIALTY,
    PROSPECTOR_FILTER_ENDPOINTS.LICENSE_STATE,
    PROSPECTOR_FILTER_ENDPOINTS.GENDER,
];

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

const ProspectorFilters = () => {
    const { states, setStates, cities, setCities, zipCodes, setZipCodes, specialties, setSpecialties, licenseStates, setLicenseStates, gender, setGender, emailAvailability, setEmailAvailability } = useProspectorContext();
    const queryClient = useQueryClient();
    const [openVariant, setOpenVariant] = useState<PROSPECTOR_FILTER_VARIANT_ENUM | null>(null);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
    const filtersContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const prefetchFilters = async () => {
            try {
                await queryClient.prefetchQuery({
                    queryKey: ["prospector-filter-states"],
                    queryFn: async () => {
                        const response = await internalApi.get<AllResponse>(`${PROSPECTOR_FILTER_ENDPOINTS.STATE}?all=1`);
                        return response.data;
                    },
                    staleTime: 5 * 60 * 1000,
                });

                await Promise.all(
                    PREFETCH_FILTER_APIS.map((api) =>
                        queryClient.prefetchInfiniteQuery({
                            queryKey: ["prospector-filter-dropdown", api, null, null, null],
                            initialPageParam: 1,
                            queryFn: async ({ pageParam }) => {
                                const params = new URLSearchParams({
                                    page: String(pageParam),
                                    limit: String(PAGE_SIZE),
                                });

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
                                } as FilterPage;
                            },
                            getNextPageParam: (lastPage: FilterPage) => (lastPage.hasNextPage ? lastPage.page + 1 : undefined),
                            staleTime: 5 * 60 * 1000,
                        })
                    )
                );
            } catch {
                // Let dropdown-level queries handle retries/fallback if prefetch fails.
            }
        };

        void prefetchFilters();
    }, [queryClient]);

    const FILTERS = [
        {
            label: 'State',
            chipLabel: 'State',
            icon: FaMap,
            title: 'Select States',
            placeholder: 'State',
            searchPlaceholder: "Search State",
            variant: PROSPECTOR_FILTER_VARIANT_ENUM.STATE,
            api: PROSPECTOR_FILTER_ENDPOINTS.STATE,
            isPopupFilter: false,
            filterValues: states,
            setFilterValues: setStates
        },
        {
            label: 'City',
            chipLabel: 'City',
            icon: FaMapMarkerAlt,
            title: 'Select Cities',
            placeholder: 'City',
            searchPlaceholder: "Search City",
            variant: PROSPECTOR_FILTER_VARIANT_ENUM.CITY,
            api: PROSPECTOR_FILTER_ENDPOINTS.CITY,
            isPopupFilter: true,
            filterValues: cities,
            setFilterValues: setCities
        },
        {
            label: 'Zip Code',
            chipLabel: 'Zip',
            icon: FaMapPin,
            title: 'Select Zip Codes',
            placeholder: 'Zip Code',
            searchPlaceholder: "Search Zip Code",
            variant: PROSPECTOR_FILTER_VARIANT_ENUM.ZIP_CODE,
            api: PROSPECTOR_FILTER_ENDPOINTS.ZIP_CODE,
            isPopupFilter: true,
            filterValues: zipCodes,
            setFilterValues: setZipCodes
        },
        {
            label: 'Specialty',
            chipLabel: 'Specialty',
            icon: FaStethoscope,
            title: 'Select Specialties',
            placeholder: 'Specialty',
            searchPlaceholder: "Search Specialty",
            variant: PROSPECTOR_FILTER_VARIANT_ENUM.SPECIALTY,
            api: PROSPECTOR_FILTER_ENDPOINTS.SPECIALTY,
            isPopupFilter: true,
            filterValues: specialties,
            setFilterValues: setSpecialties
        },
        {
            label: 'License State',
            chipLabel: 'License',
            icon: FaIdCard,
            title: 'Select License States',
            placeholder: 'License State',
            searchPlaceholder: "Search License State",
            variant: PROSPECTOR_FILTER_VARIANT_ENUM.LICENSE_STATE,
            api: PROSPECTOR_FILTER_ENDPOINTS.LICENSE_STATE,
            isPopupFilter: false,
            filterValues: licenseStates,
            setFilterValues: setLicenseStates
        },
        {
            label: 'Gender',
            chipLabel: 'Gender',
            icon: FaVenusMars,
            title: 'Select Genders',
            placeholder: 'Gender',
            searchPlaceholder: "Search Gender",
            variant: PROSPECTOR_FILTER_VARIANT_ENUM.GENDER,
            api: PROSPECTOR_FILTER_ENDPOINTS.GENDER,
            isPopupFilter: false,
            filterValues: gender,
            setFilterValues: setGender
        },
    ]

    const activeFilterCount = FILTERS.filter(({ filterValues }) => Array.isArray(filterValues) && filterValues.length > 0).length + (emailAvailability?.value !== "all" ? 1 : 0);
    const openFilter = FILTERS.find(({ variant }) => variant === openVariant) ?? null;
    const getDisplayValue = (value: unknown): string => {
        if (typeof value === "string" || typeof value === "number") {
            return String(value);
        }

        if (value && typeof value === "object") {
            const option = value as { label?: unknown; name?: unknown; value?: unknown };
            const candidate = option.label ?? option.name ?? option.value;
            return typeof candidate === "string" || typeof candidate === "number" ? String(candidate) : "";
        }

        return "";
    };

    const activeFilterTags = FILTERS
        .map(({ label, filterValues, setFilterValues }) => {
            const values = Array.isArray(filterValues) ? filterValues : [];
            const displayValues = values.map(getDisplayValue).filter(Boolean);

            if (displayValues.length === 0) {
                return null;
            }

            const visibleValues = displayValues.slice(0, 3).join(", ");
            const remainingCount = displayValues.length - 3;
            const suffix = remainingCount > 0 ? ` +${remainingCount} more` : "";

            return {
                label,
                valueText: `${visibleValues}${suffix}`,
                setFilterValues,
            };
        })
        .filter(Boolean) as {
            label: string;
            valueText: string;
            setFilterValues: Dispatch<SetStateAction<null>>;
        }[];

    return (
        <div ref={filtersContainerRef} className={`${styles.filtSec} ${openFilter ? styles.filtSecOpen : ""}`.trim()}>
            <div className={styles.filttop}>
                <div className={styles.ftitle}><div className={styles.fi}><FaFilter /></div><b>Smart Filters</b></div>
                {activeFilterCount > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className={styles.fcnt}>{activeFilterCount} Active</div>
                        <button type="button" className={styles.resetBtn} onClick={() => {
                            FILTERS.forEach(f => f.setFilterValues(null));
                            setEmailAvailability(EMAIL_AVAILABILITY_OPTIONS[0]);
                        }}>Reset</button>
                    </div>
                )}
            </div>
            <div className={styles.chips}>
                <EmailAvailability />
                {FILTERS.map(({ variant, chipLabel, icon: Icon, filterValues }) => {
                    const selectedCount = Array.isArray(filterValues) ? filterValues.length : 0;
                    const isActive = selectedCount > 0;
                    const isOpen = openVariant === variant;

                    return (
                        <button
                            key={variant}
                            type="button"
                            className={`${styles.chip} ${isActive ? styles.on : ""}`.trim()}
                            onClick={(event) => {
                                const isClosing = openVariant === variant;
                                if (isClosing) {
                                    setOpenVariant(null);
                                    setDropdownPosition(null);
                                    return;
                                }

                                const containerRect = filtersContainerRef.current?.getBoundingClientRect();
                                const chipRect = event.currentTarget.getBoundingClientRect();

                                if (containerRect) {
                                    const dropdownWidth = 350;
                                    const spacing = 10;
                                    const chipCenter = chipRect.left - containerRect.left + (chipRect.width / 2);
                                    const rawLeft = chipCenter - (dropdownWidth / 2);
                                    const maxLeft = Math.max(spacing, containerRect.width - dropdownWidth - spacing);
                                    const clampedLeft = Math.min(Math.max(rawLeft, spacing), maxLeft);
                                    const top = chipRect.bottom - containerRect.top + 8;

                                    setDropdownPosition({ top, left: clampedLeft });
                                }

                                setOpenVariant(variant);
                            }}
                        >
                            <Icon /> {chipLabel}
                            {isActive && <span className={styles.cnt}>{selectedCount}</span>}
                            <span className={styles.arr} style={{ transform: isOpen ? "rotate(180deg)" : "none" }}><FaChevronDown /></span>
                        </button>
                    );
                })}
            </div>

            {openFilter && (
                <FilterDropdown
                    title={openFilter.label}
                    variant={openFilter.variant}
                    searchPlaceholder={openFilter.searchPlaceholder}
                    api={openFilter.api}
                    filterValues={openFilter.filterValues}
                    setFilterValues={openFilter.setFilterValues}
                    onClose={() => {
                        setOpenVariant(null);
                        setDropdownPosition(null);
                    }}
                    position={dropdownPosition}
                />
            )}

            <div className={styles.tags}>
                {activeFilterTags.map(({ label, valueText, setFilterValues }) => (
                    <div key={label} className={styles.tag}><b>{label}</b> {valueText} <span className={styles.rx} onClick={() => setFilterValues(null)}><FaTimes /></span></div>
                ))}
            </div>
        </div>
    );
};

export default ProspectorFilters;