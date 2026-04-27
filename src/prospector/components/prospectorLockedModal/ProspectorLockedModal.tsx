'use client';

import { IconType } from "react-icons";
import {
    FiDownloadCloud,
    FiCircle,
    FiShoppingCart,
    FiShield,
    FiSliders,
    FiX,
} from "react-icons/fi";

import { useProspectorContext } from "@/contexts/ProspectorContext";
import { useRootContext } from "@/contexts/RootContext";
import UCDModal from "@/components/UCDModal/UCDModal";
import { numberWithCommas } from "@/shared/InternalService";
import { useAddToCart } from "@/shared/hooks/useAddToCart";
import styles from "./prospectorLockedModal.module.scss";

type FeatureItem = {
    Icon: IconType;
    title: string;
    description: string;
};

const featureItems: FeatureItem[] = [
    {
        Icon: FiShield,
        title: "Verified Contacts",
        description: "All nurse data is verified and kept up-to-date.",
    },
    {
        Icon: FiSliders,
        title: "Advanced Filters",
        description: "Filter by specialty, location, gender, and more.",
    },
    {
        Icon: FiDownloadCloud,
        title: "Bulk Access",
        description: "Download full filtered lists in one clean export.",
    },
];

const ProspectorLockedModal = () => {
    const { isProspectorLocked, setIsProspectorLocked, stats } = useProspectorContext();
    const { setCartEnable } = useRootContext();
    const { addToCart } = useAddToCart();

    const totalContacts = Math.max(0, Number(stats?.totalContacts) || 0);
    const formattedContacts = numberWithCommas(totalContacts.toString());
    const availabilityLabel = `${formattedContacts}+ Available`;

    const pressClose = () => {
        setIsProspectorLocked(false);
    };

    const pressPrimaryAction = () => {
        setIsProspectorLocked(false);
        addToCart();
    };

    const pressSecondaryAction = () => {
        setIsProspectorLocked(false);
        setCartEnable(true);
    };

    return (
        <UCDModal
            open={isProspectorLocked}
            onHide={pressClose}
            centered
            wrapperClassName={styles.lockedModalWrapper}
            bodyClassName={styles.modalBody}
        >
            <div className={styles.lockedCard}>
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={pressClose}
                    aria-label="Close locked access modal"
                    title="Close"
                >
                    <FiX />
                </button>

                <section className={styles.heroPanel}>
                    <h2 className={styles.title}>Unlock Your Filtered Nurses List</h2>
                    <p className={styles.description}>Unlock your filtered list to get all matched nurse contacts.</p>
                    <div className={styles.heroBadges}>
                        <span className={styles.availabilityBadge}>
                            <FiCircle className={styles.liveDot} />
                            {availabilityLabel}
                        </span>
                        <span className={styles.premiumBadge}>Premium Access</span>
                    </div>

                    <div className={styles.featureGrid}>
                        {featureItems.map(({ Icon, title, description }) => (
                            <article key={title} className={styles.featureCard}>
                                <div className={styles.featureIcon}>
                                    <Icon />
                                </div>
                                <div className={styles.featureTitle}>{title}</div>
                                <p className={styles.featureDescription}>{description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.actionPanel}>
                    <div className={styles.panelEyebrow}>Prospector Locked</div>

                    <div className={styles.metricCard}>
                        <div className={styles.metricValue}>{formattedContacts}</div>
                        <div className={styles.metricLabel}>matched nurse contacts</div>
                        <p className={styles.metricCopy}>
                            Unlock this filtered list to get access to all matched nurse contacts.
                        </p>
                    </div>

                    <div className={styles.selectionCard}>
                        <span className={`${styles.selectionBadge} ${styles.ready}`}>Filtered List Ready</span>
                        <p className={styles.selectionCopy}>Select this filtered list once to unlock the full results.</p>
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={styles.primaryAction} onClick={pressPrimaryAction}>
                            <FiShoppingCart />
                            Unlock Filtered List
                        </button>
                        <button type="button" className={styles.secondaryAction} onClick={pressSecondaryAction}>
                            Open Cart
                        </button>
                    </div>

                    <p className={styles.trustNote}>No credit card required {"\u00B7"} Cancel anytime</p>
                </section>
            </div>
        </UCDModal>
    );
};

export default ProspectorLockedModal;
