'use client';

import { useEffect, useState } from "react";

import instance from "@/services/baseServices";
import { useRootContext } from "@/contexts/RootContext";
import PaymentHistoryTable, { PaymentRecord } from "@/components/paymentHistoryTable/PaymentHistoryTable";

const BillingMainView = () => {
    const { loggedInUser, authLoading } = useRootContext();
    const [billingData, setBillingData] = useState<PaymentRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (authLoading || !loggedInUser) return;

        const fetchBillingList = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await instance.post("/billingList");
                const payload = Array.isArray(response.data) ? response.data : response.data?.data;
                setBillingData(payload || []);
            } catch (err: any) {
                setError(err?.response?.data?.message || "Failed to load billing history.");
            } finally {
                setLoading(false);
            }
        };

        fetchBillingList();
    }, [authLoading, loggedInUser]);

    return (
        <PaymentHistoryTable
            title="Billing History"
            subtitle="Review your invoices, payment method, and order totals."
            records={billingData}
            authLoading={authLoading}
            hasUser={!!loggedInUser}
            loading={loading}
            error={error}
            emptyMessage="No billing records yet."
            loadingMessage="Loading billing history..."
            loginMessage="Please log in to view your billing history."
        />
    );
};

export default BillingMainView;
