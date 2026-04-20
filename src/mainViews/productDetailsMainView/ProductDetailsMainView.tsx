import Faq from "@/components/faq/Faq";
import FreeSample from "@/components/freeSample/FreeSample";
import WhyChooseUs from "@/components/whyChooseUs/WhyChooseUs";
import CrmIntegration from "@/components/crmIntegration/CrmIntegration";
import VerifiedSource from "@/components/verifiedSource/VerifiedSource";
import ProductPriceList from "./views/productPriceList/ProductPriceList";
import ComparisonTable from "@/components/comparisonTable/ComparisonTable";
import { PRODUCT_DETAILS_SEED_OBJECT } from "@/shared/seeds/productDetailsSeeds";
import CustomDentistList from "@/components/customDentistList/CustomDentistList";
import DataBeneficiaries from "@/components/dataBeneficiaries/DataBeneficiaries";
import ProductDetailsBanner from "./views/productDetailsBanner/ProductDetailsBanner";
import WhatsIncludedDetails from "./views/whatsIncludedDetails/WhatsIncludedDetails";
import DentalSpecialtyList from "@/components/dentalSpecialtyList/DentalSpecialtyList";
import AboutDentistEmailList from "@/components/aboutDentistEmailList/AboutDentistEmailList";

const ProductDetailsMainView = () => {
    return (
        <>
            <ProductDetailsBanner />
            <FreeSample {...PRODUCT_DETAILS_SEED_OBJECT.freeSample} />
            <WhatsIncludedDetails {...PRODUCT_DETAILS_SEED_OBJECT.whatsIncludedDetails} />
            <ProductPriceList {...PRODUCT_DETAILS_SEED_OBJECT.productPriceList} />
            <CustomDentistList {...PRODUCT_DETAILS_SEED_OBJECT.customDentistList} />
            <WhyChooseUs {...PRODUCT_DETAILS_SEED_OBJECT.whyChooseUs} />
            <DentalSpecialtyList {...PRODUCT_DETAILS_SEED_OBJECT.dentalSpecialtyList} />
            <CrmIntegration {...PRODUCT_DETAILS_SEED_OBJECT.crmIntegration} />
            <VerifiedSource {...PRODUCT_DETAILS_SEED_OBJECT.verifiedSource} />
            <DataBeneficiaries {...PRODUCT_DETAILS_SEED_OBJECT.dataBeneficiaries} />
            <ComparisonTable {...PRODUCT_DETAILS_SEED_OBJECT.comparisonTable} />
            <AboutDentistEmailList {...PRODUCT_DETAILS_SEED_OBJECT.aboutDentistEmailList} />
            <Faq {...PRODUCT_DETAILS_SEED_OBJECT.faq} />
        </>
    );
};

export default ProductDetailsMainView;