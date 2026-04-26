'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSolidUser, BiMenu } from "react-icons/bi";
import { FaCaretDown, FaTimes } from "react-icons/fa";
import styles from "./publicHeaderMenu.module.scss";
import { Container } from "react-bootstrap";
import { useRootContext } from "@/contexts/RootContext";
import DropdownMenu, { type DropdownItem } from "@/components/dropdownMenu/DropdownMenu";

interface MenuItem {
  label: string;
  link: string;
}

const headerMenu: MenuItem[] = [
  { label: "Home", link: "/" },
  { label: "Feature", link: "/" },
  { label: "Pricing", link: "/" },
  { label: "Blog", link: "/" },
];

const dashboardMenuItems: DropdownItem[] = [
  { label: "Prospector", href: "/prospector" },
  { label: "My Downloads", href: "/my-downloads" },
  { label: "Orders", href: "/orders" },
  { label: "Billing", href: "/billing" },
  { label: "My Account", href: "/my-account" },
  { label: "Support", href: "/support" },
  { type: "divider" },
  { label: "Sign out", href: "/logout", variant: "danger" },
];

const PublicHeaderMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { loggedInUser } = useRootContext();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const userName = loggedInUser?.displayName || "";
  const getDisplayName = (name: string): string => {
    if (!name) return "";
    const words = name.trim().split(' ');
    const firstWord = words[0];
    
    if (words.length > 1) {
      return `${firstWord}...`;
    }
    
    return firstWord.length > 10 ? `${firstWord.slice(0, 10)}...` : firstWord;
  };
  const displayUserName = getDisplayName(userName) || "User";

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerRow}>
          {/* Logo Section */}
          <div className={styles.logoSection}>
            <Link href="/" aria-label="Dentist Email List Home">
              <Image
                src="/logo.png"
                alt="Dentist Email List"
                width={120}
                height={50}
                priority
                style={{ objectFit: "scale-down" }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} role="navigation" aria-label="Main navigation">
            <ul>
              {headerMenu.map((item) => (
                <li key={item.label}>
                  <Link href={item.link}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Actions & Mobile Toggle */}
          <div className={styles.actionsSection}>
            {loggedInUser && (
              <DropdownMenu
                items={dashboardMenuItems}
                align="center"
                trigger={({ onClick, ariaExpanded, ariaHaspopup }) => (
                  <button
                    type="button"
                    className={styles.userMenu}
                    onClick={onClick}
                    aria-expanded={ariaExpanded}
                    aria-haspopup={ariaHaspopup}
                  >
                    <BiSolidUser size={22} aria-hidden="true" />
                    <span>{displayUserName}</span>
                    <FaCaretDown size={20} aria-hidden="true" />
                  </button>
                )}
              />
            )}
            <a href="/prospector">
              <button
                className={styles.headerButton}
                type="button"
                aria-label="Build Dentist List"
              >
                Build Dentist List
              </button>
            </a>
            <button
              className={styles.mobileMenuToggle}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <BiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu} role="menu">
            <nav aria-label="Mobile navigation">
              <ul>
                {headerMenu.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.link}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {loggedInUser && (
                <div className={styles.mobileUserMenu}>
                  <DropdownMenu
                    items={dashboardMenuItems}
                    align="center"
                    trigger={({ onClick, ariaExpanded, ariaHaspopup }) => (
                      <button
                        type="button"
                        className={styles.userMenu}
                        onClick={onClick}
                        aria-expanded={ariaExpanded}
                        aria-haspopup={ariaHaspopup}
                      >
                        <BiSolidUser size={22} aria-hidden="true" />
                        <span>{displayUserName}</span>
                        <FaCaretDown size={20} aria-hidden="true" />
                      </button>
                    )}
                  />
                </div>
              )}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default PublicHeaderMenu;