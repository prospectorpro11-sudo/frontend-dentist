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

const ProspectorMainView = () => {
    return (
        <>
            <div className={styles.stats}>
                <div className={styles.stat}>
                    <div className={styles.sico}><FaAddressBook /></div>
                    <div>
                        <div className={styles.sval}>930,285</div>
                        <div className={styles.slab}>Contacts</div>
                    </div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.sico}><FaEnvelope /></div>
                    <div>
                        <div className={styles.sval}>930,285</div>
                        <div className={styles.slab}>Emails</div>
                    </div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.sico}><FaPhone /></div>
                    <div>
                        <div className={styles.sval}>930,285</div>
                        <div className={styles.slab}>Phones</div>
                    </div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.sico}><FaFax /></div>
                    <div>
                        <div className={styles.sval}>930,285</div>
                        <div className={styles.slab}>Faxes</div>
                    </div>
                </div>
                <div className={styles.checkout}>
                    <div className={styles.cprice}>$452<small>2,847 contacts</small></div>
                    <button className={styles.cartbtn} type="button"><FaCartPlus /> Add All to Cart</button>
                </div>
            </div>

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

            <div className={styles.gridSec}>
                <div className={styles.gtbar}>
                    <div className={styles.gtleft}>
                        <div className={styles.gsearch}><i><FaSearch /></i><input type="text" placeholder="Search contacts..." /></div>
                        <button className={styles.tblbtn} type="button"><FaThList /> Columns <span className={styles.cnt}>8/13</span></button>
                    </div>
                    <div className={styles.gtright}>
                        <button className={styles.gtact} type="button" title="Refresh"><FaSyncAlt /></button>
                    </div>
                </div>

                <div className={styles.colpan}>
                    <div className={`${styles.coltgl} ${styles.on}`}><FaCheckCircle /> #</div>
                    <div className={`${styles.coltgl} ${styles.on}`}><FaCheckCircle /> Name</div>
                    <div className={`${styles.coltgl} ${styles.on}`}><FaCheckCircle /> NPI</div>
                    <div className={`${styles.coltgl} ${styles.on}`}><FaCheckCircle /> Email</div>
                    <div className={`${styles.coltgl} ${styles.on}`}><FaCheckCircle /> Phone</div>
                    <div className={`${styles.coltgl} ${styles.off}`}><FaCheckCircle /> Fax</div>
                    <div className={`${styles.coltgl} ${styles.off}`}><FaCheckCircle /> Gender</div>
                </div>

                <div className={styles.gridWrap}>
                    <table className={styles.grid}>
                        <thead>
                            <tr>
                                <th><div className={styles.thInner}># <i className={styles.sico}><FaSort /></i></div></th>
                                <th><div className={styles.thInner}>Name <i className={styles.sico}><FaSort /></i></div><div className={styles.rhandle} /></th>
                                <th><div className={styles.thInner}>NPI <i className={styles.sico}><FaSort /></i></div><div className={styles.rhandle} /></th>
                                <th><div className={styles.thInner}>Email <i className={styles.sico}><FaSort /></i></div><div className={styles.rhandle} /></th>
                                <th><div className={styles.thInner}>Phone <i className={styles.sico}><FaSort /></i></div><div className={styles.rhandle} /></th>
                                <th><div className={styles.thInner}>State <i className={styles.sico}><FaSort /></i></div><div className={styles.rhandle} /></th>
                                <th><div className={styles.thInner}>City <i className={styles.sico}><FaSort /></i></div><div className={styles.rhandle} /></th>
                                <th><div className={styles.thInner}>Specialty <i className={styles.sico}><FaSort /></i></div><div className={styles.rhandle} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div className={styles.rnum}>1</div></td>
                                <td><div className={`${styles.cell} ${styles.ncell}`}><div className={styles.nava}>JD</div><div><div className={styles.nname}>John Doe</div><div className={styles.nsub}>Dentist</div></div></div></td>
                                <td><span className={styles.npiText}>1234567890</span></td>
                                <td><span className={styles.emText}><span className={styles.ei}><FaEnvelope /></span> john@example.com</span></td>
                                <td><span className={styles.phText}><span className={styles.pi}><FaPhone /></span> (123) 456-7890</span></td>
                                <td><span className={styles.sbdg}>CA</span></td>
                                <td><span className={styles.ctText}>Los Angeles</span></td>
                                <td><span className={`${styles.spbdg} ${styles.c1}`}>Orthodontics</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.gprog}><div className={styles.gprogress}><div className={styles.gfill} /></div></div>
                <div className={styles.gfoot}>
                    <div className={styles.rc}>Showing <b>1</b> to <b>15</b> of <b>2,847</b> results</div>
                    <div className={styles.pgn}>
                        <button type="button"><FaChevronLeft style={{ fontSize: 8 }} /></button>
                        <button type="button" className={styles.on}>1</button>
                        <button type="button">2</button>
                        <button type="button">3</button>
                        <button type="button" className={styles.pgnEll} disabled>...</button>
                        <button type="button">48</button>
                        <button type="button"><FaChevronRight style={{ fontSize: 8 }} /></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProspectorMainView;