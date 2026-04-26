'use client';

import dayjs from "dayjs";
import classNames from "classnames";
import React, { useMemo, useState, useCallback, useEffect } from "react";

import styles from "./paymentHistoryTable.module.scss";
import DashboardPageHeader from "../dashboardPageHeader/DashboardPageHeader";
import {
    FaFileInvoiceDollar,
    FaSearch,
    FaSort,
    FaMapMarkerAlt,
    FaVenusMars,
    FaStethoscope,
    FaMapMarkedAlt,
    FaCity,
    FaEnvelope,
    FaCertificate,
    FaCheckCircle,
    FaTimesCircle,
    FaSpinner,
    FaCheck,
    FaFilter,
    FaInfoCircle,
    FaTimes,
    FaEye,
    FaDownload,
    FaReceipt,
    FaHashtag,
    FaCalendar,
    FaClock,
    FaCommentDots,
    FaDollarSign,
    FaShoppingCart,
} from "react-icons/fa";
import { COLORS_ENUM } from "@/shared/enums";
import LogoIcon from "../logoIcon/LogoIcon";

export type PaymentFilterItem = {
    field: string;
    value: string;
};

export type PaymentCartItem = {
    productName: string;
    contacts: number;
    price: number;
    filterItems?: PaymentFilterItem[];
};

export type PaymentRecord = {
    id: string;
    orderId?: string;
    currentCartItem?: PaymentCartItem[];
    totalAmount: number;
    date: number;
    status: string;
    paymentMethod?: string;
    cryptoPayment?: {
        coin?: string;
        network?: string;
    };
};

type PaymentHistoryTableProps = {
    title: string;
    subtitle: string;
    records: PaymentRecord[];
    authLoading: boolean;
    hasUser: boolean;
    loading: boolean;
    error?: string | null;
    emptyMessage: string;
    checkingMessage?: string;
    loginMessage?: string;
    loadingMessage?: string;
    className?: string;
    view?: 'orders' | 'billing';
};

