import React from 'react';
import classname from 'classnames';
import styles from './dataBeneficiaries.module.scss';
import { Container } from 'react-bootstrap';
import Image from 'next/image';

type NodeColor = 'blue' | 'teal' | 'indigo' | 'amber' | 'emerald' | 'rose';
type NodePosition = 'node1' | 'node2' | 'node3' | 'node4' | 'node5' | 'node6';

const beneficiaryNodes: Array<{ iconClass: string; label: string; color: NodeColor; positionClass: NodePosition }> = [
    { iconClass: 'bi bi-megaphone', label: 'Healthcare Marketers', color: 'blue', positionClass: 'node1' },
    { iconClass: 'bi bi-briefcase', label: 'Recruiters & Staffing', color: 'teal', positionClass: 'node2' },
    { iconClass: 'bi bi-tools', label: 'Device Suppliers', color: 'indigo', positionClass: 'node3' },
    { iconClass: 'bi bi-capsule', label: 'Pharma Companies', color: 'amber', positionClass: 'node4' },
    { iconClass: 'bi bi-mortarboard', label: 'CME Providers', color: 'emerald', positionClass: 'node5' },
    { iconClass: 'bi bi-clipboard2-pulse', label: 'Clinical Studies', color: 'rose', positionClass: 'node6' },
];

const DataBeneficiaries = () => {
    return (
        <section>
            <Container>
                <div className={styles.mockupContainer}>
                    <div className={classname(styles.blob, styles.blob1)}></div>
                    <div className={classname(styles.blob, styles.blob2)}></div>
                    <div className={styles.dotGrid}></div>

                    <div className={styles.particles}>
                        <div className={styles.particle}></div>
                        <div className={styles.particle}></div>
                        <div className={styles.particle}></div>
                        <div className={styles.particle}></div>
                    </div>

                    <div className={styles.mockupContent}>
                        <div className={styles.mockupHeader}>
                            <h2 className={styles.mockupTitle}>
                                Who Can <span className='shifting-accent'>Benefit</span> from this Data?
                            </h2>
                            <p className={styles.mockupSubtitle}>Verified dentist contacts for targeted outreach</p>
                        </div>

                        <div className={styles.centerVisual}>
                            <div className={styles.connections}>
                                <svg className={styles.connectionsSvg} width="100%" height="100%">
                                    <line x1="50%" y1="50%" x2="15%" y2="15%" stroke="rgba(14,165,233,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                                    <line x1="50%" y1="50%" x2="85%" y2="15%" stroke="rgba(20,184,166,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                                    <line x1="50%" y1="50%" x2="12%" y2="50%" stroke="rgba(99,102,241,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                                    <line x1="50%" y1="50%" x2="88%" y2="50%" stroke="rgba(245,158,11,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                                    <line x1="50%" y1="50%" x2="20%" y2="85%" stroke="rgba(16,185,129,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                                    <line x1="50%" y1="50%" x2="80%" y2="85%" stroke="rgba(244,63,94,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                                </svg>
                            </div>

                            <div className={styles.beneficiaryNodes}>
                                {beneficiaryNodes.map((node) => (
                                    <div key={node.label} className={classname(styles.node, styles[node.positionClass])}>
                                        <div className={classname(styles.nodeIcon, styles[node.color])}>
                                            <i className={node.iconClass}></i>
                                        </div>
                                        <div className={styles.nodeText}>{node.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.dataHub}>
                                 <Image src="/logo-icon-white.png" width={60} height={60} alt='Logo Icon' style={{ objectFit: "scale-down" }} />
                                <div className={styles.dataHubText}>930K+ Dentist Contacts</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default DataBeneficiaries;