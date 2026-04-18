type TrustItem = {
    key: string;
    label: string;
    icon: React.ReactNode;
};

type ProductTrustSectionProps = {
    trustItems: TrustItem[];
    styles: Record<string, string>;
};

const ProductTrustSection = ({ trustItems, styles }: ProductTrustSectionProps) => {
    return (
        <div className={styles.trust}>
            <div className={styles.trustInner}>
                {trustItems.map((item) => (
                    <div key={item.key} className={styles.trustItem}>
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductTrustSection;
