'use client';

import dayjs from "dayjs";
import classNames from "classnames";
import { useMemo } from "react";

import styles from "./paymentHistoryTable.module.scss";

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
}: PaymentHistoryTableProps) => {
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
        return dayjs.unix(timestamp).format("MMM D, YYYY");
    };

    const formatFilters = (filters?: PaymentFilterItem[]) => {
        if (!filters?.length) return "";
        return filters.map((item) => `${item.field}: ${item.value}`).join(" | ");
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

    return (
        <div className={classNames(styles.wrapper, className)}>
            <div className={styles.header}>
                <div>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
            </div>

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
                    <div className={styles.tableWrap}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Date</th>
                                    <th>Items</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((record) => (
                                    <tr key={record.id}>
                                        <td>
                                            <div className={styles.orderId}>#{record.orderId || record.id}</div>
                                            <div className={styles.orderMeta}>ID: {record.id}</div>
                                        </td>
                                        <td>{formatDate(record.date)}</td>
                                        <td>
                                            <div className={styles.items}>
                                                {record.currentCartItem?.map((item, index) => (
                                                    <div key={`${record.id}-${index}`} className={styles.item}>
                                                        <div className={styles.itemName}>{item.productName}</div>
                                                        <div className={styles.itemMeta}>
                                                            {item.contacts?.toLocaleString?.() || "0"} contacts /{" "}
                                                            {formatter.format(item.price || 0)}
                                                        </div>
                                                        {formatFilters(item.filterItems) ? (
                                                            <div className={styles.itemFilters}>{formatFilters(item.filterItems)}</div>
                                                        ) : null}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className={styles.payment}>{getPaymentLabel(record)}</td>
                                        <td>
                                            <span className={`${styles.status} ${getStatusClass(record.status)}`}>
                                                {record.status || "Pending"}
                                            </span>
                                        </td>
                                        <td className={styles.amount}>{formatter.format(record.totalAmount || 0)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentHistoryTable;
