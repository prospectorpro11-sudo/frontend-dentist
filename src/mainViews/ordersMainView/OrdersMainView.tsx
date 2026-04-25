'use client';

import { useEffect, useState } from "react";

import instance from "@/services/baseServices";
import { useRootContext } from "@/contexts/RootContext";
import PaymentHistoryTable, { PaymentRecord } from "@/components/paymentHistoryTable/PaymentHistoryTable";

const OrdersMainView = () => {
    const { loggedInUser, authLoading } = useRootContext();
    const [orders, setOrders] = useState<PaymentRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (authLoading || !loggedInUser) return;

        const fetchOrders = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await instance.post("/sortedPaymentOrderList");
                const payload = Array.isArray(response.data) ? response.data : response.data?.data;
                setOrders(payload || []);
            } catch (err: any) {
                setError(err?.response?.data?.message || "Failed to load orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [authLoading, loggedInUser]);

    return (
        <PaymentHistoryTable
            title="Orders"
            subtitle="Track payment status and review items in each order."
            records={orders}
            authLoading={authLoading}
            hasUser={!!loggedInUser}
            loading={loading}
            error={error}
            emptyMessage="No orders found."
            loadingMessage="Loading orders..."
            loginMessage="Please log in to view your orders."
        />
    );
};

export default OrdersMainView;
