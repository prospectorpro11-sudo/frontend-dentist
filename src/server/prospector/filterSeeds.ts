import cities from "@/seeds/cities.json";
import genders from "@/seeds/genders.json";
import licenseNumberStates from "@/seeds/licenseNumberState.json";
import licenseTypes from "@/seeds/license-types.json";
import officeNames from "@/seeds/officeNames.json";
import specialization from "@/seeds/specialization.json";
import states from "@/seeds/states.json";
import zipCodes from "@/seeds/zip-codes.json";

export type SeedRecord = Record<string, string | number | boolean | null | undefined>;

type FilterConfig = {
    key: string;
    aliases: string[];
    data: SeedRecord[];
};

const FILTER_CONFIGS: FilterConfig[] = [
    { key: "state", aliases: ["state", "states"], data: states as SeedRecord[] },
    { key: "city", aliases: ["city", "cities"], data: cities as SeedRecord[] },
    { key: "zipCode", aliases: ["zip", "zipcode", "zip-code", "zip-codes", "zipCode"], data: zipCodes as SeedRecord[] },
    {
        key: "jobTitle",
        aliases: ["job", "job-title", "jobTitle", "license", "license-type", "licenseType", "licenses"],
        data: licenseTypes as SeedRecord[],
    },
    { key: "specialty", aliases: ["specialty", "specialties", "specialization"], data: specialization as SeedRecord[] },
    { key: "officeName", aliases: ["office", "office-name", "officeName", "office-names"], data: officeNames as SeedRecord[] },
    { key: "gender", aliases: ["gender", "genders"], data: genders as SeedRecord[] },
    {
        key: "licenseState",
        aliases: ["license-state", "licensestate", "license_state", "licensenumberstate"],
        data: licenseNumberStates as SeedRecord[],
    },
];

const normalizeKey = (value: string): string => value.trim().toLowerCase().replace(/[_\s]+/g, "-");

const FILTER_LOOKUP = new Map<string, FilterConfig>();
for (const config of FILTER_CONFIGS) {
    FILTER_LOOKUP.set(normalizeKey(config.key), config);
    for (const alias of config.aliases) {
        FILTER_LOOKUP.set(normalizeKey(alias), config);
    }
}

const normalizeValue = (value: string): string => value.trim().toLowerCase();

const toStringValue = (value: unknown): string => {
    if (typeof value === "string") {
        return value;
    }

    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }

    return "";
};

const SEARCH_KEYS = ["id", "label", "value", "state", "county", "city", "category", "subCategory", "type"] as const;

export const getFilterConfig = (filter: string): FilterConfig | null => {
    if (!filter) {
        return null;
    }

    return FILTER_LOOKUP.get(normalizeKey(filter)) ?? null;
};

export const listFilterDefinitions = () =>
    FILTER_CONFIGS.map((config) => ({
        key: config.key,
        aliases: config.aliases,
        count: config.data.length,
    }));

type ApplyFiltersOptions = {
    state?: string[] | null;
    county?: string[] | null;
    city?: string[] | null;
    search?: string | null;
};

const normalizeArray = (values: string[] | null | undefined): Set<string> => {
    if (!values || values.length === 0) return new Set();
    return new Set(values.map(normalizeValue).filter(Boolean));
};

export const applyFilters = (records: SeedRecord[], options: ApplyFiltersOptions): SeedRecord[] => {
    const normalizedSearch = options.search ? normalizeValue(options.search) : "";
    const stateSet = normalizeArray(options.state);
    const countySet = normalizeArray(options.county);
    const citySet = normalizeArray(options.city);

    return records.filter((record) => {
        if (stateSet.size > 0 && typeof record.state === "string") {
            if (!stateSet.has(normalizeValue(toStringValue(record.state)))) {
                return false;
            }
        }

        if (countySet.size > 0 && typeof record.county === "string") {
            if (!countySet.has(normalizeValue(toStringValue(record.county)))) {
                return false;
            }
        }

        if (citySet.size > 0 && typeof record.city === "string") {
            if (!citySet.has(normalizeValue(toStringValue(record.city)))) {
                return false;
            }
        }

        if (!normalizedSearch) {
            return true;
        }

        return SEARCH_KEYS.some((key) => normalizeValue(toStringValue(record[key])).includes(normalizedSearch));
    });
};

const getCandidateValues = (record: SeedRecord): string[] => {
    return [record.value, record.id, record.label]
        .map((item) => normalizeValue(toStringValue(item)))
        .filter(Boolean);
};

export const findByValues = (records: SeedRecord[], values: string[]): SeedRecord[] => {
    if (!values.length) {
        return [];
    }

    const normalizedValues = new Set(values.map((item) => normalizeValue(item)).filter(Boolean));

    return records.filter((record) =>
        getCandidateValues(record).some((candidate) => normalizedValues.has(candidate))
    );
};

