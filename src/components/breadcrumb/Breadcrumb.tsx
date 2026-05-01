'use client';
import React from 'react';
import styles from "./breadcrumb.module.scss";
import classnames from 'classnames';
export type BreadcrumbVariant = 'default' | 'light' | 'compact' | 'large' | 'dashboard';
export interface BreadcrumbItem {
  label: string;
  href?: string | null;
  icon?: React.ReactNode;
  className?: string;
  current?: boolean;
}
export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  variant?: BreadcrumbVariant;
  maxItems?: number;
  collapsedLabel?: React.ReactNode;
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

  type DisplayItem = BreadcrumbItem & { isCollapsed?: boolean };

  // Handle maxItems for long breadcrumb trails
  const displayItems: DisplayItem[] = (() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    // Keep first item and last (maxItems - 1) items
    const firstItem = items[0];
    const remainingItems = items.slice(-(maxItems - 1));

    return [
      firstItem,
      { label: String(collapsedLabel), href: null, isCollapsed: true },
      ...remainingItems,
    ];
  })();

  const variantClassName = {
    default: styles.breadcrumbDefault,
    light: styles.breadcrumbLight,
    compact: styles.breadcrumbCompact,
    large: styles.breadcrumbLarge,
    dashboard: styles.breadcrumbDashboard,
  }[variant];

  return (
    <nav
      className={classnames(
        styles.breadcrumb,
        variantClassName,
        className
      )}
      aria-label={ariaLabel}
    >
      <ol className={styles.breadcrumbList}>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const href = typeof item.href === 'string' ? item.href : undefined;
          const hasLink = Boolean(href) && !isLast;

          return (
            <li
              key={item.href || item.label || index}
              className={styles.breadcrumbItem}
              aria-current={isLast ? 'page' : undefined}
            >
              {item.isCollapsed ? (
                <span className={styles.breadcrumbEllipsis} aria-hidden="true">
                  {item.label}
                </span>
              ) : hasLink ? (
                <a
                  href={href}
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
