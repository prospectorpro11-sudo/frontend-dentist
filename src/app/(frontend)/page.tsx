import HomeMainView from "@/mainViews/homeMainView/HomeMainView";
import { WEBSITE_SEO_TITLE } from "@/shared/constant";

export const metadata = {
    title: `2026 Updated Dentist Email List - ${WEBSITE_SEO_TITLE}`,
    description: `2026 updated dentist email list with verified contacts of dentists and dental professionals. Free sample available before purchase.`,
    alternates: { canonical: process.env.NEXT_PUBLIC_BASE_URL },
};

export default function Home() {
    return <HomeMainView />;
}
