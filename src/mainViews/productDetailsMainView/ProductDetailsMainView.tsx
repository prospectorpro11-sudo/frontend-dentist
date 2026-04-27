import Faq from "@/components/faq/Faq";
import FreeSample from "@/components/freeSample/FreeSample";
import { ProductCatalogItem } from "@/shared/productCatalog";
import WhyChooseUs from "@/components/whyChooseUs/WhyChooseUs";
import CrmIntegration from "@/components/crmIntegration/CrmIntegration";
import VerifiedSource from "@/components/verifiedSource/VerifiedSource";
import ProductPriceList from "./views/productPriceList/ProductPriceList";
import ComparisonTable from "@/components/comparisonTable/ComparisonTable";
import { PRODUCT_DETAILS_SEED_OBJECT } from "@/seeds/productDetailsSeeds";
import CustomDentistList from "@/components/customDentistList/CustomDentistList";
import DataBeneficiaries from "@/components/dataBeneficiaries/DataBeneficiaries";
import ProductDetailsBanner from "./views/productDetailsBanner/ProductDetailsBanner";
import WhatsIncludedDetails from "./views/whatsIncludedDetails/WhatsIncludedDetails";
import DentalSpecialtyList from "@/components/dentalSpecialtyList/DentalSpecialtyList";
import AboutDentistEmailList from "@/components/aboutDentistEmailList/AboutDentistEmailList";
import { numberWithCommas } from "@/shared/InternalService";

type ProductDetailMainViewProps = {
    product: ProductCatalogItem;
    editorProduct?: Record<string, any> | null;
};
const normalizeRewrittenJson = (value: any) => {
    if (!value) return {};
    if (typeof value === "object") return value;
    if (typeof value !== "string") return {};
    try {
        const parsed = JSON.parse(value);
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_error) {
        return {};
    }
};

const ProductDetailsMainView = ({ product, editorProduct }: ProductDetailMainViewProps) => {
    const rewrittenJson = normalizeRewrittenJson(editorProduct?.rewrittenJson);
    console.log(rewrittenJson, "rewrittenJson");
    const faqList = rewrittenJson?.faqs?.list || [];
    const midPoint = Math.ceil(faqList.length / 2);
    const splitFaqList = [
        faqList.slice(0, midPoint),
        faqList.slice(midPoint)
    ];

    return (
        <>
            <ProductDetailsBanner
                stats={product.stats}
                productId={product.stateId}
                productName={rewrittenJson.mainHeader}
                description={rewrittenJson.mainHeaderDescription}
            />
            <FreeSample {...PRODUCT_DETAILS_SEED_OBJECT.freeSample} isProductDetails totalCount={numberWithCommas(product.stats.totalContacts.toString())} />
            <WhatsIncludedDetails {...PRODUCT_DETAILS_SEED_OBJECT.whatsIncludedDetails} buildListTitle="Ideal Use Cases" />
            <ProductPriceList {...PRODUCT_DETAILS_SEED_OBJECT.productPriceList} />
            <CustomDentistList {...PRODUCT_DETAILS_SEED_OBJECT.customDentistList} />
            <WhyChooseUs {...PRODUCT_DETAILS_SEED_OBJECT.whyChooseUs} />
            <DentalSpecialtyList {...PRODUCT_DETAILS_SEED_OBJECT.dentalSpecialtyList} />
            <CrmIntegration {...PRODUCT_DETAILS_SEED_OBJECT.crmIntegration} />
            <VerifiedSource {...PRODUCT_DETAILS_SEED_OBJECT.verifiedSource} />
            <DataBeneficiaries {...PRODUCT_DETAILS_SEED_OBJECT.dataBeneficiaries} />
            <ComparisonTable {...PRODUCT_DETAILS_SEED_OBJECT.comparisonTable} />
            <AboutDentistEmailList {...PRODUCT_DETAILS_SEED_OBJECT.aboutDentistEmailList} />
            <Faq
                stats={PRODUCT_DETAILS_SEED_OBJECT.faq.stats}
                title={rewrittenJson?.faqs?.title}
                description={rewrittenJson?.faqs?.description}
                columns={splitFaqList}
            />
        </>
    );
};

export default ProductDetailsMainView;