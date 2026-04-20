import classNames from "classnames";
import styles from "./trustStrip.module.scss";
import { RiShieldCheckFill } from "react-icons/ri";
import { BiSolidCheckShield } from "react-icons/bi";
import { TRUST_STRIP_VARIANT } from "@/shared/enums";
import { BsPatchCheckFill, BsShieldFillCheck, BsStarFill } from "react-icons/bs";

interface ITrustStrip {
    variant?: TRUST_STRIP_VARIANT;
}

const TrustStrip = (props: ITrustStrip) => {
    const { variant = "v1" } = props;
    const trustItems = [
        { icon: 'verified', label: 'Verified Contacts', iconClass: 'tsI1' },
        { icon: 'shield', label: 'GDPR Compliant', iconClass: 'tsI2' },
        { icon: 'star', label: '4.9 Rating', iconClass: 'tsI3' },
    ];

    const trustStrip2Items = [
        {
            label: 'Verified Contacts',
            icon: RiShieldCheckFill,
            iconClass: 't2ShieldBlue',
            starCount: 9,
            starClass: 't2StarsBlue',
            iconSize: 22,
        },
        {
            label: 'GDPR Compliant',
            icon: BiSolidCheckShield,
            iconClass: 't2ShieldAmber',
            starCount: 9,
            starClass: 't2StarsBlue',
            iconSize: 24,
        },
        {
            label: '4.9 Rating',
            icon: BsStarFill,
            iconClass: 't2StarAmber',
            starCount: 5,
            starClass: 't2StarsAmber',
            iconSize: 20,
        },
    ] as const;

    const trustIconMap = {
        verified: BsPatchCheckFill,
        shield: BsShieldFillCheck,
        star: BsStarFill,
    } as const;
    return (
        <div className={classNames(styles.trustStripWrapper, { [styles.v2]: variant === TRUST_STRIP_VARIANT.V2, [styles.v1]: variant === TRUST_STRIP_VARIANT.V1 })}>
            {variant === TRUST_STRIP_VARIANT.V1 && (
                <div className={styles.trustStrip}>
                    {trustItems.map((item) => {
                        const Icon = trustIconMap[item.icon as keyof typeof trustIconMap];

                        return (
                            <div className={styles.tsItem} key={item.label}>
                                <div className={classNames(styles.tsIcon, styles[item.iconClass])}><Icon /></div>
                                <span>{item.label}</span>
                            </div>
                        );
                    })}
                </div>
            )}
            {variant === TRUST_STRIP_VARIANT.V2 && (
                <div className={styles.trustStrip2}>
                    {trustStrip2Items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div className={styles.t2Item} key={item.label}>
                                <div className={classNames(styles.t2Icon, styles[item.iconClass])}>
                                    <Icon size={item.iconSize} />
                                </div>
                                <div className={styles.t2Content}>
                                    <span className={styles.t2Label}>{item.label}</span>
                                    <div className={classNames(styles.t2Stars, styles[item.starClass])}>
                                        {Array.from({ length: item.starCount }).map((_, idx) => (
                                            <BsStarFill key={`${item.label}-${idx}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
};

export default TrustStrip;