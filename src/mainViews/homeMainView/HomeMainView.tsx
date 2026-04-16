import HomeBanner from "./views/homeBanner/HomeBanner";
import FreeSample from "@/components/freeSample/FreeSample";
import ProductList from "@/components/productList/ProductList";
import BeyondEmail from "@/components/beyondEmail/BeyondEmail";
import WhatsIncluded from "@/components/whatsIncluded/WhatsIncluded";
import DataDescribe from "@/components/dataDescribe/DataDescribe";
import LocationSegmentation from "@/components/locationSegmentation/LocationSegmentation";
import Faq from "@/components/faq/Faq";

const HomeMainView = () => {
    return (
        <>
            <HomeBanner />
            <FreeSample />
            <ProductList />
            <BeyondEmail />
            <WhatsIncluded />
            <DataDescribe />
            <LocationSegmentation />
            <Faq />
        </>
    );
};

export default HomeMainView;