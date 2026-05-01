import { Metadata } from 'next';
import { WEBSITE_SEO_TITLE } from "@/shared/constant";
import OrdersMainView from "@/mainViews/ordersMainView/OrdersMainView";

export const metadata: Metadata = {
    title: `Orders - ${WEBSITE_SEO_TITLE}`,
    description: `View your order history and manage purchases on ${WEBSITE_SEO_TITLE}.`,
    alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/orders` },
};

export default function OrdersPage() {
    return (
        <OrdersMainView />
    );
}
