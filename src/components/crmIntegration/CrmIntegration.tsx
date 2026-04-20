import { Col, Container, Row } from "react-bootstrap";
import styles from "./crmIntegration.module.scss";
import classNames from "classnames";
import { BsArrowRepeat, BsFiletypeCsv, BsFillDiagram3Fill, BsFillEnvelopeHeartFill, BsFillLightningChargeFill, BsFillPlugFill } from "react-icons/bs";
import { BiBluetooth, BiCheck, BiDownload } from "react-icons/bi";
import { FaTooth } from "react-icons/fa6";
import { IoMdCloud } from "react-icons/io";

interface ICrmIntegration {
    title?: string;
    description?: string;
}

const CrmIntegration = (props: ICrmIntegration) => {
    const { title, description } = props;
    return (
        <section className={styles.wrapper}>
            <Container>
                <Row>
                    <Col xs={12} lg={5}>
                        <div>
                            {/* Mockup */}
                            <div className={styles.mockupWrapper}>
                                {/* Background Blobs */}
                                <div className={styles.mockupBg}>
                                    <div className={classNames(styles.blob, styles.blob1)}></div>
                                    <div className={classNames(styles.blob, styles.blob2)}></div>
                                </div>

                                {/* Mockup Card */}
                                <div className={styles.mockupCard}>
                                    {/* Glows */}
                                    <div className={classNames(styles.cardGlow, styles.glow1)}></div>
                                    <div className={classNames(styles.cardGlow, styles.glow2)}></div>

                                    {/* Dot Pattern */}
                                    <div className={styles.dotPattern}></div>

                                    {/* Floating Elements */}
                                    {/* <div className={classNames(styles.floatEl, styles.float1)}>
                                        <svg className={styles.toothSvg} viewBox="0 0 40 56">
                                            <path d="M20 4C14 4 8 9 6 15C4 21 5 29 6 35C7 41 9 44 12 44C15 44 15 38 18 38C21 38 21 44 22 44C23 44 23 38 26 38C29 38 29 44 32 44C35 44 37 41 38 35C39 29 40 21 38 15C36 9 30 4 20 4Z" fill="url(#toothGrad)" />
                                            <defs>
                                                <linearGradient id="toothGrad" x1="20" y1="4" x2="20" y2="44">
                                                    <stop offset="0%" stopColor="#0ea5e9" />
                                                    <stop offset="100%" stopColor="#0284c7" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div> */}

                                    <div className={classNames(styles.floatEl, styles.float2)}>
                                        <svg className={styles.starSvg} viewBox="0 0 24 24">
                                            <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" fill="#f59e0b" />
                                        </svg>
                                    </div>

                                    {/* <div className={classNames(styles.floatEl, styles.float3)}>
                                        <div className={styles.circleEl}></div>
                                    </div> */}

                                    {/* Content */}
                                    <div className={styles.mockupContent}>
                                        {/* Header */}
                                        <div className={styles.mockupHeader}>
                                            <div className={styles.headerIcon}>
                                                <FaTooth />
                                            </div>
                                            <div>
                                                <div className={styles.headerTitle}>Dentist Email List</div>
                                                <div className={styles.headerSubtitle}>930K+ verified contacts</div>
                                            </div>
                                        </div>

                                        {/* Flow Visual */}
                                        <div className={styles.flowVisual}>
                                            {/* Data Panel */}
                                            <div className={styles.dataPanel}>
                                                <div className={styles.dataPanelTitle}>Contacts</div>
                                                <div className={styles.dataItem}>
                                                    <div className={classNames(styles.dataAvatar, styles.blue)}>JE</div>
                                                    Dr. Evans
                                                </div>
                                                <div className={styles.dataItem}>
                                                    <div className={classNames(styles.dataAvatar, styles.teal)}>CM</div>
                                                    Dr. Martinez
                                                </div>
                                                <div className={styles.dataItem}>
                                                    <div className={classNames(styles.dataAvatar, styles.indigo)}>EW</div>
                                                    Dr. Wilson
                                                </div>
                                            </div>

                                            {/* Center Flow */}
                                            <div className={styles.centerFlow}>
                                                <div className={styles.flowLine}></div>
                                                <div className={styles.flowLine}></div>
                                                <div className={styles.csvBadge}>
                                                    <div className={styles.csvIcon}>
                                                        <BsFiletypeCsv/>
                                                    </div>
                                                    <div className={styles.csvText}>CSV</div>
                                                </div>
                                                <div className={styles.flowLine}></div>
                                                <div className={styles.flowLine}></div>
                                            </div>

                                            {/* Integration Panel */}
                                            <div className={styles.integrationPanel}>
                                                <div className={styles.integrationPanelTitle}>Platforms</div>
                                                <div className={styles.integrationItem}>
                                                    <div className={classNames(styles.integrationIcon, styles.sf)}>
                                                        <IoMdCloud />
                                                    </div>
                                                    <div className={styles.integrationName}>Salesforce</div>
                                                    <div className={styles.integrationCheck}>
                                                        <BiCheck />
                                                    </div>
                                                </div>
                                                <div className={styles.integrationItem}>
                                                    <div className={classNames(styles.integrationIcon, styles.hub)}>
                                                        <BsFillDiagram3Fill />
                                                    </div>
                                                    <div className={styles.integrationName}>HubSpot</div>
                                                    <div className={styles.integrationCheck}>
                                                        <BiCheck />
                                                    </div>
                                                </div>
                                                <div className={styles.integrationItem}>
                                                    <div className={classNames(styles.integrationIcon, styles.mc)}>
                                                        <BsFillEnvelopeHeartFill />
                                                    </div>
                                                    <div className={styles.integrationName}>Mailchimp</div>
                                                    <div className={styles.integrationCheck}>
                                                        <BiCheck />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Features Footer */}
                                        <div className={styles.featuresFooter}>
                                            <div className={styles.featurePill}>
                                                <div className={classNames(styles.featurePillIcon, styles.blue)}>
                                                    <BiDownload />
                                                </div>
                                                <div className={styles.featurePillText}>Export</div>
                                            </div>
                                            <div className={styles.featurePill}>
                                                <div className={classNames(styles.featurePillIcon, styles.teal)}>
                                                    <BsArrowRepeat />
                                                </div>
                                                <div className={styles.featurePillText}>Import</div>
                                            </div>
                                            <div className={styles.featurePill}>
                                                <div className={classNames(styles.featurePillIcon, styles.indigo)}>
                                                    <BsFillLightningChargeFill />
                                                </div>
                                                <div className={styles.featurePillText}>Launch</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} lg={7}>
                        <h2>Effortless CRM Integration for <br /> <span className="shifting-accent">Dental Professionals</span></h2>
                        <p>Our medical email lists are available in CSV format, making them seamlessly compatible with top healthcare CRMs like Salesforce Health Cloud, HubSpot, and email marketing platforms such as Mailchimp. </p>
                        <p>Streamline your physician outreach, automate follow-ups, and optimize engagement with a hassle-free integration process.</p>

                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CrmIntegration;