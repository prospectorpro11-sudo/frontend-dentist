'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import styles from "./prospectorMainView.module.scss";
import { useRootContext } from "@/contexts/RootContext";
import { handleApiError } from "@/shared/InternalService";
import { prospectorInstance } from "@/services/baseServices";
import { useProspectorContext } from "@/contexts/ProspectorContext";
import { useBuildFilterList } from "@/shared/hooks/useBuildFilterList";
import ProspectorFilters from "@/prospector/components/filters/ProspectorFilters";
import ProspectorStats from "@/prospector/components/prospectorStats/ProspectorStats";
import ProspectorDataTable from "@/prospector/components/dataTable/ProspectorDataTable";
import ProspectorAddToCart from "@/prospector/components/prospectorAddToCart/ProspectorAddToCart";
import ProspectorLockedModal from "@/prospector/components/prospectorLockedModal/ProspectorLockedModal";

const PROSPECTOR_PAGE_ACCESS_LIMIT = 3;

const ProspectorMainView = () => {
    const { filterList, query } = useBuildFilterList();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { setProspectorLoading, setData, setStats } = useProspectorContext();
    const { loggedInUser } = useRootContext();
    const router = useRouter();
    useEffect(() => {
        const qs = new URLSearchParams(query).toString();
        router.push(`/prospector${qs ? `?${qs}` : ""}`);
    }, [query, router]);

    const queryKey = [
        "prospectors",
        currentPage,
        loggedInUser ? "loggedin" : "loggedout",
        // sortConfig,
        filterList
    ]

    const fetchProspectorsData = async () => {
        const hasSpecialization = filterList.some(
            ({ field, value }) =>
                field.trim().toLowerCase() === "specialization" &&
                typeof value === "string" &&
                value.trim().length > 0
        );

        const requestFilterList = hasSpecialization
            ? filterList
            : [...filterList, { field: "Specialization", value: "Dentist" }];

        const response = await prospectorInstance.post("/dentist/public/getDataByConditions", {
            filterList: requestFilterList,
            page: currentPage,
        });

        if (response.data.error) {
            throw new Error(response.data.error);
        }

        return response.data;
    };

    const { data: prospectorData, isLoading, isFetched, isFetching, isError, error } = useQuery({
        queryKey: queryKey,
        queryFn: fetchProspectorsData,
        enabled: true,
    })

    useEffect(() => {
        if (isError && error) {
            handleApiError(error, "Failed to fetch prospectors");
        }
    }, [isError, error]);

    useEffect(() => {
        if (!isFetched || !prospectorData) return;

        const data = prospectorData.selectedRealtorItem;
        if (!data) return;

        setData(data.dataResult);

        if (data.countResult) {
            setStats(data.countResult[0]);
        } else {
            console.log("Something went wrong")
        }
    }, [isFetched, prospectorData, setData, setStats]);

    useEffect(() => {
        setProspectorLoading(isLoading || isFetching);
    }, [isFetching, isLoading, setProspectorLoading]);

    return (
        <div className={styles.mainView}>
            <div className={styles.statsCheckout}>
                <ProspectorStats />
                <ProspectorAddToCart />
            </div>
            <ProspectorFilters />
            <div className={styles.tableSlot}>
                <ProspectorDataTable
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    pageAccessLimit={PROSPECTOR_PAGE_ACCESS_LIMIT}
                />
            </div>
            <ProspectorLockedModal />
        </div>
    );
};

export default ProspectorMainView;
