import { Col, Container, Row } from "react-bootstrap";
import styles from "./crmIntegration.module.scss";
import classNames from "classnames";
import {
    BsArrowRepeat,
    BsFiletypeCsv,
    BsFillDiagram3Fill,
    BsFillEnvelopeHeartFill,
    BsFillLightningChargeFill,
} from "react-icons/bs";
import { BiCheck, BiDownload } from "react-icons/bi";
import { FaBolt, FaRepeat } from "react-icons/fa6";
import { IoMdCloud } from "react-icons/io";
import Button from "../button/Button";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";
import LogoIcon from "../logoIcon/LogoIcon";
import { FiDownload } from "react-icons/fi";
import { ICrmIntegrationSeed } from "@/shared/interface";

const CrmIntegration = (props: ICrmIntegrationSeed) => {
    const { left, right } = props;

    return (
        <section className={styles.wrapper}>
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} lg={5}>
                        <div className="d-flex justify-content-center">
                            <div className={styles.mockupWrapper}>
                                <div className={styles.mockupBg}>
                                    <div className={classNames(styles.blob, styles.blob1)}></div>
                                    <div className={classNames(styles.blob, styles.blob2)}></div>
                                </div>

                                <div className={styles.mockupCard}>
                                    <div className={styles.chips}>
                                        <div className={classNames(styles.chip, styles.chip1)}>
                                            <div className={styles.icon}>
                                                <FiDownload />
                                            </div>
                                            <div className={styles.label}>{left.chips[0]}</div>
                                        </div>
                                        <div className={classNames(styles.chip, styles.chip2)}>
                                            <div className={styles.icon}>
                                                <FaRepeat />
                                            </div>
                                            <div className={styles.label}>{left.chips[1]}</div>
                                        </div>
                                        <div className={classNames(styles.chip, styles.chip3)}>
                                            <div className={styles.icon}>
                                                <FaBolt />
                                            </div>
                                            <div className={styles.label}>{left.chips[2]}</div>
                                        </div>
                                    </div>
                                    <div className={classNames(styles.cardGlow, styles.glow1)}></div>
                                    <div className={classNames(styles.cardGlow, styles.glow2)}></div>
                                    <div className={styles.dotPattern}></div>

                                    <div className={classNames(styles.floatEl, styles.float2)}>
                                        <svg className={styles.starSvg} viewBox="0 0 24 24">
                                            <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" fill="#f59e0b" />
                                        </svg>
                                    </div>

                                    <div className={styles.mockupContent}>
                                        <div className={styles.mockupHeader}>
                                            <div className={styles.headerIcon}>
                                                <LogoIcon width={25} height={25} variant="white" alt="logo icon" style={{ objectFit: "scale-down" }} />
                                            </div>
                                            <div>
                                                <div className={styles.headerTitle}>{left.headerTitle}</div>
                                                <div className={styles.headerSubtitle}>{left.headerSubtitle}</div>
                                            </div>
                                        </div>

                                        <div className={styles.flowVisual}>
                                            <div className={styles.dataPanel}>
                                                <div className={styles.dataPanelTitle}>{left.dataPanelTitle}</div>
                                                {left.contacts.map((contact) => (
                                                    <div key={contact.name} className={styles.dataItem}>
                                                        <div className={classNames(styles.dataAvatar, styles[contact.color])}>{contact.initials}</div>
                                                        {contact.name}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className={styles.centerFlow}>
                                                <div className={styles.flowLine}></div>
                                                <div className={styles.flowLine}></div>
                                                <div className={styles.csvBadge}>
                                                    <div className={styles.csvIcon}>
                                                        <BsFiletypeCsv />
                                                    </div>
                                                    <div className={styles.csvText}>{left.csvText}</div>
                                                </div>
                                                <div className={styles.flowLine}></div>
                                                <div className={styles.flowLine}></div>
                                            </div>

                                            <div className={styles.integrationPanel}>
                                                <div className={styles.integrationPanelTitle}>{left.integrationPanelTitle}</div>
                                                {left.platforms.map((platform) => (
                                                    <div key={platform.name} className={styles.integrationItem}>
                                                        <div className={classNames(styles.integrationIcon, styles[platform.color])}>
                                                            {platform.icon === 'cloud' && <IoMdCloud />}
                                                            {platform.icon === 'diagram' && <BsFillDiagram3Fill />}
                                                            {platform.icon === 'envelope-heart' && <BsFillEnvelopeHeartFill />}
                                                        </div>
                                                        <div className={styles.integrationName}>{platform.name}</div>
                                                        <div className={styles.integrationCheck}>
                                                            <BiCheck />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className={styles.featuresFooter}>
                                            <div className={styles.featurePill}>
                                                <div className={classNames(styles.featurePillIcon, styles.blue)}>
                                                    <BiDownload />
                                                </div>
                                                <div className={styles.featurePillText}>{left.featuresFooter[0]}</div>
                                            </div>
                                            <div className={styles.featurePill}>
                                                <div className={classNames(styles.featurePillIcon, styles.teal)}>
                                                    <BsArrowRepeat />
                                                </div>
                                                <div className={styles.featurePillText}>{left.featuresFooter[1]}</div>
                                            </div>
                                            <div className={styles.featurePill}>
                                                <div className={classNames(styles.featurePillIcon, styles.indigo)}>
                                                    <BsFillLightningChargeFill />
                                                </div>
                                                <div className={styles.featurePillText}>{left.featuresFooter[2]}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} lg={7}>
                        <h2 className={styles.heading}>{right.title} <br /> <span className="shifting-accent">{right.titleAccent}</span></h2>
                        <p>{right.description1}</p>
                        <p>{right.description2}</p>
                        <br />
                        <Button variant={BUTTON_VARIANT_ENUM.PRIMARY}>{right.buttonText}</Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CrmIntegration;
