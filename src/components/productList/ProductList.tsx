import classNames from 'classnames';
import styles from './productList.module.scss';
import { FaTooth } from 'react-icons/fa';
import {
    BsEmojiSmile,
    BsClipboard2Pulse,
    BsHospital,
    BsBraces,
    BsScissors,
    BsGrid3X3GapFill,
    BsPeopleFill,
    BsCartPlus,
    BsCheckCircleFill,
    BsFunnelFill,
    BsEnvelopeCheckFill,
} from 'react-icons/bs';

const products = [
    {
        category: 'General Dentists',
        description: 'Primary care & routine checkups',
        icon: FaTooth,
        colorClass: 'plCatBlue',
        count: '45,320',
    },
    {
        category: 'Family Dentists',
        description: 'All-ages dental care',
        icon: BsEmojiSmile,
        colorClass: 'plCatTeal',
        count: '38,750',
    },
    {
        category: 'Pediatric Dentists',
        description: 'Children & adolescent care',
        icon: BsClipboard2Pulse,
        colorClass: 'plCatIndigo',
        count: '22,180',
    },
    {
        category: 'Emergency Dentists',
        description: 'Urgent & after-hours care',
        icon: BsHospital,
        colorClass: 'plCatRose',
        count: '15,430',
    },
    {
        category: 'Orthodontists',
        description: 'Braces & alignment specialists',
        icon: BsBraces,
        colorClass: 'plCatAmber',
        count: '19,870',
    },
    {
        category: 'Oral Surgeons',
        description: 'Surgical & maxillofacial care',
        icon: BsScissors,
        colorClass: 'plCatPurple',
        count: '8,920',
    },
];

const trustPills = [
    { icon: BsCheckCircleFill, label: 'Verified Emails' },
    { icon: BsFunnelFill, label: 'Specialty Filtered' },
    { icon: BsEnvelopeCheckFill, label: '95% Deliverability' },
];

const ProductList = () => {
    return (
        <section className={styles.productList}>
            <div className={styles.productListContainer}>

                {/* Background decorations */}
                <div className={classNames(styles.plBlob, styles.plBlob1)}></div>
                <div className={classNames(styles.plBlob, styles.plBlob2)}></div>
                <div className={classNames(styles.plBlob, styles.plBlob3)}></div>

                {/* Section Header */}
                <div className={styles.plHeader}>
                    <div className={styles.plBadgeWrap}>
                        <span className={styles.plBadge}><BsGrid3X3GapFill /> Email Lists</span>
                    </div>
                    <h2 className={styles.plHeading}>
                        Choose Your <span>Dentist Email List</span>
                    </h2>
                    <p className={styles.plSub}>
                        Purchase targeted dentist email lists by specialty. All lists include
                        verified emails and are ready for marketing.
                    </p>

                    {/* Trust pills */}
                    <div className={styles.plTrustPills}>
                        {trustPills.map((pill, index) => {
                            const Icon = pill.icon;
                            return (
                                <div key={index} className={styles.plTrustPill}>
                                    <div className={styles.plTrustIcon}><Icon /></div>
                                    {pill.label}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 4-Column Product Table */}
                <div className={styles.plTableSection}>
                    <div className={styles.plTableCardNew}>

                        {/* Table Header Bar */}
                        <div className={styles.plNewTableHead}>
                            <div className={styles.plNewTh} style={{ flex: 1.2 }}>Product Category</div>
                            <div className={styles.plNewTh} style={{ flex: 0.8 }}>Contacts</div>
                            <div className={styles.plNewTh} style={{ flex: 0.8, textAlign: 'right' }}>Action</div>
                        </div>

                        {/* Table Body */}
                        <div className={styles.plNewTableBody}>

                            {products.map((product, index) => {
                                const Icon = product.icon;
                                return (
                                    <div key={index} className={styles.plNewRow}>
                                        <div className={styles.plNewCell} style={{ flex: 1.2 }}>
                                            <div className={classNames(styles.plCatIcon, styles[product.colorClass])}>
                                                <Icon />
                                            </div>
                                            <div className={styles.plCatInfo}>
                                                <strong>{product.category}</strong>
                                                <span>{product.description}</span>
                                            </div>
                                        </div>
                                        <div className={styles.plNewCell} style={{ flex: 0.8 }}>
                                            <div className={styles.plCountBadge}>
                                                <BsPeopleFill />
                                                <strong>{product.count}</strong>
                                            </div>
                                        </div>
                                        <div className={classNames(styles.plNewCell, styles.plActionCell)} style={{ flex: 0.8 }}>
                                            <a href="#" className={styles.plCartBtn}><BsCartPlus /> Add to Cart</a>
                                            <a href="#" className={styles.plCustomizeLink}>Customize</a>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProductList;
