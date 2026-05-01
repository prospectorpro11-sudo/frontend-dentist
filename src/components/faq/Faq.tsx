'use client';
import { useState } from 'react';
import classNames from 'classnames';

import styles from './faq.module.scss';
import { IFaq } from '../../shared/interface';
import Button from '../button/Button';
import { BUTTON_VARIANT_ENUM } from '@/shared/enums';
import { COMMON_URLS } from '@/shared/constant';

const Faq = (props: IFaq) => {
    const { stats: stats, columns: faqColumns, title, description } = props;
    const [openItems, setOpenItems] = useState<Record<string, boolean>>(() =>
        faqColumns.flat().reduce((acc, item) => {
            acc[item.question] = true;
            return acc;
        }, {} as Record<string, boolean>)
    );

    const handleToggle = (question: string) => {
        setOpenItems((prev) => ({
            ...prev,
            [question]: !prev[question],
        }));
    };

    return (
        <section className={styles.faqSection}>
            <div className={classNames('container', styles.faqContainer)}>
                <div className={classNames(styles.faqBlob, styles.faqBlob1)}></div>
                <div className={classNames(styles.faqBlob, styles.faqBlob2)}></div>
                <div className={classNames(styles.faqBlob, styles.faqBlob3)}></div>
                <div className={classNames(styles.faqBlob, styles.faqBlob4)}></div>

                <div className={styles.faqTopRow}>
                    <div className={styles.faqHeaderText}>
                        <div className={styles.faqBadgeWrap}>
                            <span className={styles.faqBadge}>
                                <i className="bi bi-question-lg"></i> Got Questions?
                            </span>
                        </div>
                        <h2 className={styles.faqHeading}>
                            {title ? title : <>
                                Got Questions?
                                <br />
                                We&apos;ve Got <span>Answers.</span>
                            </>}
                        </h2>
                        <p className={styles.faqSub}>
                            {description ? description : <>Find quick answers about our dentist email database, targeted lead
                                sourcing with the Prospector tool, and everything in between.</>}
                        </p>

                        <div className={styles.faqStatsRow}>
                            {stats.map((stat) => (
                                <div
                                    key={`${stat.value}-${stat.label}`}
                                    className={styles.faqStatPill}
                                >
                                    <i className={classNames('bi', stat.icon)}></i>
                                    <span>
                                        <strong>{stat.value}</strong> {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.faqVisual}>
                        <div className={styles.faqScene}>
                            <div className={styles.faqSceneGlow}></div>

                            <div className={styles.faqChatCard}>
                                <div className={styles.faqChatBar}>
                                    <div className={styles.faqChatDots}>
                                        <span
                                            className={classNames(styles.faqCdot, styles.faqCdotR)}
                                        ></span>
                                        <span
                                            className={classNames(styles.faqCdot, styles.faqCdotY)}
                                        ></span>
                                        <span
                                            className={classNames(styles.faqCdot, styles.faqCdotG)}
                                        ></span>
                                    </div>
                                    <div className={styles.faqChatSearch}>
                                        <i className="bi bi-search"></i>
                                        How do I get started?
                                        <i className="bi bi-shield-check"></i>
                                    </div>
                                </div>

                                <div className={styles.faqChatBody}>
                                    <div className={styles.faqBotMsg}>
                                        <div className={styles.faqBotAvatar}>Q</div>
                                        <div className={styles.faqMsgBubble}>
                                            <span className={styles.faqMsgQuestion}>
                                                How many contacts are included?
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.faqAiMsg}>
                                        <div className={styles.faqAiAvatar}>
                                            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                                                <path
                                                    d="M12 2C8 2 4 6 3 10.5 2 15 3 21 5 26 6 28 8 28 9 28 10 28 11 24 13 24s3 4 4 4c1 0 3 0 4-2 2-5 3-11 2-15.5C20 6 16 2 12 2z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M8 10l3 6 3-4 2 4 3-6"
                                                    stroke="#0ea5e9"
                                                    strokeWidth="1.2"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </div>
                                        <div className={styles.faqMsgReply}>
                                            <span>
                                                The database contains 930,285+ verified dentist
                                                contacts with emails, phones & more.
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.faqAiMsg}>
                                        <div className={styles.faqAiAvatar}>
                                            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                                                <path
                                                    d="M12 2C8 2 4 6 3 10.5 2 15 3 21 5 26 6 28 8 28 9 28 10 28 11 24 13 24s3 4 4 4c1 0 3 0 4-2 2-5 3-11 2-15.5C20 6 16 2 12 2z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M8 10l3 6 3-4 2 4 3-6"
                                                    stroke="#0ea5e9"
                                                    strokeWidth="1.2"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </div>
                                        <div className={styles.faqMsgReply}>
                                            <span className={styles.faqTyping}>
                                                All GDPR compliant ✨
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={classNames(styles.faqFloatQ, styles.faqFqTl)}>
                                <svg viewBox="0 0 48 48" width="38" height="38">
                                    <circle cx="24" cy="24" r="22" fill="url(#faqQG1)" opacity="0.9" />
                                    <text
                                        x="24"
                                        y="32"
                                        textAnchor="middle"
                                        fontSize="28"
                                        fontWeight="800"
                                        fill="white"
                                        fontFamily="Plus Jakarta Sans, sans-serif"
                                    >
                                        ?
                                    </text>
                                    <defs>
                                        <linearGradient id="faqQG1" x1="0" y1="0" x2="48" y2="48">
                                            <stop stopColor="#0ea5e9" />
                                            <stop offset="1" stopColor="#14b8a6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            <div className={classNames(styles.faqFloatQ, styles.faqFqTr)}>
                                <svg viewBox="0 0 48 48" width="32" height="32">
                                    <circle cx="24" cy="24" r="22" fill="url(#faqQG2)" opacity="0.8" />
                                    <text
                                        x="24"
                                        y="32"
                                        textAnchor="middle"
                                        fontSize="28"
                                        fontWeight="800"
                                        fill="white"
                                        fontFamily="Plus Jakarta Sans, sans-serif"
                                    >
                                        ?
                                    </text>
                                    <defs>
                                        <linearGradient id="faqQG2" x1="0" y1="0" x2="48" y2="48">
                                            <stop stopColor="#6366f1" />
                                            <stop offset="1" stopColor="#818cf8" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            <div className={classNames(styles.faqFloatBadge, styles.faqFbBl)}>
                                <i className="bi bi-headset"></i>
                                <span>24/7 Support</span>
                            </div>

                            <div className={classNames(styles.faqFloatBadge, styles.faqFbTr)}>
                                <i className="bi bi-patch-check-fill"></i>
                                <span>Verified Info</span>
                            </div>

                            <div className={classNames(styles.faqSpk, styles.faqSpk1)}>
                                <svg width="12" height="12" viewBox="0 0 12 12">
                                    <path
                                        d="M6 0l1.5 4.5L12 6 7.5 7.5 6 12 4.5 7.5 0 6 4.5 4.5z"
                                        fill="#f59e0b"
                                        opacity="0.5"
                                    />
                                </svg>
                            </div>
                            <div className={classNames(styles.faqSpk, styles.faqSpk2)}>
                                <svg width="10" height="10" viewBox="0 0 10 10">
                                    <path
                                        d="M5 0l1.2 3.5L10 5 6.2 6.2 5 10 3.8 6.2 0 5 3.8 3.5z"
                                        fill="#0ea5e9"
                                        opacity="0.35"
                                    />
                                </svg>
                            </div>
                            <div className={classNames(styles.faqSpk, styles.faqSpk3)}>
                                <svg width="8" height="8" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3.5" fill="#14b8a6" opacity="0.25" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.faqGrid}>
                    {faqColumns.map((column, colIndex) => (
                        <div key={`col-${colIndex + 1}`} className={styles.faqCol}>
                            {column.map((item) => {
                                const isOpen = openItems[item.question] ?? true;

                                return (
                                    <div
                                        key={item.question}
                                        className={classNames(styles.faqItem, {
                                            [styles.open]: isOpen,
                                        })}
                                    >
                                        <div className={styles.faqItemAccent}></div>
                                        <button
                                            className={styles.faqTrigger}
                                            type="button"
                                            onClick={() => handleToggle(item.question)}
                                            aria-expanded={isOpen}
                                        >
                                            <span className={styles.faqQ}>{item.question}</span>
                                            <span className={styles.faqToggle}>
                                                <i className="bi bi-chevron-down"></i>
                                            </span>
                                        </button>
                                        <div className={styles.faqAnswer}>
                                            <div className={styles.faqAnswerInner}>{item.answer}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className={styles.faqCtaCard}>
                    <div className={classNames(styles.faqCtaDeco, styles.faqCtaDeco1)}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9 8.42 8.42 0 012.7 3.1"
                                stroke="white"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </div>
                    <div className={classNames(styles.faqCtaDeco, styles.faqCtaDeco2)}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
                                stroke="white"
                                strokeWidth="1.5"
                            />
                            <polyline
                                points="15 3 21 3 21 9"
                                stroke="white"
                                strokeWidth="1.5"
                            />
                            <line x1="10" y1="14" x2="21" y2="3" stroke="white" strokeWidth="1.5" />
                        </svg>
                    </div>
                    <p className={styles.faqCtaText}>Can&apos;t find what you&apos;re looking for?</p>
                    <p className={styles.faqCtaSub}>
                        Our dental data specialists are here to help you find the perfect
                        solution.
                    </p>
                    <div className={styles.faqCtaGroup}>
                        <a href="#">
                            <Button variant={BUTTON_VARIANT_ENUM.TERTIARY_SECONDARY}>
                                <i className="bi bi-envelope-fill"></i>
                                Contact Our Team
                            </Button>
                        </a>
                        <a href={COMMON_URLS.freeSample}>
                            <Button variant={BUTTON_VARIANT_ENUM.GLASS}>
                                <i className="bi bi-download"></i>
                                Download Free Sample
                            </Button>
                        </a>
                    </div>
                    <div className={styles.faqCtaTrusts}>
                        <span>
                            <i className="bi bi-clock-fill"></i> Avg. response within 24h
                        </span>
                        <span>
                            <i className="bi bi-patch-check-fill"></i> No spam, ever
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;