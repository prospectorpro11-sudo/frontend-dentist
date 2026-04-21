import styles from "./prospectorFilters.module.scss";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { FaBriefcase, FaChevronDown, FaFilter, FaHospital, FaIdCard, FaMap, FaMapPin, FaStethoscope, FaVenusMars } from "react-icons/fa6";

const ProspectorFilters = () => {
    return (
        <div className={styles.filtSec}>
            <div className={styles.filttop}>
                <div className={styles.ftitle}><div className={styles.fi}><FaFilter /></div><b>Smart Filters</b></div>
                <div className={styles.fcnt}>2 Active</div>
            </div>

            <div className={styles.chips}>
                <div className={styles.chip}><FaMap /> State <span className={styles.arr}><FaChevronDown /></span></div>
                <div className={styles.chip}><FaMapMarkerAlt /> City <span className={styles.arr}><FaChevronDown /></span></div>
                <div className={styles.chip}><FaMapPin /> Zip <span className={styles.arr}><FaChevronDown /></span></div>
                <div className={`${styles.chip} ${styles.on}`}><FaStethoscope /> Specialty <span className={styles.cnt}>3</span> <span className={styles.arr}><FaChevronDown /></span></div>
                <div className={styles.chip}><FaVenusMars /> Gender <span className={styles.arr}><FaChevronDown /></span></div>
                <div className={styles.chip}><FaIdCard /> License <span className={styles.arr}><FaChevronDown /></span></div>
                <div className={styles.chip}><FaBriefcase /> Office <span className={styles.arr}><FaChevronDown /></span></div>
                <div className={styles.chip}><FaHospital /> Assoc. <span className={styles.arr}><FaChevronDown /></span></div>
            </div>

            <div className={styles.tags}>
                <div className={styles.tag}><b>State</b> California, Alaska, New York <span className={styles.rx}><FaTimes /></span></div>
                <div className={styles.tag}><b>City</b> Los Angeles, Cook, Harris <span className={styles.rx}><FaTimes /></span></div>
            </div>
        </div>
    );
};

export default ProspectorFilters;