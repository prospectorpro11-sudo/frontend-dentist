import { NextRequest, NextResponse } from "next/server";
import {
    applyFilters,
    findByValues,
    getFilterConfig,
    listFilterDefinitions,
} from "@/server/prospector/filterSeeds";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 500;

const toPositiveInt = (value: string | null, fallback: number): number => {
    const parsed = Number.parseInt(value ?? "", 10);
    if (!Number.isFinite(parsed) || parsed < 1) {
        return fallback;
    }

    return parsed;
};

const toBoolean = (value: string | null): boolean => {
    if (!value) {
        return false;
    }

    const normalized = value.trim().toLowerCase();
    return normalized === "1" || normalized === "true" || normalized === "yes";
};

const getLookupValues = (searchParams: URLSearchParams): string[] => {
    const rawValues: string[] = [];

    const singleValue = searchParams.get("value");
    if (singleValue) {
        rawValues.push(singleValue);
    }

    const valuesParams = searchParams.getAll("values");
    for (const param of valuesParams) {
        rawValues.push(...param.split(","));
    }

    return [...new Set(rawValues.map((item) => item.trim()).filter(Boolean))];
};

const getMultiParam = (searchParams: URLSearchParams, key: string): string[] | null => {
    const all = searchParams.getAll(key);
    if (all.length === 0) return null;

    const values: string[] = [];
    for (const param of all) {
        values.push(...param.split(",").map((v) => v.trim()).filter(Boolean));
    }

    return values.length > 0 ? [...new Set(values)] : null;
};

type RouteContext = {
    params: Promise<{
        filter: string;
    }>;
};

export const GET = async (request: NextRequest, context: RouteContext) => {
    const { filter } = await context.params;
    const config = getFilterConfig(filter);

    if (!config) {
        return NextResponse.json(
            {
                success: false,
                message: "Unsupported filter type.",
                supportedFilters: listFilterDefinitions().map((item) => item.key),
            },
            { status: 404 }
        );
    }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const stateValues = getMultiParam(searchParams, "state");
    const countyValues = getMultiParam(searchParams, "county");
    const cityValues = getMultiParam(searchParams, "city");
    const includeAll = toBoolean(searchParams.get("all"));
    const lookupValues = getLookupValues(searchParams);

    const filteredRecords = applyFilters(config.data, {
        search,
        state: stateValues,
        county: countyValues,
        city: cityValues,
    });

    if (lookupValues.length > 0) {
        const records = findByValues(filteredRecords, lookupValues);

        if (lookupValues.length === 1) {
            return NextResponse.json({
                success: true,
                filter: config.key,
                data: records[0] ?? null,
            });
        }

        return NextResponse.json({
            success: true,
            filter: config.key,
            total: records.length,
            data: records,
        });
    }

    if (includeAll) {
        return NextResponse.json({
            success: true,
            filter: config.key,
            total: filteredRecords.length,
            page: 1,
            limit: filteredRecords.length,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: false,
            data: filteredRecords,
        });
    }

    const page = toPositiveInt(searchParams.get("page"), DEFAULT_PAGE);
    const limit = Math.min(toPositiveInt(searchParams.get("limit"), DEFAULT_LIMIT), MAX_LIMIT);
    const total = filteredRecords.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const end = start + limit;
    const pageData = filteredRecords.slice(start, end);

    return NextResponse.json({
        success: true,
        filter: config.key,
        total,
        page: safePage,
        limit,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPrevPage: safePage > 1,
        data: pageData,
    });
};

