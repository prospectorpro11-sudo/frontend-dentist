import { useEffect, useMemo } from "react";
import { IBuilFilteList } from "../interface";

import { MULTI_TO_SINGLE_VALUES } from "../InternalService";
import { useProspectorContext } from "@/contexts/ProspectorContext";

export const useBuildFilterList = (): { filterList: IBuilFilteList[]; query: Record<string, string> } => {
    const { states, cities, zipCodes, specialties, gender, licenseStates, emailAvailability } = useProspectorContext();

    const filterList = useMemo(() => [
        ...(states?.length ? [{ field: "State", value: MULTI_TO_SINGLE_VALUES(states) }] : []),
        ...(cities?.length ? [{ field: "City", value: MULTI_TO_SINGLE_VALUES(cities, "city") }] : []),
        ...(zipCodes?.length ? [{ field: "Zip", value: MULTI_TO_SINGLE_VALUES(zipCodes, "zip") }] : []),
        ...(specialties?.length ? [{ field: "Specialization", value: MULTI_TO_SINGLE_VALUES(specialties) }] : []),
        ...(gender?.length ? [{ field: "Gender", value: MULTI_TO_SINGLE_VALUES(gender) }] : []),
        ...(licenseStates?.length ? [{ field: "LicenseState", value: MULTI_TO_SINGLE_VALUES(licenseStates) }] : []),
        { field: "Email", value: emailAvailability.value },
    ], [states, cities, zipCodes, specialties, gender, licenseStates, emailAvailability]);

    useEffect(() => {
        localStorage.setItem("dentist-prospector", JSON.stringify(filterList));
    }, [filterList]);



    const query = filterList.reduce<Record<string, string>>((acc, { field, value }) => {
        if (typeof value === 'string' && value.length > 0 && !(field === 'Email' && value === 'all')) acc[field.toLowerCase()] = value;
        return acc;
    }, {});

    return { filterList, query };
};
