'use client';
import React from 'react';
import styles from "./breadcrumb.module.scss";
import classnames from 'classnames';
export type BreadcrumbVariant = 'default' | 'light' | 'compact' | 'large';
export interface BreadcrumbItem {
  label: string;
  href: string | null;
  icon?: string;
  className?: string;
}
export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
  ariaLabel?: string;
  variant?: 'default' | 'light' | 'compact' | 'large';
  maxItems?: number;
  collapsedLabel?: string;
}

export interface BreadcrumbItemProps {
  item: BreadcrumbItem;
  index: number;
  totalItems: number;
  separator: string;
}


const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className,
  ariaLabel = 'Breadcrumb',
  variant = 'default',
  maxItems,
  collapsedLabel = '...',
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  // Handle maxItems for long breadcrumb trails
  const displayItems = (() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    // Keep first item and last (maxItems - 1) items
    const firstItem = items[0];
    const remainingItems = items.slice(-(maxItems - 1));

    return [
      firstItem,
      { label: collapsedLabel, href: null },
      ...remainingItems,
    ];
  })();

  return (
    <nav
      className={classnames(
        styles.breadcrumb,
        styles[`breadcrumb${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
        className
      )}
      aria-label={ariaLabel}
    >
      <ol className={styles.breadcrumbList}>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const hasLink = item.href && !isLast;

          return (
            <li
              key={item.href || item.label || index}
              className={styles.breadcrumbItem}
              aria-current={isLast ? 'page' : undefined}
            >
              {hasLink ? (
                <a
                  href={item.href}
                  className={styles.breadcrumbLink}
                >
                  {item.icon && (
                    <span className={styles.breadcrumbIcon} aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className={styles.breadcrumbLabel}>{item.label}</span>
                </a>
              ) : (
                <span
                  className={classnames(
                    styles.breadcrumbCurrent,
                    item.className
                  )}
                >
                  {item.icon && (
                    <span className={styles.breadcrumbIcon} aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className={styles.breadcrumbLabel}>{item.label}</span>
                </span>
              )}

              {!isLast && (
                <span
                  className={styles.breadcrumbSeparator}
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
