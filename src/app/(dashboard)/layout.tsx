'use client';
import { useState } from "react";
import classNames from "classnames";
import {
    FaBell,
    FaBox,
    FaChartPie,
    FaCog,
    FaDownload,
    FaFileInvoiceDollar,
    FaTooth,
    FaUser,
    FaUsers,
} from "react-icons/fa";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";

import styles from "./dashboardLayout.module.scss";

type DashboardContentMode = "scrollable" | "static";

export default function DashboardLayout({
    children,
    contentMode = "scrollable",
}: Readonly<{
    children: React.ReactNode;
    contentMode?: DashboardContentMode;
}>) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuExpanded, setIsMenuExpanded] = useState(false);

    return (
        <div className={styles.wrapper}>
            {/* <!-- SIDEBAR --> */}
            <aside className={styles.sidebar}>
                <div className={styles.sideLogo}>
                    <div className={styles.logoMark}><i aria-hidden="true"><FaTooth /></i></div>
                    <div className={styles.logoLabel}>Dentist<i>Email List</i></div>
                </div>
                <div className={styles.sideLabel}>Main Menu</div>
                <nav className={styles.sideNav}>
                    <a className={styles.active} href="#"><i aria-hidden="true"><FaMagnifyingGlassLocation /></i><span className={styles.navText}>Prospector</span></a>
                    <a href="#"><i aria-hidden="true"><FaChartPie /></i><span className={styles.navText}>Dashboard</span></a>
                    <a href="#"><i aria-hidden="true"><FaUsers /></i><span className={styles.navText}>Contacts</span></a>
                    <a href="#"><i aria-hidden="true"><FaDownload /></i><span className={styles.navText}>My Downloads</span><span className={styles.badge}>3</span></a>
                    <a href="#"><i aria-hidden="true"><FaBox /></i><span className={styles.navText}>Orders</span><span className={styles.badge + ' ' + styles.badgeR}>1 New</span></a>
                    <a href="#"><i aria-hidden="true"><FaFileInvoiceDollar /></i><span className={styles.navText}>Billing</span></a>
                </nav>
                <div className={styles.sideBottom}>
                    <div className={styles.sbAvatar}>F</div>
                    <div className={styles.sbInfo}>
                        <div className={styles.sbName}>Franklin Carter</div>
                        <div className={styles.sbRole}>Pro Subscriber</div>
                    </div>
                    <div className={styles.sbBtn} title="Settings"><i aria-hidden="true"><FaCog /></i></div>
                </div>
            </aside>
            {/* Top Bar */}
            <div className={styles.topbar}>
                <div>
                    <h1>Prospector</h1>
                    <div className={styles.crumb}>Dashboard &rsaquo; Prospector &rsaquo; Results</div>
                </div>
                <div className={styles.spacer}></div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button className={styles.notibtn}><i aria-hidden="true"><FaBell /></i><span className={styles.dot}></span></button>
                    <div className={styles.userchip}>
                        <span className={styles.uname}>Franklin..</span>
                        <div className={styles.ava}><i aria-hidden="true" style={{ fontSize: "11px" }}><FaUser /></i></div>
                    </div>
                </div>
            </div>

            <main
                className={classNames(styles.main, {
                    [styles.mainScrollable]: contentMode === "scrollable",
                    [styles.mainStatic]: contentMode === "static",
                })}
            >
                <div className={styles.mainInner}>{children}</div>
            </main>

        </div>
    );
}
