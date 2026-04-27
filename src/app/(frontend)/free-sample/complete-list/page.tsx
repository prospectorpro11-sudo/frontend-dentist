import { Suspense } from "react";
import { DATABASE_MAIN_TYPES } from "@/shared/enums";
import { WEBSITE_SEO_TITLE } from "@/shared/constant";
import FreeSampleMainView from "@/mainViews/freeSampleMainView/FreeSampleMainView";
import instance from "@/services/baseServices";

export const metadata = {
    title: `Complete Free Sample List – ${WEBSITE_SEO_TITLE}`,
    description: `Access the complete free sample list of nursing professionals from ${WEBSITE_SEO_TITLE}. Get verified healthcare contact data.`,
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/free-sample/complete-list`,
    },
};

export default async function FreeSampleCompleteList() {
    let tableDataSet = null;
    try {
        const response = (await instance.post(`/home`)).data;
        tableDataSet = response
            ? [{ ...response, name: "Complete doctor list" }]
            : null;
    } catch {
        tableDataSet = null;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FreeSampleMainView
                databaseMainTypes={DATABASE_MAIN_TYPES.HOME}
                tableDataSet={tableDataSet}
            />
        </Suspense>
    );
}
