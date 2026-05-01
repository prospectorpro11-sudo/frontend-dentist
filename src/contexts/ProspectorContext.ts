"use client";
import { IProspectorData, IProspectorFilter, IProspectorStats } from "@/shared/interface";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type ProspectorContextValue = {
    stats: IProspectorStats | null;
    setStats: Dispatch<SetStateAction<IProspectorStats | null>>
    data: IProspectorData[] | null;
    setData: Dispatch<SetStateAction<IProspectorData[] | null>>;
    prospectorLoading: boolean;
    setProspectorLoading: Dispatch<SetStateAction<boolean>>;
    states: IProspectorFilter[] | null;
    setStates: Dispatch<SetStateAction<IProspectorFilter[] | null>>;
    gender: IProspectorFilter[] | null;
    setGender: Dispatch<SetStateAction<IProspectorFilter[] | null>>;
    cities: IProspectorFilter[] | null;
    setCities: Dispatch<SetStateAction<IProspectorFilter[] | null>>;
    zipCodes: IProspectorFilter[] | null;
    setZipCodes: Dispatch<SetStateAction<IProspectorFilter[] | null>>;
    specialties: IProspectorFilter[] | null;
    setSpecialties: Dispatch<SetStateAction<IProspectorFilter[] | null>>;
    licenseStates: IProspectorFilter[] | null;
    setLicenseStates: Dispatch<SetStateAction<IProspectorFilter[] | null>>;
    emailAvailability: IProspectorFilter;
    setEmailAvailability: Dispatch<SetStateAction<IProspectorFilter>>;
    isPopupFilterOpen: boolean;
    setIsPopupFilterOpen: Dispatch<SetStateAction<boolean>>;
    filtersEmpty: boolean;
    price: number;
    setPrice: Dispatch<SetStateAction<number>>;
    isProspectorLocked: boolean;
    setIsProspectorLocked: Dispatch<SetStateAction<boolean>>;
};

export const ProspectorContext = createContext<ProspectorContextValue | undefined>(undefined);

export const useProspectorContext = (): ProspectorContextValue => {
    const context = useContext(ProspectorContext);

    if (!context) {
        throw new Error("useProspectorContext must be used within a Prospector Provider");
    }

    return context;
};
