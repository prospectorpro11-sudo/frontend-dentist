import Faq from "@/components/faq/Faq";
import HomeBanner from "./views/homeBanner/HomeBanner";
import FreeSample from "@/components/freeSample/FreeSample";
import { HOME_SEED_OBJECT } from "@/shared/seeds/homeSeeds";
import ProductList from "@/components/productList/ProductList";
import BeyondEmail from "@/components/beyondEmail/BeyondEmail";
import WhatsIncluded from "@/components/whatsIncluded/WhatsIncluded";
import DataDescribe from "@/components/dataDescribe/DataDescribe";
import LocationSegmentation from "@/components/locationSegmentation/LocationSegmentation";

const HomeMainView = () => {
    return (
        <>
            <HomeBanner {...HOME_SEED_OBJECT.homeBanner} />
            <FreeSample {...HOME_SEED_OBJECT.freeSample} />
            <ProductList {...HOME_SEED_OBJECT.productList} />
            <BeyondEmail {...HOME_SEED_OBJECT.beyondEmail} />
            <WhatsIncluded {...HOME_SEED_OBJECT.whatsIncluded} />
            <DataDescribe {...HOME_SEED_OBJECT.dataDescribe} />
            <LocationSegmentation {...HOME_SEED_OBJECT.locationSegmentation} />
            <Faq {...HOME_SEED_OBJECT.faq} />
        </>
    );
};

export default HomeMainView;