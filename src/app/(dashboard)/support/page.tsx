'use client';

import AuthRequiredCard from "@/components/authRequiredCard/AuthRequiredCard";
import { useRootContext } from "@/contexts/RootContext";
import SupportMainView from "@/mainViews/supportMainView/SupportMainView";
import { FaHeadset } from "react-icons/fa";

const SupportPage = () => {
    const { loggedInUser, authLoading } = useRootContext();

    if (authLoading) {
        return <AuthRequiredCard checking icon={FaHeadset} />;
    }

    if (!loggedInUser) {
        return (
            <AuthRequiredCard
                heading="Support Access Required"
                message="Please log in to access support and manage your conversations."
                buttonLabel="Log In for Support"
                icon={FaHeadset}
            />
        );
    }

    return (
        <SupportMainView />
    );
};

export default SupportPage;
