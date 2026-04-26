'use client';
import { useState } from "react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import {
    FaBox,
    FaChevronDown,
    FaChartPie,
    FaCog,
    FaBars,
    FaDownload,
    FaFileInvoiceDollar,
    FaTooth,
    FaUserCircle,
    FaUsers,
    FaHeadset,
    FaSearch,
} from "react-icons/fa";

import "react-loading-skeleton/dist/skeleton.css";
import Breadcrumb, { type BreadcrumbItem, type BreadcrumbVariant } from "@/components/breadcrumb/Breadcrumb";
import DropdownMenu, { type DropdownItem } from "@/components/dropdownMenu/DropdownMenu";
import styles from "./dashboardLayout.module.scss";
import { IoCaretDown } from "react-icons/io5";
import { useRootContext } from "@/contexts/RootContext";

type DashboardContentMode = "scrollable" | "static";

type DashboardMenuItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: React.ReactNode;
    active?: boolean;
};

type DashboardUserMenuItem = DropdownItem;

const defaultMenuItems: DashboardMenuItem[] = [
    {
        label: "Prospector",
        href: "/prospector",
        icon: <FaSearch />,
        active: true,
    },
    {
        label: "My Downloads",
        href: "/my-downloads",
        icon: <FaDownload />,
    },
    {
        label: "Orders",
        href: "/orders",
        icon: <FaBox />,
    },
    {
        label: "Billing",
        href: "/billing",
        icon: <FaFileInvoiceDollar />,
    },
    {
        label: "My Account",
        href: "/my-account",
        icon: <FaUserCircle />,
    },
    {
        label: "Support",
        href: "/support",
        icon: <FaHeadset />,
    },
];

const defaultUserMenuItems: DashboardUserMenuItem[] = [
    {
        label: "Profile",
        href: "/dashboard/profile",
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
    },
    {
        type: "divider",
    },
    {
        label: "Sign out",
        href: "/logout",
        variant: "danger",
    },
];

export default function DashboardLayout({
    children,
    navTitle = "Prospector",
    navSubtitle = "Dashboard &rsaquo; Prospector &rsaquo; Results",
    breadcrumbs,
    breadcrumbVariant = "dashboard",
    menuItems = defaultMenuItems,
    userMenuItems = defaultUserMenuItems,
    contentMode = "scrollable",
}: Readonly<{
    children: React.ReactNode;
    navTitle?: string;
    navSubtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
    breadcrumbVariant?: BreadcrumbVariant;
    menuItems?: DashboardMenuItem[];
    userMenuItems?: DashboardUserMenuItem[];
    userName?: string;
    userRole?: string;
    contentMode?: DashboardContentMode;
}>) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);
    const pathname = usePathname();
    const { loggedInUser } = useRootContext();

    const closeMenu = () => setIsMenuOpen(false);
    
    const isProspector = pathname?.startsWith('/prospector');
    const actualContentMode = isProspector ? "static" : "scrollable";
    const activeItem = menuItems.find(item => pathname?.startsWith(item.href)) || menuItems[0];
    const activeTitle = activeItem ? activeItem.label : navTitle;

    const resolvedBreadcrumbs = breadcrumbs ?? [
        { label: "Dashboard", href: "/dashboard" },
        { label: activeTitle, href: null },
    ];

    // Compute active state based on current path
    const navItemsWithActiveState = menuItems.map(item => ({
        ...item,
        active: pathname?.startsWith(item.href) ?? item.active
    }));
    const userName = loggedInUser?.displayName || "";
    // Truncate userName for display (show first word, max 5 chars)
    const getDisplayName = (name: string): string => {
        const firstWord = name.split(' ')[0];
        return firstWord.length > 5 ? `${firstWord.slice(0, 5)}...` : firstWord;
    };
    const displayUserName = getDisplayName(userName);
    // Get first initial for avatar
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <div className={styles.wrapper}>
            <div className={styles.bgShapes} aria-hidden="true">
                <div className={styles.shape} />
                <div className={styles.shape} />
                <div className={styles.shape} />
                <div className={styles.shape} />
            </div>
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
                <nav className={styles.sideNav}>
                    {navItemsWithActiveState.map((item) => (
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
                {loggedInUser && (
                    <div className={styles.sideBottom}>
                        <div className={styles.sbAvatar}>{userInitial}</div>
                        <div className={styles.sbInfo}>
                            <div className={styles.sbName}>{userName}</div>
                        </div>
                        <div className={styles.sbBtnWrapper}>
                            <button
                                type="button"
                                className={styles.sbBtn}
                                title="Settings"
                                onClick={() => setIsLogoutMenuOpen(!isLogoutMenuOpen)}
                            >
                                <i aria-hidden="true"><FaCog /></i>
                            </button>
                            {isLogoutMenuOpen && (
                                <button
                                    type="button"
                                    className={styles.logoutBtn}
                                    onClick={() => {
                                        window.location.href = '/logout';
                                    }}
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                )}
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
                    <h1 className="mb-0">{activeTitle}</h1>
                    <Breadcrumb
                        items={resolvedBreadcrumbs}
                        variant={breadcrumbVariant}
                        separator="›"
                        className={styles.topbarBreadcrumb}
                    />
                    {/* {navSubtitle ? <div className={styles.topbarSubtitle}>{navSubtitle}</div> : null} */}
                </div>
                <div className={styles.spacer}></div>
                <DropdownMenu
                    items={userMenuItems}
                    align="right"
                    size="sm"
                    className={styles.userMenu}
                    menuClassName={styles.userMenuDropdown}
                    trigger={({ onClick, ariaExpanded, ariaHaspopup }) => (
                        <button
                            type="button"
                            className={styles.userMenuTrigger}
                            onClick={onClick}
                            aria-expanded={ariaExpanded}
                            aria-haspopup={ariaHaspopup}
                        >
                            <span className={styles.userMenuAvatar}>{userInitial}</span>
                            <span className={styles.userMenuName}>{displayUserName}</span>
                            <span className={styles.userMenuChevron} aria-hidden="true">
                                <IoCaretDown />
                            </span>
                        </button>
                    )}
                />
            </div>

            <main
                className={classNames(styles.main, {
                    [styles.mainScrollable]: actualContentMode === "scrollable",
                    [styles.mainStatic]: actualContentMode === "static",
                })}
            >
                <div className={classNames(styles.mainInner, {
                    [styles.mainInnerNoScroll]: actualContentMode === "static"
                })}>{children}</div>
            </main>

        </div>
    );
}
