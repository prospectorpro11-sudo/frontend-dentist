'use client';

import AuthRequiredCard from "@/components/authRequiredCard/AuthRequiredCard";
import DashboardPageHeader from "@/components/dashboardPageHeader/DashboardPageHeader";
import { useRootContext } from "@/contexts/RootContext";
import AllDownloadsMainView from "@/mainViews/allDownloads/AllDownloads";
import { FaDownload } from "react-icons/fa";
import { COLORS_ENUM } from "@/shared/enums";

export default function MyDownloads() {
  const { loggedInUser, authLoading } = useRootContext();

  const header = (
    <DashboardPageHeader
      title="My Downloads"
      description="Manage and access your purchased products"
      icon={FaDownload}
      stats={[
        { label: "Total Downloads", value: "0", color: COLORS_ENUM.SKY_BLUE },
        { label: "Active", value: "0", color: COLORS_ENUM.INDIGO },
      ]}
    />
  );

  if (authLoading) {
    return (
      <>
        {header}
        <AuthRequiredCard checking icon={FaDownload} />
      </>
    );
  }

  if (!loggedInUser) {
    return (
      <>
        {header}
        <AuthRequiredCard
          heading="Downloads Access Required"
          message="Please log in to access your downloads and purchased files."
          buttonLabel="Log In to View Downloads"
          icon={FaDownload}
        />
      </>
    );
  }

  return <AllDownloadsMainView />;
}
