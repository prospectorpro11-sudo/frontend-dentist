import { Metadata } from 'next';
import { WEBSITE_SEO_TITLE } from "@/shared/constant";

export const metadata: Metadata = {
    title: `My Downloads - ${WEBSITE_SEO_TITLE}`,
    description: `Access and download your purchased dentist email lists and healthcare databases.`,
    alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/my-downloads` },
};

export default function MyDownloadsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
