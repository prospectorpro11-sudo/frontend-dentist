import styles from "./prospectorMainView.module.scss";
import ProspectorFilters from "@/prospector/components/filters/ProspectorFilters";
import ProspectorStats from "@/prospector/components/prospectorStats/ProspectorStats";
import ProspectorDataTable from "@/prospector/components/dataTable/ProspectorDataTable";
import ProspectorAddToCart from "@/prospector/components/prospectorAddToCart/ProspectorAddToCart";

const ProspectorMainView = () => {
    return (
        <>
            <div className={styles.statsCheckout}>
                <ProspectorStats />
                <ProspectorAddToCart />
            </div>
            <ProspectorFilters />
            <ProspectorDataTable />
        </>
    );
};

export default ProspectorMainView;