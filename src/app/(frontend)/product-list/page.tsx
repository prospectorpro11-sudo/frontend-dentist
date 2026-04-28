import { Metadata } from 'next';
import { WEBSITE_SEO_TITLE } from "@/shared/constant";
import ProductListMainView from "@/mainViews/productListMainView/ProductListMainView";

export const metadata: Metadata = {
    title: `Dentist Email Lists & Databases - ${WEBSITE_SEO_TITLE}`,
    description: `Browse our comprehensive collection of verified dentist email lists and healthcare databases. Target professionals by state, city, or specialty.`,
    alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/product-list` },
};

const ProductListPage = () => {
    return (
        <>
            {/* <ProductListMainView /> */}
        </>
    );
};

export default ProductListPage