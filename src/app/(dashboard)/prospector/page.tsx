import { IProspectorFilter } from "@/shared/interface";
import ProspectorProvider from "@/contexts/ProspectorProvider";
import ProspectorMainView from "@/prospector/mainViews/prospectorMainView/ProspectorMainView";
import { parseCityParam, parseGenericParam, parseStateParam, parseZipParam } from "@/shared/utils";

const resolveFilter = async (filterKey: string, values: string[]): Promise<IProspectorFilter[]> => {
    if (!values.length) return [];
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/prospector/filters/${filterKey}?values=${values.join(",")}`;
    try {
        const res = await fetch(url, { cache: "force-cache" });
        if (!res.ok) return [];
        const json = await res.json();
        if (!json.success) return [];
        // API returns array when >1 value, single object when exactly 1
        return Array.isArray(json.data) ? json.data : json.data ? [json.data] : [];
    } catch {
        return [];
    }
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const ProspectorPage = async ({ searchParams }: { searchParams: SearchParams }) => {
    const params = await searchParams;
    const get = (key: string) => {
        const val = params[key];
        return typeof val === "string" ? val : "";
    };

    const [states, cities, zipCodes, specialties, licenseStates, gender] = await Promise.all([
        resolveFilter("state", get("state") ? parseStateParam(get("state")) : []),
        resolveFilter("city", get("city") ? parseCityParam(get("city")) : []),
        resolveFilter("zipCode", get("zip") ? parseZipParam(get("zip")) : []),
        resolveFilter("specialty", get("specialty") ? parseGenericParam(get("specialty")) : []),
        resolveFilter("licenseState", get("licensestate") ? parseGenericParam(get("licensestate")) : []),
        resolveFilter("gender", get("gender") ? parseGenericParam(get("gender")) : []),
    ]);

    return (

        <ProspectorProvider initialFilters={{ states, cities, zipCodes, specialties, licenseStates, gender }}>

            <ProspectorMainView />
        </ProspectorProvider>
    );
};

export default ProspectorPage;