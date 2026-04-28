import { Metadata } from 'next';
import { WEBSITE_SEO_TITLE } from "@/shared/constant";

export const metadata: Metadata = {
    title: `My Account - ${WEBSITE_SEO_TITLE}`,
    description: `Manage your profile, billing details, and account settings on ${WEBSITE_SEO_TITLE}.`,
    alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/my-account` },
};

export default function MyAccountLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
