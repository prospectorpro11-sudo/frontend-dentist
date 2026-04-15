import FreeSample from "@/components/freeSample/FreeSample";
import HomeBanner from "./views/homeBanner/HomeBanner";
import ProductList from "@/components/productList/ProductList";
import BeyondEmail from "@/components/beyondEmail/BeyondEmail";

const HomeMainView = () => {
    return (
        <>
            <HomeBanner />
            <FreeSample />
            <ProductList />
            <BeyondEmail />
        </>
    );
};

export default HomeMainView;