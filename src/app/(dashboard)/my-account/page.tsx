'use client';

import AuthRequiredCard from "@/components/authRequiredCard/AuthRequiredCard";
import { useRootContext } from "@/contexts/RootContext";
import MyAccountMainView from "@/mainViews/myAccount/MyAccountMainView";
import { FaUserCircle } from "react-icons/fa";

const MyAccountPage = () => {
    const { loggedInUser, authLoading } = useRootContext();

    if (authLoading) {
        return <AuthRequiredCard checking icon={FaUserCircle} />;
    }

    if (!loggedInUser) {
        return (
            <AuthRequiredCard
                heading="Account Access Required"
                message="Please log in to manage your profile, billing details, and account settings."
                buttonLabel="Log In to Manage Account"
                icon={FaUserCircle}
            />
        );
    }

    return (
        <MyAccountMainView />
    );
};

export default MyAccountPage;
