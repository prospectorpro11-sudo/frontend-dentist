import FreeSample from "@/components/freeSample/FreeSample";
import { PRODUCT_DETAILS_SEED_OBJECT } from "@/shared/seeds/productDetailsSeeds";
import ProductDetailsBanner from "./views/productDetailsBanner/ProductDetailsBanner";
import WhatsIncludedDetails from "./views/whatsIncludedDetails/WhatsIncludedDetails";
import ProductPriceList from "./views/productPriceList/ProductPriceList";
import CustomDentistList from "@/components/customDentistList/CustomDentistList";
import WhyChooseUs from "@/components/whyChooseUs/WhyChooseUs";
import DentalSpecialtyList from "@/components/dentalSpecialtyList/DentalSpecialtyList";
import CrmIntegration from "@/components/crmIntegration/CrmIntegration";
import VerifiedSource from "@/components/verifiedSource/VerifiedSource";
import DataBeneficiaries from "@/components/dataBeneficiaries/DataBeneficiaries";
import ComparisonTable from "@/components/comparisonTable/ComparisonTable";
import AboutDentistEmailList from "@/components/aboutDentistEmailList/AboutDentistEmailList";

const ProductDetailsMainView = () => {
    return (
        <>
            <ProductDetailsBanner />
            <FreeSample {...PRODUCT_DETAILS_SEED_OBJECT.freeSample} />
            <WhatsIncludedDetails />
            <ProductPriceList />
            <CustomDentistList />
            <WhyChooseUs />
            <DentalSpecialtyList />
            <CrmIntegration />
            <VerifiedSource />
            <DataBeneficiaries />
            <ComparisonTable />
            <AboutDentistEmailList />
        </>
    );
};

export default ProductDetailsMainView;