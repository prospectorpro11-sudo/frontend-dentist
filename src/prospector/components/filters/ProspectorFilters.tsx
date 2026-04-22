import { PROSPECTOR_FILTER_VARIANT_ENUM } from "@/shared/enums";
import styles from "./prospectorFilters.module.scss";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { FaChevronDown, FaFilter, FaIdCard, FaMap, FaMapPin, FaStethoscope, FaVenusMars } from "react-icons/fa6";
import { PROSPECTOR_FILTER_ENDPOINTS } from "@/shared/constant";
import { useProspectorContext } from "@/contexts/ProspectorContext";

const ProspectorFilters = () => {
    const { states, setStates, cities, setCities, zipCodes, setZipCodes, specialties, setSpecialties, licenseStates, setLicenseStates, gender, setGender } = useProspectorContext();

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

    const activeFilterCount = FILTERS.filter(({ filterValues }) => Array.isArray(filterValues) && filterValues.length > 0).length;
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
        .map(({ label, filterValues }) => {
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
            };
        })
        .filter(Boolean) as { label: string; valueText: string }[];

    return (
        <div className={styles.filtSec}>
            <div className={styles.filttop}>
                <div className={styles.ftitle}><div className={styles.fi}><FaFilter /></div><b>Smart Filters</b></div>
                <div className={styles.fcnt}>{activeFilterCount} Active</div>
            </div>

            <div className={styles.chips}>
                {FILTERS.map(({ variant, chipLabel, icon: Icon, filterValues }) => {
                    const selectedCount = Array.isArray(filterValues) ? filterValues.length : 0;
                    const isActive = selectedCount > 0;

                    return (
                        <div key={variant} className={`${styles.chip} ${isActive ? styles.on : ""}`.trim()}>
                            <Icon /> {chipLabel}
                            {isActive && <span className={styles.cnt}>{selectedCount}</span>}
                            <span className={styles.arr}><FaChevronDown /></span>
                        </div>
                    );
                })}
            </div>

            <div className={styles.tags}>
                {activeFilterTags.map(({ label, valueText }) => (
                    <div key={label} className={styles.tag}><b>{label}</b> {valueText} <span className={styles.rx}><FaTimes /></span></div>
                ))}
            </div>
        </div>
    );
};

export default ProspectorFilters;