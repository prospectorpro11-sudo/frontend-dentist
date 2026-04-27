import Link from 'next/link';
import { fetchEditorProducts, toCatalogItem } from "@/server/editorProducts";
import { productCatalog } from "@/shared/productCatalog";
import classNames from 'classnames';
import Button from '../button/Button';
import { COLORS } from '@/shared/colors';
import styles from './productList.module.scss';
import { Col, Container } from 'react-bootstrap';
import { BUTTON_VARIANT_ENUM } from '@/shared/enums';
import { HiMiniArrowUpRight } from 'react-icons/hi2';
import LogoIcon from '@/components/logoIcon/LogoIcon';
import { IProductList } from '../../shared/interface';
import {
    BsGrid3X3GapFill,
    BsPeopleFill,
    BsCheckCircleFill,
    BsFunnelFill,
    BsEnvelopeCheckFill,
} from 'react-icons/bs';

const trustIcons = {
    check: BsCheckCircleFill,
    filter: BsFunnelFill,
    deliverability: BsEnvelopeCheckFill,
} as const;

const ProductList = async (props: IProductList) => {
    const { trustPills: trustPills, heading, headingAccent, subtitle } = props;

    let displayProducts = productCatalog;

    try {
        const editorProducts = await fetchEditorProducts();
        if (editorProducts.length > 0) {
            displayProducts = editorProducts.map((item: any, index: number) => toCatalogItem(item, index));
        }
    } catch (_error) {
        displayProducts = productCatalog;
    }
    console.log(displayProducts)
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

                                {displayProducts.slice(0, 6).map((product, index) => {
                                    const colorKeys = ["Blue", "Teal", "Indigo", "Rose", "Amber", "Purple", "Cyan", "Emerald"];
                                    const color = colorKeys[index % colorKeys.length];

                                    return (
                                        <div key={index} className={styles.plNewRow}>
                                            <div className={styles.plNewCell} style={{ flex: 1.2 }}>
                                                <div className={classNames(styles.plCatIcon, styles[`plCat${color}`])}>
                                                    <LogoIcon width={24} height={24} variant="white" style={{ objectFit: "scale-down" }} />
                                                </div>
                                                <div className={styles.plCatInfo}>
                                                    <strong>{product.productName}</strong>
                                                    {/* <span>{product.stateName || "Specialists"}</span> */}
                                                </div>
                                            </div>
                                            <div className={styles.plNewCell} style={{ flex: 0.8 }}>
                                                <div className={styles.plCountBadge}>
                                                    <BsPeopleFill color={COLORS.PRIMARY} />
                                                    <strong>{product.stats.totalContacts.toLocaleString("en-US")}</strong>
                                                </div>
                                            </div>
                                            <div className={classNames(styles.plNewCell, styles.plActionCell)} style={{ flex: 0.8 }}>
                                                <Link href={`/prospector?specialization=${encodeURIComponent(product.stateId || product.slug || product.productName)}`} className={styles.plCustomizeLink}>
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
