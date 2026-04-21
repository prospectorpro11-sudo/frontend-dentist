import { useProspectorContext } from "@/contexts/ProspectorContext";

export const useResetFilters = () => {
    const { setStates, setCities, setZipCodes, setSpecialties, setLicenseStates, setEmailAvailability } = useProspectorContext();

    const FILTERS = [setStates, setCities, setZipCodes, setSpecialties, setLicenseStates];

    return () => {
        FILTERS.forEach((filter) => {
            filter(null);
        });
        setEmailAvailability({ id: "all-contacts", label: "All", value: "all" });
    };
};
