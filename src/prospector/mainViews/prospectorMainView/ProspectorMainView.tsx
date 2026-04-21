import {
    FaAddressBook,
    FaBriefcase,
    FaCartPlus,
    FaCheckCircle,
    FaChevronDown,
    FaChevronLeft,
    FaChevronRight,
    FaEnvelope,
    FaFax,
    FaFilter,
    FaHospital,
    FaIdCard,
    FaMap,
    FaMapMarkerAlt,
    FaMapPin,
    FaPhone,
    FaSearch,
    FaSort,
    FaStethoscope,
    FaSyncAlt,
    FaThList,
    FaTimes,
    FaVenusMars,
} from "react-icons/fa";

import styles from "./prospectorMainView.module.scss";
import ProspectorStats from "@/prospector/components/prospectorStats/ProspectorStats";
import ProspectorAddToCart from "@/prospector/components/prospectorAddToCart/ProspectorAddToCart";
import ProspectorFilters from "@/prospector/components/filters/ProspectorFilters";
import ProspectorDataTable from "@/prospector/components/dataTable/ProspectorDataTable";

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