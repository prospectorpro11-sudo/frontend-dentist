import { ReactNode } from "react";
import classNames from "classnames";

import styles from "./button.module.scss";
import { BUTTON_RADIUS_ENUM, BUTTON_SIZE_ENUM, BUTTON_VARIANT_ENUM } from "@/shared/enums";

interface IButton {
    variant?: BUTTON_VARIANT_ENUM;
    size?: BUTTON_SIZE_ENUM;
    radius?: BUTTON_RADIUS_ENUM;
    disabled?: boolean;
    onClick?: () => void;
    children?: ReactNode;
    icon?: ReactNode;
    className?: string;
    isFullWidth?: boolean;
    isLoading?: boolean;
    type?: "button" | "submit" | "reset";
}

const Button = (props: IButton) => {
    const { variant = BUTTON_VARIANT_ENUM.PRIMARY, size = BUTTON_SIZE_ENUM.DEFAULT, radius = BUTTON_RADIUS_ENUM.NORMAL, disabled = false, onClick, children, icon, className, isFullWidth = false, isLoading = false, type = "button" } = props;

    const getButtonSize = {
        [BUTTON_SIZE_ENUM.SMALL]: styles.small,
        [BUTTON_SIZE_ENUM.DEFAULT]: styles.sizeDefault,
        [BUTTON_SIZE_ENUM.LARGE]: styles.large,
    }[size];

    const getButtonRadius = {
        [BUTTON_RADIUS_ENUM.NORMAL]: styles.radiusNormal,
        [BUTTON_RADIUS_ENUM.HALF]: styles.radiusHalf,
        [BUTTON_RADIUS_ENUM.LARGE]: styles.radiusLarge,
        [BUTTON_RADIUS_ENUM.FULL]: styles.radiusFull,
    }[radius];

    const getButtonVariant = {
        [BUTTON_VARIANT_ENUM.PRIMARY]: styles.primary,
        [BUTTON_VARIANT_ENUM.PRIMARY_DARK]: styles.primaryDark,
        [BUTTON_VARIANT_ENUM.PRIMARY_LIGHT]: styles.primaryLight,
        [BUTTON_VARIANT_ENUM.TEXT]: styles.text,
        [BUTTON_VARIANT_ENUM.GLASS]: styles.glass,
        [BUTTON_VARIANT_ENUM.DANGER]: styles.danger,
        [BUTTON_VARIANT_ENUM.SUCCESS]: styles.success,
        [BUTTON_VARIANT_ENUM.SECONDARY]: styles.secondary,
        [BUTTON_VARIANT_ENUM.TERTIARY]: styles.tertiary,
        [BUTTON_VARIANT_ENUM.ACTION]: styles.action,
        [BUTTON_VARIANT_ENUM.TERTIARY_SECONDARY]: styles.tertiarySecondary,
    }[variant];

    return (
        <button className={classNames(styles.button, getButtonVariant, getButtonSize, getButtonRadius, className, { [styles.fullWidth]: isFullWidth })} disabled={disabled || isLoading} onClick={onClick} type={type}>
            {icon && <span className={styles.icon}>{icon}</span>}
            {children}
        </button>
    );
};

export default Button;