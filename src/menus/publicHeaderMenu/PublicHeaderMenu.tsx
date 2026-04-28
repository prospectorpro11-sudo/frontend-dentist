'use client';
import { useState } from "react";
import classNames from "classnames";
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

const productsMenu: MenuItem[] = [
  { label: "Specialty", link: "/products/specialities" },
];

const dashboardMenuItems: DropdownItem[] = [
  { label: "Prospector", href: "/prospector" },
  { label: "My Downloads", href: "/my-downloads" },
  { label: "Orders", href: "/orders" },
  { label: "Billing", href: "/billing" },
  { label: "My Account", href: "/my-account" },
  { label: "Support", href: "/support" },
  { type: "divider" },
  { label: "Sign out", href: "/logout", variant: "danger", isLogout: true },
];

const PublicHeaderMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const { loggedInUser, setAuthEnable } = useRootContext();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsProductsMenuOpen(false);
  };

  const toggleProductsMenu = () => {
    setIsProductsMenuOpen((prev) => !prev);
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
                className={styles.logoDesktop}
                style={{ objectFit: "scale-down" }}
              />
              <Image
                src="/logo-icon.png"
                alt="Dentist Email List"
                width={40}
                height={40}
                priority
                className={styles.logoMobile}
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} role="navigation" aria-label="Main navigation">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className={classNames(styles.productsNavItem, { [styles.productsNavItemOpen]: isProductsMenuOpen })}>
                <button
                  type="button"
                  className={styles.productsTrigger}
                  onClick={toggleProductsMenu}
                  aria-expanded={isProductsMenuOpen}
                  aria-haspopup="menu"
                >
                  <span>Products</span>
                  <FaCaretDown size={16} aria-hidden="true" />
                </button>
                <div className={classNames(styles.productsDropdown, { [styles.productsDropdownOpen]: isProductsMenuOpen })} role="menu">
                  {productsMenu.map((item) => (
                    <Link key={item.label} href={item.link} role="menuitem" onClick={() => setIsProductsMenuOpen(false)}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
            </ul>
          </nav>

          {/* User Actions & Mobile Toggle */}
          <div className={styles.actionsSection}>
            {loggedInUser ? (
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
            ) : (
              <button
                type="button"
                className={styles.tertiaryButton}
                onClick={() => setAuthEnable(true)}
              >
                Login
              </button>
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

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <>
            <button
              type="button"
              className={styles.mobileMenuBackdrop}
              aria-label="Close mobile menu"
              onClick={closeMobileMenu}
            />
            <div className={styles.mobileMenu} role="menu">
              <nav aria-label="Mobile navigation">
                <ul>
                  <li>
                    <Link href="/" onClick={closeMobileMenu}>
                      Home
                    </Link>
                  </li>
                  <li className={classNames(styles.mobileProductsItem, { [styles.mobileProductsItemOpen]: isProductsMenuOpen })}>
                    <button
                      type="button"
                      className={styles.mobileProductsTrigger}
                      onClick={toggleProductsMenu}
                      aria-expanded={isProductsMenuOpen}
                      aria-haspopup="menu"
                    >
                      <span>Products</span>
                      <FaCaretDown size={16} aria-hidden="true" />
                    </button>
                    <div className={styles.mobileProductsDropdown} role="menu">
                      {productsMenu.map((item) => (
                        <Link key={item.label} href={item.link} role="menuitem" onClick={closeMobileMenu}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </li>
                  <li>
                    <Link href="/contact-us" onClick={closeMobileMenu}>
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us" onClick={closeMobileMenu}>
                      About Us
                    </Link>
                  </li>
                </ul>
                {loggedInUser ? (
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
                ) : null}
              </nav>
            </div>
          </>
        )}
      </Container>
    </header>
  );
};

export default PublicHeaderMenu;