const PaymentHistoryTable = ({
    title,
    subtitle,
    records,
    authLoading,
    hasUser,
    loading,
    error,
    emptyMessage,
    checkingMessage = "Checking your account...",
    loginMessage = "Please log in to view this data.",
    loadingMessage = "Loading...",
    className,
    view = 'orders',
}: PaymentHistoryTableProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [filterTooltip, setFilterTooltip] = useState<{ visible: boolean; recordIndex: number; itemIndex: number; filterType: string | null; position: { x: number; y: number } }>({ visible: false, recordIndex: -1, itemIndex: -1, filterType: null, position: { x: 0, y: 0 } });
    const [productInfoTooltip, setProductInfoTooltip] = useState<{ visible: boolean; recordIndex: number; itemIndex: number; position: { x: number; y: number } }>({ visible: false, recordIndex: -1, itemIndex: -1, position: { x: 0, y: 0 } });
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
    const [billingModal, setBillingModal] = useState<{ visible: boolean; record: PaymentRecord | null }>({ visible: false, record: null });

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
        };
    }, [hoverTimeout]);

    const formatter = useMemo(
        () =>
            new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }),
        []
    );

    const formatDate = (timestamp: number) => {
        if (!timestamp) return "--";
        return dayjs.unix(timestamp).format("YYYY-MM-DD");
    };

    const formatTime = (timestamp: number) => {
        if (!timestamp) return "--";
        return dayjs.unix(timestamp).format("h:mm A");
    };

    const parseFiltersFromName = useCallback((name: string) => {
        const filters: any = {
            states: [],
            countStates: 0,
            cities: [],
            countCities: 0,
            zips: [],
            countZips: 0,
            gender: [],
            countGender: 0,
            specialization: [],
            countSpecialization: 0,
            licenseStates: [],
            countLicense: 0
        };

        const match = name.match(/\((.*?)\)/);
        if (!match) return filters;

        const filterString = match[1];
        
        // Check if it's a complete list
        if (filterString.toLowerCase().includes('complete list')) {
            return { ...filters, isComplete: true };
        }

        const sections = filterString.split(/,(?=\s*(?:State|City|Zip|Specialization|Gender|LicenseState):)/);

        sections.forEach(section => {
            const [key, ...valueParts] = section.split(':');
            const keyTrimmed = key.trim();
            const valueString = valueParts.join(':').trim();

            if (keyTrimmed === 'State') {
                filters.states = valueString.split(';').map((s: string) => s.trim()).filter(Boolean);
                filters.countStates = filters.states.length;
            } else if (keyTrimmed === 'City') {
                filters.cities = valueString.split(';').map((city: string) => {
                    const [state, ...cityParts] = city.split('=');
                    const name = cityParts.join('=').trim();
                    return {
                        name: state ? `${name}, ${state}` : name,
                        count: 1
                    };
                }).filter(Boolean);
                filters.countCities = filters.cities.length;
            } else if (keyTrimmed === 'Zip') {
                filters.zips = valueString.split(';').map((z: string) => z.trim()).filter(Boolean);
                filters.countZips = filters.zips.length;
            } else if (keyTrimmed === 'Specialization') {
                filters.specialization = valueString.split(';').map((s: string) => s.trim()).filter(Boolean);
                filters.countSpecialization = filters.specialization.length;
            } else if (keyTrimmed === 'Gender') {
                filters.gender = valueString.split(';').map((g: string) => g.trim()).filter(Boolean);
                filters.countGender = filters.gender.length;
            } else if (keyTrimmed === 'LicenseState') {
                filters.licenseStates = valueString.split(';').map((s: string) => s.trim()).filter(Boolean);
                filters.countLicense = filters.licenseStates.length;
            }
        });

        return filters;
    }, []);

    const extractProductName = useCallback((name: string) => {
        // Extract product name before the first parenthesis
        const match = name.match(/^(.*?)\s*\(/);
        if (match) {
            return match[1].trim();
        }
        // If no parenthesis, return the whole name
        return name.trim();
    }, []);

    const isCompleteList = useCallback((name: string) => {
        const filters = parseFiltersFromName(name);
        return filters.isComplete === true || (
            filters.countStates === 0 &&
            filters.countCities === 0 &&
            filters.countZips === 0 &&
            filters.countGender === 0 &&
            filters.countSpecialization === 0 &&
            filters.countLicense === 0
        );
    }, [parseFiltersFromName]);

    const handleFilterBadgeHover = useCallback((recordIndex: number, itemIndex: number, filterType: string, event: React.MouseEvent) => {
        // Clear any existing timeout
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }

        const rect = (event.target as HTMLElement).getBoundingClientRect();
        setFilterTooltip({
            visible: true,
            recordIndex,
            itemIndex,
            filterType,
            position: { x: rect.left, y: rect.top }
        });
    }, [hoverTimeout]);

    const handleFilterBadgeLeave = useCallback(() => {
        // Add a small delay before hiding
        const timeout = setTimeout(() => {
            setFilterTooltip(prev => ({ ...prev, visible: false }));
        }, 200);
        setHoverTimeout(timeout);
    }, []);

    const handleTooltipEnter = useCallback(() => {
        // Keep tooltip visible when hovering over it
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
    }, [hoverTimeout]);

    const handleTooltipLeave = useCallback(() => {
        // Hide tooltip when leaving it
        setFilterTooltip(prev => ({ ...prev, visible: false }));
    }, []);

    const handleProductInfoClick = useCallback((recordIndex: number, itemIndex: number, event: React.MouseEvent) => {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        setProductInfoTooltip({
            visible: true,
            recordIndex,
            itemIndex,
            position: { x: rect.left, y: rect.top }
        });
    }, []);

    const closeTooltips = useCallback(() => {
        setFilterTooltip(prev => ({ ...prev, visible: false }));
        setProductInfoTooltip(prev => ({ ...prev, visible: false }));
    }, []);

    const getComments = (record: PaymentRecord) => {
        const status = getStatus(record);
        if (status === 'failed') {
            return 'Payment method declined - insufficient funds';
        }
        if (status === 'pending') {
            return 'Awaiting payment confirmation from bank';
        }
        return '-';
    };

    const handleViewDetails = useCallback((record: PaymentRecord) => {
        setBillingModal({ visible: true, record });
    }, []);

    const closeBillingModal = useCallback(() => {
        setBillingModal({ visible: false, record: null });
    }, []);

    const handleDownloadInvoice = useCallback(() => {
        alert('Invoice download would start here');
    }, []);

    // Handle Escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && billingModal.visible) {
                closeBillingModal();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [billingModal.visible, closeBillingModal]);

    const getStatus = (record: PaymentRecord) => {
        const normalized = record.status?.toLowerCase();
        if (normalized === "paid" || normalized === "completed" || normalized === "success") {
            return 'completed';
        }
        if (normalized === "failed" || normalized === "cancelled" || normalized === "canceled") {
            return 'failed';
        }
        return 'pending';
    };

    const getStatusClass = (status?: string) => {
        const normalized = status?.toLowerCase();
        if (normalized === "paid" || normalized === "completed" || normalized === "success") {
            return styles.statusPaid;
        }
        if (normalized === "failed" || normalized === "cancelled" || normalized === "canceled") {
            return styles.statusFailed;
        }
        return styles.statusPending;
    };

    const getPaymentLabel = (record: PaymentRecord) => {
        if (record.cryptoPayment?.coin) {
            const details = [record.cryptoPayment.coin, record.cryptoPayment.network].filter(Boolean).join(" / ");
            return record.paymentMethod ? `${record.paymentMethod} (${details})` : details;
        }
        return record.paymentMethod || "--";
    };

    const totalSpent = useMemo(
        () => (records || []).reduce((sum, record) => sum + (record.totalAmount || 0), 0),
        [records]
    );

    const approvedCount = useMemo(
        () =>
            (records || []).filter((record) => {
                const normalized = record.status?.toLowerCase();
                return normalized === "paid" || normalized === "completed" || normalized === "success";
            }).length,
        [records]
    );

    const pendingCount = useMemo(
        () =>
            (records || []).filter((record) => {
                const normalized = record.status?.toLowerCase();
                return normalized === "pending" || normalized === "processing";
            }).length,
        [records]
    );

    const failedCount = useMemo(
        () =>
            (records || []).filter((record) => {
                const normalized = record.status?.toLowerCase();
                return normalized === "failed" || normalized === "cancelled" || normalized === "canceled";
            }).length,
        [records]
    );

    const getStats = useMemo(() => {
        if (view === 'billing') {
            return [
                { label: "Total Payments", value: ((records || []).length || 0).toString(), color: COLORS_ENUM.SKY_BLUE },
                {
                    label: "Total Spent", value: formatter.format(totalSpent), isPrice: true, color: COLORS_ENUM.EMERALD
                },
                { label: "Approved", value: approvedCount.toString(), color: COLORS_ENUM.INDIGO }
            ];
        } else {
            return [
                { label: "Total Orders", value: ((records || []).length || 0).toString(), color: COLORS_ENUM.SKY_BLUE },
                {
                    label: "Completed", value: approvedCount.toString(), color: COLORS_ENUM.EMERALD
                },
                { label: "Pending", value: pendingCount.toString(), color: COLORS_ENUM.AMBER }
            ];
        }
    }, [view, records, totalSpent, approvedCount, pendingCount, formatter]);

    const filteredRecords = useMemo(() => {
        let items = records;

        if (searchQuery) {
            items = items.filter((record: PaymentRecord) =>
                record.orderId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                record.currentCartItem?.some((item: PaymentCartItem) =>
                    item.productName?.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        if (activeFilter !== 'all') {
            items = items.filter((record: PaymentRecord) => getStatus(record) === activeFilter);
        }

        return items;
    }, [records, searchQuery, activeFilter]);

    return (
        <div className={classNames(styles.wrapper, className)}>
            <DashboardPageHeader
                title={title}
                description={subtitle}
                icon={FaFileInvoiceDollar}
                stats={getStats}
            />

            {authLoading ? (
                <div className={styles.stateCard}>{checkingMessage}</div>
            ) : !hasUser ? (
                <div className={styles.stateCard}>{loginMessage}</div>
            ) : loading ? (
                <div className={styles.stateCard}>{loadingMessage}</div>
            ) : error ? (
                <div className={styles.errorCard}>{error}</div>
            ) : records.length === 0 ? (
                <div className={styles.stateCard}>{emptyMessage}</div>
            ) : (
                <div className={styles.tableCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.searchBox}>
                            <FaSearch className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder={view === 'billing' ? "Search payments..." : "Search orders..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className={styles.filterChips}>
                            <button
                                className={`${styles.filterChip} ${activeFilter === 'all' ? styles.active : ''}`}
                                onClick={() => setActiveFilter('all')}
                            >
                                <span>All</span>
                            </button>
                            <button
                                className={`${styles.filterChip} ${activeFilter === 'completed' ? styles.active : ''}`}
                                onClick={() => setActiveFilter('completed')}
                            >
                                <FaCheckCircle />
                                <span>{view === 'billing' ? 'Approved' : 'Completed'}</span>
                            </button>
                            <button
                                className={`${styles.filterChip} ${activeFilter === 'pending' ? styles.active : ''}`}
                                onClick={() => setActiveFilter('pending')}
                            >
                                <FaSpinner />
                                <span>Pending</span>
                            </button>
                            {view === 'billing' && (
                                <button
                                    className={`${styles.filterChip} ${activeFilter === 'failed' ? styles.active : ''}`}
                                    onClick={() => setActiveFilter('failed')}
                                >
                                    <FaTimesCircle />
                                    <span>Failed</span>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                {view === 'billing' ? (
                                    <tr>
                                        <th className={styles.colOrderId}>
                                            <span>Order ID</span>
                                            <FaSort className={styles.sortIcon} />
                                        </th>
                                        <th className={styles.colDate}>
                                            <span>Date & Time</span>
                                            <FaSort className={styles.sortIcon} />
                                        </th>
                                        <th className={styles.colStatus}>
                                            <span>Payment Status</span>
                                            <FaSort className={styles.sortIcon} />
                                        </th>
                                        <th className={styles.colComments}>
                                            <span>Comments</span>
                                        </th>
                                        <th className={styles.colAmount}>
                                            <span>Amount</span>
                                            <FaSort className={styles.sortIcon} />
                                        </th>
                                        <th className={styles.colActions}>Actions</th>
                                    </tr>
                                ) : (
                                    <tr>
                                        <th className={styles.colOrderId}>
                                            <span>Order ID</span>
                                            <FaSort className={styles.sortIcon} />
                                        </th>
                                        <th className={styles.colProduct}>
                                            <span>Product</span>
                                            <FaSort className={styles.sortIcon} />
                                        </th>
                                        <th className={styles.colDate}>
                                            <span>Date</span>
                                            <FaSort className={styles.sortIcon} />
                                        </th>
                                        <th className={styles.colStatus}>
                                            <span>Status</span>
                                            <FaSort className={styles.sortIcon} />
                                        </th>
                                        <th className={styles.colAmount}>
                                            <span>Amount</span>
                                            <FaSort className={styles.sortIcon} />
                                        </th>
                                        <th className={styles.colActions}>Actions</th>
                                    </tr>
                                )}
                            </thead>
                            <tbody>
                                {filteredRecords.map((record, recordIndex) => {
                                    const status = getStatus(record);

                                    return (
                                        <tr key={record.id} className={styles.orderRow} data-status={status}>
                                            {view === 'billing' ? (
                                                <>
                                                    <td className={styles.orderIdCell}>
                                                        <div className={styles.orderId}>#{record.orderId || record.id}</div>
                                                    </td>
                                                    <td className={styles.dateCell}>
                                                        <div className={styles.dateMain}>{formatDate(record.date)}</div>
                                                        <div className={styles.dateTime}>{formatTime(record.date)}</div>
                                                    </td>
                                                    <td className={styles.statusCell}>
                                                        {status === 'completed' ? (
                                                            <span className={`${styles.statusBadge} ${styles.completed}`}>
                                                                <FaCheckCircle />
                                                                <span>Approved</span>
                                                            </span>
                                                        ) : status === 'failed' ? (
                                                            <span className={`${styles.statusBadge} ${styles.failed}`}>
                                                                <FaTimesCircle />
                                                                <span>Rejected</span>
                                                            </span>
                                                        ) : (
                                                            <span className={`${styles.statusBadge} ${styles.pending}`}>
                                                                <FaSpinner />
                                                                <span>Pending</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className={styles.commentCell}>
                                                        <div className={styles.commentText}>
                                                            {getComments(record) !== '-' && <FaCommentDots />}
                                                            {getComments(record)}
                                                        </div>
                                                    </td>
                                                    <td className={styles.amountCell}>
                                                        <div className={styles.amountMain}>{formatter.format(record.totalAmount || 0)}</div>
                                                        <div className={styles.amountSub}>{record.currentCartItem?.length || 1} item</div>
                                                    </td>
                                                    <td className={styles.actionsCell}>
                                                        <button
                                                            className={`${styles.actionBtn} ${styles.viewDetailsBtn}`}
                                                            onClick={() => handleViewDetails(record)}
                                                        >
                                                            <FaEye />
                                                            <span>View Details</span>
                                                        </button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className={styles.orderIdCell}>
                                                        <div className={styles.orderId}>#{record.orderId || record.id}</div>
                                                    </td>
                                                    <td className={styles.productCell}>
                                                        {record.currentCartItem?.map((item, itemIndex) => {
                                                            const parsedFilters = parseFiltersFromName(item.productName || '');
                                                            const isComplete = isCompleteList(item.productName || '');
                                                            const productName = extractProductName(item.productName || '');

                                                            return (
                                                                <div key={`${record.id}-${itemIndex}`} className={styles.productHeader}>
                                                                    <div className={styles.productIcon}>
                                                                        <LogoIcon width={26} height={26} variant="white" />
                                                                    </div>
                                                                    <div className={styles.productInfo}>
                                                                        <div className={styles.productName}>{productName}</div>
                                                                        {!isComplete && (
                                                                            <div className={styles.productMeta}>
                                                                                {parsedFilters?.states && parsedFilters.states[0] !== 'All USA' && (
                                                                                    <span
                                                                                        className={`${styles.metaTag} ${styles.badgeStates}`}
                                                                                        onMouseEnter={(e) => handleFilterBadgeHover(recordIndex, itemIndex, 'states', e)}
                                                                                        onMouseLeave={handleFilterBadgeLeave}
                                                                                    >
                                                                                        <FaMapMarkerAlt />
                                                                                        <span className={styles.count}>{parsedFilters.countStates}</span>
                                                                                    </span>
                                                                                )}
                                                                                {parsedFilters?.cities && (
                                                                                    <span
                                                                                        className={`${styles.metaTag} ${styles.badgeCities}`}
                                                                                        onMouseEnter={(e) => handleFilterBadgeHover(recordIndex, itemIndex, 'cities', e)}
                                                                                        onMouseLeave={handleFilterBadgeLeave}
                                                                                    >
                                                                                        <FaCity />
                                                                                        <span className={styles.count}>{parsedFilters.countCities}</span>
                                                                                    </span>
                                                                                )}
                                                                                {parsedFilters?.zips && (
                                                                                    <span
                                                                                        className={`${styles.metaTag} ${styles.badgeZips}`}
                                                                                        onMouseEnter={(e) => handleFilterBadgeHover(recordIndex, itemIndex, 'zips', e)}
                                                                                        onMouseLeave={handleFilterBadgeLeave}
                                                                                    >
                                                                                        <FaEnvelope />
                                                                                        <span className={styles.count}>{parsedFilters.countZips}</span>
                                                                                    </span>
                                                                                )}
                                                                                {parsedFilters?.gender && (
                                                                                    <span
                                                                                        className={`${styles.metaTag} ${styles.badgeGender}`}
                                                                                        onMouseEnter={(e) => handleFilterBadgeHover(recordIndex, itemIndex, 'gender', e)}
                                                                                        onMouseLeave={handleFilterBadgeLeave}
                                                                                    >
                                                                                        <FaVenusMars />
                                                                                        <span className={styles.count}>{parsedFilters.countGender}</span>
                                                                                    </span>
                                                                                )}
                                                                                {parsedFilters?.specialization && (
                                                                                    <span
                                                                                        className={`${styles.metaTag} ${styles.badgeSpecialty}`}
                                                                                        onMouseEnter={(e) => handleFilterBadgeHover(recordIndex, itemIndex, 'specialization', e)}
                                                                                        onMouseLeave={handleFilterBadgeLeave}
                                                                                    >
                                                                                        <FaStethoscope />
                                                                                        <span className={styles.count}>{parsedFilters.countSpecialization}</span>
                                                                                    </span>
                                                                                )}
                                                                                {parsedFilters?.licenseStates && (
                                                                                    <span
                                                                                        className={`${styles.metaTag} ${styles.badgeLicense}`}
                                                                                        onMouseEnter={(e) => handleFilterBadgeHover(recordIndex, itemIndex, 'license', e)}
                                                                                        onMouseLeave={handleFilterBadgeLeave}
                                                                                    >
                                                                                        <FaCertificate />
                                                                                        <span className={styles.count}>{parsedFilters.countLicense}</span>
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </td>
                                                    <td className={styles.dateCell}>
                                                        <div className={styles.dateMain}>{formatDate(record.date)}</div>
                                                        <div className={styles.dateTime}>{formatTime(record.date)}</div>
                                                    </td>
                                                    <td className={styles.statusCell}>
                                                        {status === 'completed' ? (
                                                            <span className={`${styles.statusBadge} ${styles.completed}`}>
                                                                <FaCheckCircle />
                                                                <span>Completed</span>
                                                            </span>
                                                        ) : status === 'failed' ? (
                                                            <span className={`${styles.statusBadge} ${styles.failed}`}>
                                                                <FaTimesCircle />
                                                                <span>Failed</span>
                                                            </span>
                                                        ) : (
                                                            <span className={`${styles.statusBadge} ${styles.pending}`}>
                                                                <FaSpinner />
                                                                <span>Pending</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className={styles.amountCell}>
                                                        <div className={styles.amount}>{formatter.format(record.totalAmount || 0)}</div>
                                                    </td>
                                                    <td className={styles.actionsCell}>
                                                        <div className={styles.actionButtons}>
                                                            {record.currentCartItem?.some((item) => !isCompleteList(item.productName || '')) && (
                                                                <button
                                                                    key={`${record.id}-info`}
                                                                    className={`${styles.actionBtn} ${styles.infoBtn}`}
                                                                    onClick={(e) => handleProductInfoClick(recordIndex, 0, e)}
                                                                >
                                                                    <FaCheck />
                                                                    <span>Product Info</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.tableFooter}>
                        <div className={styles.showingText}>
                            Showing <strong>{filteredRecords.length}</strong> {view === 'billing' ? 'payments' : 'orders'}
                        </div>
                        <div className={styles.pagination}>
                            <button className={`${styles.pageBtn} ${styles.disabled}`}>
                                <FaSort style={{ transform: 'rotate(90deg)' }} />
                            </button>
                            <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
                            <button className={`${styles.pageBtn} ${styles.disabled}`}>
                                <FaSort style={{ transform: 'rotate(-90deg)' }} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Badge Tooltip */}
            {filterTooltip.visible && (() => {
                const record = filteredRecords[filterTooltip.recordIndex];
                const item = record?.currentCartItem?.[filterTooltip.itemIndex];
                const parsedFilters = item ? parseFiltersFromName(item.productName || '') : null;
                const isComplete = item ? isCompleteList(item.productName || '') : false;

                if (!parsedFilters || !filterTooltip.filterType) return null;

                const filterConfig: any = {
                    states: { title: 'States', icon: FaMapMarkedAlt, color: 'blue', count: parsedFilters.countStates, values: parsedFilters.states },
                    cities: { title: 'Cities', icon: FaCity, color: 'teal', count: parsedFilters.countCities, values: parsedFilters.cities.map((c: any) => c.name) },
                    zips: { title: 'Zip Codes', icon: FaEnvelope, color: 'purple', count: parsedFilters.countZips, values: parsedFilters.zips },
                    gender: { title: 'Gender', icon: FaVenusMars, color: 'orange', count: parsedFilters.countGender, values: parsedFilters.gender },
                    specialization: { title: 'Specialization', icon: FaStethoscope, color: 'green', count: parsedFilters.countSpecialization, values: parsedFilters.specialization },
                    license: { title: 'License State', icon: FaCertificate, color: 'indigo', count: parsedFilters.countLicense, values: parsedFilters.licenseStates }
                };

                const filter = filterConfig[filterTooltip.filterType];
                if (!filter || filter.count === 0) return null;

                // Calculate tooltip position
                const tooltipWidth = 320;
                const tooltipHeight = 200;
                let left = filterTooltip.position.x - tooltipWidth - 12;
                let top = filterTooltip.position.y - 10;

                if (left < 10) {
                    left = filterTooltip.position.x + 50;
                }
                if (top < 10) {
                    top = 10;
                }
                if (top + tooltipHeight > window.innerHeight - 10) {
                    top = window.innerHeight - tooltipHeight - 10;
                }

                return (
                    <div
                        className={`${styles.filterTooltip} ${styles.visible}`}
                        style={{
                            left: `${left}px`,
                            top: `${top}px`
                        }}
                        onMouseEnter={handleTooltipEnter}
                        onMouseLeave={handleTooltipLeave}
                    >
                        <div className={styles.tooltipHeader}>
                            <FaFilter />
                            <span>{filter.title}</span>
                            <button className={styles.closeTooltip} onClick={closeTooltips}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.tooltipContent}>
                            {isComplete ? (
                                <div className={styles.completeListBadge}>
                                    <FaCheckCircle />
                                    Complete dentist list - All filters included
                                </div>
                            ) : (
                                <div className={styles.filterSection}>
                                    <div className={styles.filterSectionHeader}>
                                        <filter.icon />
                                        <span className={styles.filterSectionTitle}>{filter.title}</span>
                                        <span className={styles.filterSectionCount}>{filter.count}</span>
                                    </div>
                                    <div className={styles.filterValues}>
                                        {filter.values.slice(0, 6).map((value: string, idx: number) => (
                                            <span key={idx} className={`${styles.fValue} ${styles[filter.color]}`}>
                                                {value}
                                            </span>
                                        ))}
                                        {filter.values.length > 6 && (
                                            <span className={`${styles.fValue} ${styles[filter.color]}`}>
                                                +{filter.values.length - 6} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })()}

            {/* Product Info Tooltip */}
            {productInfoTooltip.visible && (() => {
                const record = filteredRecords[productInfoTooltip.recordIndex];
                const item = record?.currentCartItem?.[productInfoTooltip.itemIndex];
                const parsedFilters = item ? parseFiltersFromName(item.productName || '') : null;
                const isComplete = item ? isCompleteList(item.productName || '') : false;

                if (!parsedFilters) return null;

                // Calculate tooltip position
                const tooltipWidth = 320;
                const tooltipHeight = 400;
                let left = productInfoTooltip.position.x - tooltipWidth - 12;
                let top = productInfoTooltip.position.y - 10;

                if (left < 10) {
                    left = productInfoTooltip.position.x + 100;
                }
                if (top < 10) {
                    top = 10;
                }
                if (top + tooltipHeight > window.innerHeight - 10) {
                    top = window.innerHeight - tooltipHeight - 10;
                }

                const filterConfig: any = [
                    { key: 'states', title: 'States', icon: FaMapMarkedAlt, color: 'blue', count: parsedFilters.countStates, values: parsedFilters.states },
                    { key: 'cities', title: 'Cities', icon: FaCity, color: 'teal', count: parsedFilters.countCities, values: parsedFilters.cities.map((c: any) => c.name) },
                    { key: 'zips', title: 'Zip Codes', icon: FaEnvelope, color: 'purple', count: parsedFilters.countZips, values: parsedFilters.zips },
                    { key: 'gender', title: 'Gender', icon: FaVenusMars, color: 'orange', count: parsedFilters.countGender, values: parsedFilters.gender },
                    { key: 'specialization', title: 'Specialization', icon: FaStethoscope, color: 'green', count: parsedFilters.countSpecialization, values: parsedFilters.specialization },
                    { key: 'license', title: 'License State', icon: FaCertificate, color: 'indigo', count: parsedFilters.countLicense, values: parsedFilters.licenseStates }
                ];

                return (
                    <div
                        className={`${styles.filterTooltip} ${styles.visible}`}
                        style={{
                            left: `${left}px`,
                            top: `${top}px`
                        }}
                        onMouseEnter={handleTooltipEnter}
                        onMouseLeave={handleTooltipLeave}
                    >
                        <div className={styles.tooltipHeader}>
                            <FaInfoCircle />
                            <span>Product Details</span>
                            <button className={styles.closeTooltip} onClick={closeTooltips}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.tooltipContent}>
                            {isComplete ? (
                                <div className={styles.completeListBadge}>
                                    <FaCheckCircle />
                                    Complete dentist list - All filters included
                                </div>
                            ) : (
                                filterConfig.map((filter: any) => {
                                    if (filter.count === 0) return null;
                                    return (
                                        <div key={filter.key} className={styles.filterSection}>
                                            <div className={styles.filterSectionHeader}>
                                                <filter.icon />
                                                <span className={styles.filterSectionTitle}>{filter.title}</span>
                                                <span className={styles.filterSectionCount}>{filter.count}</span>
                                            </div>
                                            <div className={styles.filterValues}>
                                                {filter.values.slice(0, 6).map((value: string, idx: number) => (
                                                    <span key={idx} className={`${styles.fValue} ${styles[filter.color]}`}>
                                                        {value}
                                                    </span>
                                                ))}
                                                {filter.values.length > 6 && (
                                                    <span className={`${styles.fValue} ${styles[filter.color]}`}>
                                                        +{filter.values.length - 6} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                );
            })()}

            {/* Billing Details Modal */}
            {billingModal.visible && billingModal.record && (() => {
                const record = billingModal.record;
                const status = getStatus(record);
                const comments = getComments(record);

                return (
                    <div
                        className={`${styles.modalOverlay} ${styles.visible}`}
                        onClick={closeBillingModal}
                    >
                        <div
                            className={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.modalHeader}>
                                <div className={styles.modalHeaderLeft}>
                                    <div className={styles.modalIcon}>
                                        <FaReceipt />
                                    </div>
                                    <div className={styles.modalTitleGroup}>
                                        <h3>Payment Details</h3>
                                        <p>#{record.orderId || record.id}</p>
                                    </div>
                                </div>
                                <button className={styles.closeModal} onClick={closeBillingModal}>
                                    <FaTimes />
                                </button>
                            </div>
                            <div className={styles.modalBody}>
                                <div className={styles.detailGrid}>
                                    <div className={styles.detailItem}>
                                        <div className={styles.detailLabel}>
                                            <FaHashtag />
                                            <span>Order ID</span>
                                        </div>
                                        <div className={styles.detailValue}>#{record.orderId || record.id}</div>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <div className={styles.detailLabel}>
                                            <FaCalendar />
                                            <span>Payment Date</span>
                                        </div>
                                        <div className={styles.detailValue}>{formatDate(record.date)}</div>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <div className={styles.detailLabel}>
                                            <FaClock />
                                            <span>Payment Time</span>
                                        </div>
                                        <div className={styles.detailValue}>{formatTime(record.date)}</div>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <div className={styles.detailLabel}>
                                            <FaInfoCircle />
                                            <span>Status</span>
                                        </div>
                                        <div className={styles.detailValue}>
                                            {status === 'completed' ? (
                                                <span className={`${styles.statusBadge} ${styles.completed}`}>
                                                    <FaCheckCircle />
                                                    <span>Approved</span>
                                                </span>
                                            ) : status === 'failed' ? (
                                                <span className={`${styles.statusBadge} ${styles.failed}`}>
                                                    <FaTimesCircle />
                                                    <span>Rejected</span>
                                                </span>
                                            ) : (
                                                <span className={`${styles.statusBadge} ${styles.pending}`}>
                                                    <FaSpinner />
                                                    <span>Pending</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`${styles.detailItem} ${styles.fullWidth}`}>
                                        <div className={styles.detailLabel}>
                                            <FaCommentDots />
                                            <span>Comments</span>
                                        </div>
                                        <div className={`${styles.detailValue} ${styles.commentValue}`}>
                                            {comments !== '-' && <FaCommentDots style={{ marginRight: '6px', color: '#0ea5e9' }} />}
                                            {comments}
                                        </div>
                                    </div>
                                    <div className={`${styles.detailItem} ${styles.highlight}`}>
                                        <div className={styles.detailLabel}>
                                            <FaDollarSign />
                                            <span>Total Amount</span>
                                        </div>
                                        <div className={`${styles.detailValue} ${styles.amountHighlight}`}>
                                            {formatter.format(record.totalAmount || 0)}
                                        </div>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <div className={styles.detailLabel}>
                                            <FaShoppingCart />
                                            <span>Cart Items</span>
                                        </div>
                                        <div className={styles.detailValue}>
                                            {record.currentCartItem?.length || 1} item
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.modalFooter}>
                                <button className={`${styles.modalBtn} ${styles.secondary}`} onClick={closeBillingModal}>
                                    <FaTimes />
                                    <span>Close</span>
                                </button>
                                <button className={`${styles.modalBtn} ${styles.primary}`} onClick={handleDownloadInvoice}>
                                    <FaDownload />
                                    <span>Download Invoice</span>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
};

export default PaymentHistoryTable;
