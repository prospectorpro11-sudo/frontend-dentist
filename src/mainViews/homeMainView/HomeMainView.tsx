import FreeSample from "@/components/freeSample/FreeSample";
import HomeBanner from "./views/homeBanner/HomeBanner";
import ProductList from "@/components/productList/ProductList";

const HomeMainView = () => {
    return (
        <>
            <HomeBanner />
            <FreeSample />
            <ProductList />
        </>
    );
};

export default HomeMainView;