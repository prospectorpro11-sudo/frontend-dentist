'use client';
import classNames from "classnames";
import { useEffect, useRef, useState, type ReactNode } from "react";

import styles from "./dropdownMenu.module.scss";
import { useRootContext } from "@/contexts/RootContext";
import { setUser } from "@/services/tokenService";

type DropdownItemBase = {
  id?: string;
};

export type DropdownItem =
  | (DropdownItemBase & {
    type?: "item";
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "danger";
    isLogout?: boolean;
  })
  | (DropdownItemBase & {
    type: "divider";
  });

type DropdownTriggerProps = {
  onClick: () => void;
  isOpen: boolean;
  ariaExpanded: boolean;
  ariaHaspopup: "menu";
};

type DropdownMenuProps = {
  trigger: (props: DropdownTriggerProps) => ReactNode;
  items: DropdownItem[];
  align?: "left" | "right" | "center";
  size?: "sm" | "md";
  className?: string;
  menuClassName?: string;
};

const DropdownMenu = ({
  trigger,
  items,
  align = "right",
  size = "md",
  className,
  menuClassName,
}: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { setLoggedInUser } = useRootContext();

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const alignClass =
    align === "left"
      ? styles.alignLeft
      : align === "center"
        ? styles.alignCenter
        : styles.alignRight;

  const handleItemClick = (item: DropdownItem) => {
    if (item.type === "divider") return;
    item.onClick?.();
    setOpen(false);
  };

  const pressLogout = () => {
    setUser(null);
    setLoggedInUser(null);
  };
  return (
    <div className={classNames(styles.dropdown, className)} ref={menuRef}>
      {trigger({
        onClick: () => setOpen((prev) => !prev),
        isOpen: open,
        ariaExpanded: open,
        ariaHaspopup: "menu",
      })}
      <div
        className={classNames(
          styles.menu,
          alignClass,
          size === "sm" && styles.menuSm,
          { [styles.menuOpen]: open },
          menuClassName
        )}
        role="menu"
      >
        {items.map((item, index) => {
          if (item.type === "divider") {
            return <div key={item.id ?? `divider-${index}`} className={styles.divider} />;
          }

          const itemClassName = classNames(styles.item, {
            [styles.itemDanger]: item.variant === "danger",
          });

          if (item.isLogout) {
            return (
              <button
                key={item.id ?? item.label}
                type="button"
                className={itemClassName}
                role="menuitem"
                onClick={pressLogout}
              >
                {item.label}
              </button>
            )
          }
          if (item.href) {
            return (
              <a
                key={item.id ?? item.label}
                href={item.href}
                className={itemClassName}
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            );
          }

          return (
            <button
              key={item.id ?? item.label}
              type="button"
              className={itemClassName}
              role="menuitem"
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DropdownMenu;
