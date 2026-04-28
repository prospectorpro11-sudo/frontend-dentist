import { DATABASE_MAIN_TYPES } from "@/shared/enums";
import { WEBSITE_SEO_TITLE } from "@/shared/constant";
import FreeSampleMainView from "@/mainViews/freeSampleMainView/FreeSampleMainView";
import instance from "@/services/baseServices";

export const metadata = {
  title: `Free Sample by States – ${WEBSITE_SEO_TITLE}`,
  description: `Download free sample lists of dental professionals by state from ${WEBSITE_SEO_TITLE}. Get verified healthcare contact data.`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/free-sample/states`,
  },
};

export default async function FreeSampleByStates() {
  let tableDataSet = null;
  try {
    const response = (await instance.post(`/stateProduct`)).data;
    tableDataSet = response || null;
  } catch {
    tableDataSet = null;
  }

  return (
    <FreeSampleMainView
      databaseMainTypes={DATABASE_MAIN_TYPES.STATES}
      tableDataSet={tableDataSet}
      searchPlaceHolder="Search Sample by State"
    />
  );
}
