import { DATABASE_MAIN_TYPES } from "@/shared/enums";
import { WEBSITE_SEO_TITLE } from "@/shared/constant";
import FreeSampleMainView from "@/mainViews/freeSampleMainView/FreeSampleMainView";
import instance from "@/services/baseServices";

export const metadata = {
  title: `Free Sample – ${WEBSITE_SEO_TITLE}`,
  description: `Download free sample nursing professional contact lists from ${WEBSITE_SEO_TITLE}. Browse by state and get verified healthcare data.`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/free-sample`,
  },
};

export default async function FreeSample() {
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
