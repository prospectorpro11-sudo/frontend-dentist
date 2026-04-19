import FreeSample from "@/components/freeSample/FreeSample";
import { PRODUCT_DETAILS_SEED_OBJECT } from "@/shared/seeds/productDetailsSeeds";
import ProductDetailsBanner from "./views/productDetailsBanner/ProductDetailsBanner";
import WhatsIncludedDetails from "./views/whatsIncludedDetails/WhatsIncludedDetails";
import ProductPriceList from "./views/productPriceList/ProductPriceList";
import CustomDentistList from "@/components/customDentistList/CustomDentistList";
import WhyChooseUs from "@/components/whyChooseUs/WhyChooseUs";

const ProductDetailsMainView = () => {
    return (
        <>
            <ProductDetailsBanner />
            <FreeSample {...PRODUCT_DETAILS_SEED_OBJECT.freeSample} />
            <WhatsIncludedDetails />
            <ProductPriceList />
            <CustomDentistList />
            <WhyChooseUs />

        </>
    );
};

export default ProductDetailsMainView;