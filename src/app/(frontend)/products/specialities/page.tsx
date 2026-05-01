import { WEBSITE_SEO_TITLE } from "@/shared/constant";
import { productCatalog } from "@/shared/productCatalog";
import { fetchEditorProducts, toCatalogItem } from "@/server/editorProducts";
import ProductListMainView from "@/mainViews/productListMainView/ProductListMainView";

export const metadata = {
    title: `Dentist Email Lists by Specialities | ${WEBSITE_SEO_TITLE}`,
    description:
        "Browse our dentist email lists by specialities, compare stats, and explore dedicated product pages built for SEO and user-friendly navigation.",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/products/specialities`,
    },
};

const ProductSpecialitiesPage = async () => {
    let products = productCatalog;

    try {
        const editorProducts = await fetchEditorProducts();
        if (editorProducts.length > 0) {
            products = editorProducts.map((item: any, index: number) => toCatalogItem(item, index));
        }
    } catch (_error) {
        products = productCatalog;
    }

    return (
        <ProductListMainView
            products={products}
        />
    );
};

export default ProductSpecialitiesPage;
