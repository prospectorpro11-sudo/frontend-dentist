import { DATABASE_MAIN_TYPES } from "@/shared/enums";
import { WEBSITE_SEO_TITLE } from "@/shared/constant";
import FreeSampleMainView from "@/mainViews/freeSampleMainView/FreeSampleMainView";
import instance from "@/services/baseServices";

export const metadata = {
  title: `Free Sample by Specialists – ${WEBSITE_SEO_TITLE}`,
  description: `Download free sample lists of dental specialists from ${WEBSITE_SEO_TITLE}. Browse by job title and get verified healthcare data.`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/free-sample/specialists`,
  },
};

export default async function FreeSampleByJobTitles() {
  let tableDataSet = null;
  try {
    const response = (await instance.post(`/jobTitleProduct`)).data;
    tableDataSet = response || null;
  } catch {
    tableDataSet = null;
  }

  return (
    <FreeSampleMainView
      databaseMainTypes={DATABASE_MAIN_TYPES.JOB_TITLE}
      tableDataSet={tableDataSet}
      searchPlaceHolder="Search Sample by Specialists"
    />
  );
}
