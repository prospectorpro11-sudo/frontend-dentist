import FreeSample from "@/components/freeSample/FreeSample";
import { PRODUCT_DETAILS_SEED_OBJECT } from "@/shared/seeds/productDetailsSeeds";
import ProductDetailsBanner from "./views/productDetailsBanner/ProductDetailsBanner";

const ProductDetailsMainView = () => {
    return (
        <>
            <ProductDetailsBanner />
            <FreeSample {...PRODUCT_DETAILS_SEED_OBJECT.freeSample} />

        </>
    );
};

export default ProductDetailsMainView;