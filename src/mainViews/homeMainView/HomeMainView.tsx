import HomeBanner from "./views/homeBanner/HomeBanner";
import FreeSample from "@/components/freeSample/FreeSample";
import ProductList from "@/components/productList/ProductList";
import BeyondEmail from "@/components/beyondEmail/BeyondEmail";
import WhatsIncluded from "@/components/whatsIncluded/WhatsIncluded";

const HomeMainView = () => {
    return (
        <>
            <HomeBanner />
            <FreeSample />
            <ProductList />
            <BeyondEmail />
            <WhatsIncluded />
        </>
    );
};

export default HomeMainView;