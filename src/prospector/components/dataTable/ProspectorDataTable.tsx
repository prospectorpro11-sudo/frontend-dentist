import { FaCheckCircle, FaSearch, FaSyncAlt, FaThList } from "react-icons/fa";
import styles from "./prospectorDataTable.module.scss";
import { FaChevronLeft, FaChevronRight, FaEnvelope, FaPhone, FaSort } from "react-icons/fa6";

const ProspectorDataTable = () => {
    return (
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
    );
};

export default ProspectorDataTable;