import { Metadata } from 'next';
import { WEBSITE_SEO_TITLE } from "@/shared/constant";
import BillingMainView from "@/mainViews/billingMainView/BillingMainView";

export const metadata: Metadata = {
    title: `Billing - ${WEBSITE_SEO_TITLE}`,
    description: `Manage your billing information and view invoices on ${WEBSITE_SEO_TITLE}.`,
    alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/billing` },
};

export default function BillingPage() {
    return (
        <BillingMainView />
    );
}
