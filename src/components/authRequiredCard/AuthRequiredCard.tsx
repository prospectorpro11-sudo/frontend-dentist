'use client';

import { IconType } from "react-icons";
import { FiLoader, FiLogIn, FiShield } from "react-icons/fi";

import { useRootContext } from "@/contexts/RootContext";
import Button from "@/components/button/Button";
import { BUTTON_SIZE_ENUM, BUTTON_VARIANT_ENUM } from "@/shared/enums";
import styles from "./authRequiredCard.module.scss";

type AuthRequiredCardProps = {
    heading?: string;
    message?: string;
    buttonLabel?: string;
    checking?: boolean;
    icon?: IconType;
    className?: string;
};

const AuthRequiredCard = ({
    heading = "Login Required",
    message = "",
    buttonLabel = "Log In to Continue",
    checking = false,
    icon: Icon = FiShield,
    className,
}: AuthRequiredCardProps) => {
    const { setAuthEnable, setLoginVisible } = useRootContext();

    const pressLogin = () => {
        setLoginVisible(true);
        setAuthEnable(true);
    };

    if (checking) {
        return (
            <section className={`${styles.card} ${styles.loadingCard} ${className ?? ""}`}>
                <div className={styles.glow} aria-hidden="true" />
                <div className={styles.loadingSpinnerWrap}>
                    <FiLoader className={styles.spinner} aria-hidden="true" />
                </div>
            </section>
        );
    }

    return (
        <section className={`${styles.card} ${className ?? ""}`}>
            <div className={styles.glow} aria-hidden="true" />

            <div className={styles.iconWrap}>
                <Icon />
            </div>

            <h3 className={styles.heading}>{heading}</h3>
            <p className={styles.message}>{message}</p>

            <div className={styles.actions}>
                <Button
                    variant={BUTTON_VARIANT_ENUM.ACTION}
                    size={BUTTON_SIZE_ENUM.LARGE}
                    onClick={pressLogin}
                    icon={<FiLogIn />}
                    className={styles.loginButton}
                >
                    {buttonLabel}
                </Button>
            </div>
        </section>
    );
};

export default AuthRequiredCard;
