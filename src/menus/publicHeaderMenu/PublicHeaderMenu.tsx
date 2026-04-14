'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSolidUser, BiMenu } from "react-icons/bi";
import { FaCaretDown, FaTimes } from "react-icons/fa";
import styles from "./publicHeaderMenu.module.scss";
import { Container } from "react-bootstrap";

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

const PublicHeaderMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
                width={200}
                height={40}
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
            <div className={styles.userMenu}>
              <BiSolidUser size={22} aria-hidden="true" />
              <span>Franklin..</span>
              <FaCaretDown size={20} aria-hidden="true" />
            </div>
            <button
              className={styles.headerButton}
              type="button"
              aria-label="Build Dentist List"
            >
              Build Dentist List
            </button>
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
              <div className={styles.mobileUserMenu}>
                <div className={styles.userMenu}>
                  <BiSolidUser size={22} aria-hidden="true" />
                  <span>Franklin..</span>
                  <FaCaretDown size={20} aria-hidden="true" />
                </div>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default PublicHeaderMenu;