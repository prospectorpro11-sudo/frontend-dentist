import { NextResponse } from "next/server";
import { listFilterDefinitions } from "@/server/prospector/filterSeeds";

export const GET = async () => {
    return NextResponse.json({
        success: true,
        data: listFilterDefinitions(),
    });
};

