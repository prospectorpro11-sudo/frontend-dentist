'use client';
import { useState } from "react";
import classNames from "classnames";
import {
    FaBell,
    FaBox,
    FaChartPie,
    FaCog,
    FaBars,
    FaDownload,
    FaFileInvoiceDollar,
    FaTooth,
    FaUser,
    FaUsers,
} from "react-icons/fa";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";

import Breadcrumb, { type BreadcrumbItem, type BreadcrumbVariant } from "@/components/breadcrumb/Breadcrumb";
import styles from "./dashboardLayout.module.scss";

type DashboardContentMode = "scrollable" | "static";

type DashboardMenuItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: React.ReactNode;
    active?: boolean;
};

const defaultMenuItems: DashboardMenuItem[] = [
    {
        label: "Prospector",
        href: "#",
        icon: <FaMagnifyingGlassLocation />,
        active: true,
    },
    {
        label: "Dashboard",
        href: "#",
        icon: <FaChartPie />,
    },
    {
        label: "Contacts",
        href: "#",
        icon: <FaUsers />,
    },
    {
        label: "My Downloads",
        href: "#",
        icon: <FaDownload />,
    },
    {
        label: "Orders",
        href: "#",
        icon: <FaBox />,
    },
    {
        label: "Billing",
        href: "#",
        icon: <FaFileInvoiceDollar />,
    },
];

export default function DashboardLayout({
    children,
    navTitle = "Prospector",
    navSubtitle = "Dashboard &rsaquo; Prospector &rsaquo; Results",
    breadcrumbs,
    breadcrumbVariant = "dashboard",
    menuItems = defaultMenuItems,
    userName = "Franklin Carter",
    userRole = "Pro Subscriber",
    contentMode = "scrollable",
}: Readonly<{
    children: React.ReactNode;
    navTitle?: string;
    navSubtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
    breadcrumbVariant?: BreadcrumbVariant;
    menuItems?: DashboardMenuItem[];
    userName?: string;
    userRole?: string;
    contentMode?: DashboardContentMode;
}>) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);
    const resolvedBreadcrumbs = breadcrumbs ?? [
        { label: "Dashboard", href: "/dashboard" },
        { label: navTitle, href: null },
    ];

    return (
        <div className={styles.wrapper}>
            <button
                type="button"
                className={classNames(styles.menuOverlay, {
                    [styles.menuOverlayOpen]: isMenuOpen,
                })}
                aria-label="Close menu"
                onClick={closeMenu}
            />
            {/* <!-- SIDEBAR --> */}
            <aside
                className={classNames(styles.sidebar, {
                    [styles.sidebarOpen]: isMenuOpen,
                })}
            >
                <div className={styles.sideLogo}>
                    <div className={styles.logoMark}><i aria-hidden="true"><FaTooth /></i></div>
                    <div className={styles.logoLabel}>Dentist<i>Email List</i></div>
                </div>
                <div className={styles.sideLabel}>Main Menu</div>
                <nav className={styles.sideNav}>
                    {menuItems.map((item) => (
                        <a
                            key={item.label}
                            className={classNames({ [styles.active]: item.active })}
                            href={item.href}
                            onClick={(event) => {
                                if (item.href === "#") {
                                    event.preventDefault();
                                }
                                closeMenu();
                            }}
                        >
                            <i aria-hidden="true">{item.icon}</i>
                            <span className={styles.navText}>{item.label}</span>
                        </a>
                    ))}
                </nav>
                <div className={styles.sideBottom}>
                    <div className={styles.sbAvatar}>F</div>
                    <div className={styles.sbInfo}>
                        <div className={styles.sbName}>{userName}</div>
                        <div className={styles.sbRole}>{userRole}</div>
                    </div>
                    <div className={styles.sbBtn} title="Settings"><i aria-hidden="true"><FaCog /></i></div>
                </div>
            </aside>
            {/* Top Bar */}
            <div className={styles.topbar}>
                <button
                    type="button"
                    className={styles.mobileMenuBtn}
                    aria-label="Open menu"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <FaBars />
                </button>
                <div className={styles.topbarHeading}>
                    <h1 className="mb-0">{navTitle}</h1>
                    <Breadcrumb
                        items={resolvedBreadcrumbs}
                        variant={breadcrumbVariant}
                        separator="›"
                        className={styles.topbarBreadcrumb}
                    />
                    {/* {navSubtitle ? <div className={styles.topbarSubtitle}>{navSubtitle}</div> : null} */}
                </div>
                <div className={styles.spacer}></div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button className={styles.notibtn}><i aria-hidden="true"><FaBell /></i><span className={styles.dot}></span></button>
                    <div className={styles.userchip}>
                        <span className={styles.uname}>{userName}</span>
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
