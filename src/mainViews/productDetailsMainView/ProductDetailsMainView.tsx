import FreeSample from "@/components/freeSample/FreeSample";
import { PRODUCT_DETAILS_SEED_OBJECT } from "@/shared/seeds/productDetailsSeeds";
import ProductDetailsBanner from "./views/productDetailsBanner/ProductDetailsBanner";
import WhatsIncludedDetails from "./views/whatsIncludedDetails/WhatsIncludedDetails";
import ProductPriceList from "./views/productPriceList/ProductPriceList";
import CustomDentistList from "@/components/customDentistList/CustomDentistList";
import WhyChooseUs from "@/components/whyChooseUs/WhyChooseUs";
import DentalSpecialtyList from "@/components/dentalSpecialtyList/DentalSpecialtyList";

const ProductDetailsMainView = () => {
    return (
        <>
            <ProductDetailsBanner />
            <FreeSample {...PRODUCT_DETAILS_SEED_OBJECT.freeSample} />
            <WhatsIncludedDetails {...PRODUCT_DETAILS_SEED_OBJECT.whatsIncludedDetailsData} />
            <ProductPriceList {...PRODUCT_DETAILS_SEED_OBJECT.productPriceListData} />
            <CustomDentistList {...PRODUCT_DETAILS_SEED_OBJECT.customDentistListData} />
            <WhyChooseUs {...PRODUCT_DETAILS_SEED_OBJECT.whyChooseUsData} />
            <DentalSpecialtyList {...PRODUCT_DETAILS_SEED_OBJECT.dentalSpecialtyListData} />
        </>
    );
};

export default ProductDetailsMainView;
