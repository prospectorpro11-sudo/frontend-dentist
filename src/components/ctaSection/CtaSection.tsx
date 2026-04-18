import classNames from "classnames";
import { BsBullseye, BsFunnelFill, BsHeadset } from "react-icons/bs";
import styles from "./ctaSection.module.scss";

type CtaSectionProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
};

const CtaSection = ({
  title = "Build a Custom List from 930,000+ Contacts",
  description = "Use the Prospector to filter by specialty, location, gender, license type, and more - one-time purchase, no subscription.",
  primaryLabel = "Open Prospector",
  primaryHref = "#",
  secondaryLabel = "Talk to Sales",
  secondaryHref = "#",
  className,
}: CtaSectionProps) => {
  return (
    <section className={classNames(styles.cta, className)}>
      <div className={styles.ctaInner}>
        <div className={styles.ctaRing}></div>
        <div className={styles.ctaIcon}>
          <BsBullseye />
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles.ctaBtns}>
          <a href={primaryHref} className={classNames(styles.btn, styles.btnWhite)}>
            <BsFunnelFill /> {primaryLabel}
          </a>
          <a href={secondaryHref} className={classNames(styles.btn, styles.btnGhost)}>
            <BsHeadset /> {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
