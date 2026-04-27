import classNames from 'classnames';
import styles from './productList.module.scss';
import {
    BsGrid3X3GapFill,
    BsPeopleFill,
    BsCheckCircleFill,
    BsFunnelFill,
    BsEnvelopeCheckFill,
} from 'react-icons/bs';
import { HiMiniArrowUpRight } from 'react-icons/hi2';
import Link from 'next/link';
import LogoIcon from '@/components/logoIcon/LogoIcon';
import { IProductList } from '../../shared/interface';
import { COLORS } from '@/shared/colors';
import Button from '../button/Button';
import { BUTTON_SIZE_ENUM, BUTTON_VARIANT_ENUM } from '@/shared/enums';
import { Col, Container } from 'react-bootstrap';



const trustIcons = {
    check: BsCheckCircleFill,
    filter: BsFunnelFill,
    deliverability: BsEnvelopeCheckFill,
} as const;

const ProductList = (props: IProductList) => {
    const { products: products, trustPills: trustPills, heading, headingAccent, subtitle } = props;

    return (
        <section className={styles.productList}>
            <Container>

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
                        {heading} <span>{headingAccent}</span>
                    </h2>
                    <p className={styles.plSub}>
                        {subtitle}
                    </p>

                    {/* Trust pills */}
                    <div className={styles.plTrustPills}>
                        {trustPills.map((pill, index) => {
                            const Icon = trustIcons[pill.icon as keyof typeof trustIcons];
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
                <Col xs={12} lg={10} className='mx-auto'>
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

                                {products.slice(0, 6).map((product, index) => {
                                    return (
                                        <div key={index} className={styles.plNewRow}>
                                            <div className={styles.plNewCell} style={{ flex: 1.2 }}>
                                                <div className={classNames(styles.plCatIcon, styles[product.colorClass])}>
                                                    <LogoIcon width={24} height={24} variant="white" style={{ objectFit: "scale-down" }} />
                                                </div>
                                                <div className={styles.plCatInfo}>
                                                    <strong>{product.category}</strong>
                                                    <span>{product.description}</span>
                                                </div>
                                            </div>
                                            <div className={styles.plNewCell} style={{ flex: 0.8 }}>
                                                <div className={styles.plCountBadge}>
                                                    <BsPeopleFill color={COLORS.PRIMARY} />
                                                    <strong>{product.count}</strong>
                                                </div>
                                            </div>
                                            <div className={classNames(styles.plNewCell, styles.plActionCell)} style={{ flex: 0.8 }}>
                                                <Link href={`/prospector?specialization=${encodeURIComponent(product.category.toLowerCase().replace(/ /g, '-'))}`} className={styles.plCustomizeLink}>
                                                    <span>Customize</span>
                                                    <span><HiMiniArrowUpRight size={18} /></span>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <Link href="/products/specialities">
                            <Button variant={BUTTON_VARIANT_ENUM.PRIMARY_LIGHT}>Show More</Button>
                        </Link>
                    </div>
                </Col>
            </Container>
        </section>
    );
};

export default ProductList;
