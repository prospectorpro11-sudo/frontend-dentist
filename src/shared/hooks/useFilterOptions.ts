import { useInfiniteQuery } from "@tanstack/react-query";

import { FilterOption } from "@/shared/types";
import { internalApi } from "@/services/baseServices";
interface UseFilterOptionsParams {
    api: string;
    state?: string[];
    county?: string[];
    city?: string[];
    search?: string;
}

interface FilterPageResponse {
    success: boolean;
    data: FilterOption[];
    page: number;
    hasNextPage: boolean;
}

export const useFilterOptions = ({ api, state, county, city, search }: UseFilterOptionsParams) => {
    const stateKey = state?.length ? state.join(",") : null;
    const countyKey = county?.length ? county.join(",") : null;
    const cityKey = city?.length ? city.join(",") : null;
    const searchKey = search?.trim() || null;

    const query = useInfiniteQuery<FilterPageResponse>({
        queryKey: ["filterOptions", api, stateKey, countyKey, cityKey, searchKey],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const params = new URLSearchParams({ page: String(pageParam) });
            if (searchKey) params.set("search", searchKey);
            state?.forEach((s) => params.append("state", s));
            county?.forEach((c) => params.append("county", c));
            city?.forEach((c) => params.append("city", c));

            const response = await internalApi.get<FilterPageResponse>(`${api}?${params.toString()}`);
            return response.data;
        },
        getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000,
    });

    const options = query.data?.pages.flatMap((page) => page.data) ?? [];

    return { ...query, options };
};
