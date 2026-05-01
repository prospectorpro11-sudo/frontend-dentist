import { Metadata } from 'next';
import { WEBSITE_SEO_TITLE } from "@/shared/constant";

export const metadata: Metadata = {
    title: `Support - ${WEBSITE_SEO_TITLE}`,
    description: `Get help and support for your dentist email lists and healthcare databases on ${WEBSITE_SEO_TITLE}.`,
    alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/support` },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
