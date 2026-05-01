"use client";
import { ReactNode, useMemo, useState } from "react";

import { ProspectorContext } from "./ProspectorContext";
import { EMAIL_AVAILABILITY_OPTIONS } from "@/seeds/filterData";
import { InitialProspectorFilters, IProspectorData, IProspectorFilter, IProspectorStats } from "@/shared/interface";

type ProspectorProviderProps = {
    children: ReactNode;
    initialFilters?: InitialProspectorFilters;
};

const ProspectorProvider = ({ children, initialFilters }: ProspectorProviderProps) => {
    const [prospectorLoading, setProspectorLoading] = useState<boolean>(true);
    const [stats, setStats] = useState<IProspectorStats | null>(null);
    const [data, setData] = useState<IProspectorData[] | null>(null);
    const [price, setPrice] = useState<number>(0);
    const [states, setStates] = useState<IProspectorFilter[] | null>(initialFilters?.states ?? []);
    const [gender, setGender] = useState<IProspectorFilter[] | null>(initialFilters?.gender ?? []);
    const [cities, setCities] = useState<IProspectorFilter[] | null>(initialFilters?.cities ?? []);
    const [zipCodes, setZipCodes] = useState<IProspectorFilter[] | null>(initialFilters?.zipCodes ?? []);
    const [specialties, setSpecialties] = useState<IProspectorFilter[] | null>(initialFilters?.specialties ?? []);
    const [licenseStates, setLicenseStates] = useState<IProspectorFilter[] | null>(initialFilters?.licenseStates ?? []);
    const [emailAvailability, setEmailAvailability] = useState<IProspectorFilter>(EMAIL_AVAILABILITY_OPTIONS[0]);
    const [isPopupFilterOpen, setIsPopupFilterOpen] = useState<boolean>(false);
    const [isProspectorLocked, setIsProspectorLocked] = useState<boolean>(false);

    const filtersEmpty = useMemo(() => {
        const allArraysEmpty = [states, cities, zipCodes, specialties, licenseStates, gender].every((f) => !f || f.length === 0);
        const emailIsDefault = emailAvailability.value === EMAIL_AVAILABILITY_OPTIONS[0].value;
        return allArraysEmpty && emailIsDefault;
    }, [states, cities, zipCodes, specialties, licenseStates, gender, emailAvailability]);



    const contextValue = useMemo(
        () => ({
            stats,
            setStats,
            data,
            setData,
            prospectorLoading,
            setProspectorLoading,
            states,
            setStates,
            cities,
            setCities,
            zipCodes,
            setZipCodes,
            specialties,
            setSpecialties,
            licenseStates,
            setLicenseStates,
            emailAvailability,
            setEmailAvailability,
            isPopupFilterOpen,
            setIsPopupFilterOpen,
            gender,
            setGender,
            filtersEmpty,
            price,
            setPrice,
            isProspectorLocked,
            setIsProspectorLocked
        }),
        [stats, data, prospectorLoading, states, cities, zipCodes, specialties, licenseStates, emailAvailability, isPopupFilterOpen, gender, filtersEmpty, price, isProspectorLocked]
    );

    return <ProspectorContext.Provider value={contextValue}>{children}</ProspectorContext.Provider>;
};

export default ProspectorProvider;
