import { Metadata } from 'next';
import { WEBSITE_SEO_TITLE } from "@/shared/constant";
import ProductDetailsMainView from '@/mainViews/productDetailsMainView/ProductDetailsMainView';

export const metadata: Metadata = {
    title: `Product Details - ${WEBSITE_SEO_TITLE}`,
    description: `View details, pricing, and sample data for our verified dentist email lists and healthcare databases.`,
    alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/product-details` },
};

const ProductDetailsPage = () => {
    return (
        <>
            {/* <ProductDetailsMainView /> */}
        </>
    );
};

export default ProductDetailsPage;