"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

import styles from "./editorLayout.module.scss";

const EDITOR_NAV = [
  { label: "Generate", href: "/editor" },
  { label: "Products", href: "/editor/products" },
  { label: "Templates", href: "/editor/templates" },
  { label: "Prospector", href: "/prospector" },
];

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className={styles.editorShell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/editor" className={styles.brand}>
            <div>
              <p className={styles.brandTitle}>Dentist Email List Editor</p>
              <p className={styles.brandSub}>Dedicated editor workspace</p>
            </div>
          </Link>
          <nav className={styles.nav} aria-label="Editor navigation">
            {EDITOR_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={classNames(styles.navLink, {
                  [styles.navLinkActive]: pathname === item.href,
                })}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
