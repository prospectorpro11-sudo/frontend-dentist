"use client";
import { HiSparkles } from "react-icons/hi2";
import { Container } from "react-bootstrap";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Suspense, useEffect, useState } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import { FiDownloadCloud, FiShield, FiZap } from "react-icons/fi";

import { IOption } from "@/shared/types";
import Button from "@/components/button/Button";
import instance from "../../services/baseServices";
import styles from "./freeSampleMainView.module.scss";
import { useRootContext } from "@/contexts/RootContext";
import { IMainProductInfo } from "../../shared/interface";
import { BUTTON_VARIANT_ENUM, DATABASE_MAIN_TYPES } from "../../shared/enums";
import FreeSampleDownloader from "@/components/freeSampleDownloader/FreeSampleDownloader";
import FreeSampleLeftContent from "@/components/freeSampleLeftContent/FreeSampleLeftContent";

interface IFreeSampleMainView {
  tableDataSet: IMainProductInfo[] | null;
  databaseMainTypes: DATABASE_MAIN_TYPES;
  searchPlaceHolder?: string;
}

const FreeSampleMainView = (props: IFreeSampleMainView) => {
  const {
    tableDataSet,
    databaseMainTypes,
    searchPlaceHolder = "Search Free Sample List",
  } = props;
  const { loggedInUser, sampleLimitCount, setSampleLimitCount, setAuthEnable } =
    useRootContext();
  const [selectedItem, setSelectedItem] = useState<IOption | null>(null);

  const pressLogin = () => {
    setAuthEnable(true);
  };

  useEffect(() => {
    if (!loggedInUser) return;

    let active = true;

    instance.post("/check-free-sample-limit").then((response: any) => {
      if (active) {
        setSampleLimitCount(response?.data?.count);
      }
    }).catch(() => {
      if (active) {
        setSampleLimitCount(0);
      }
    });

    return () => {
      active = false;
    };
  }, [loggedInUser]);

  const getTitle = {
    [DATABASE_MAIN_TYPES.HOME]: "Complete Doctor List",
    [DATABASE_MAIN_TYPES.STATES]: "Samples by State",
    [DATABASE_MAIN_TYPES.JOB_TITLE]: "Samples by Specialist",
    [DATABASE_MAIN_TYPES.CITIES]: "Samples by City",
  };

  const getSubtitle = {
    [DATABASE_MAIN_TYPES.HOME]:
      "Download a free preview of our full verified doctor contact database.",
    [DATABASE_MAIN_TYPES.STATES]:
      "Browse and download free sample lists filtered by U.S. state.",
    [DATABASE_MAIN_TYPES.JOB_TITLE]:
      "Explore sample lists organized by medical specialty and job title.",
    [DATABASE_MAIN_TYPES.CITIES]:
      "Find free sample lists of healthcare professionals by city.",
  };

  const tabsData = [
    {
      label: "Sample by States",
      url: "/free-sample/states",
      isDefaultActive: true,
    },
    { label: "Sample by Specialists", url: "/free-sample/specialists" },
  ];

  const featureHighlights = [
    { icon: <FiDownloadCloud size={18} />, text: "Instant CSV Download" },
    { icon: <FiShield size={18} />, text: "Verified Contacts" },
    { icon: <FiZap size={18} />, text: "Updated Monthly" },
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* ── Dark Hero Banner ── */}
      <section className={styles.heroBanner}>
        <div className={styles.bannerSurface} />
        <Container className={styles.bannerContainer}>
          <h1 className={styles.mainTitle}>{getTitle[databaseMainTypes]}</h1>
          <p className={styles.subtitle}>
            {getSubtitle[databaseMainTypes]}
          </p>

          {/* Feature highlights */}
          <div className={styles.featureRow}>
            {featureHighlights.map((f, i) => (
              <div key={i} className={styles.featureChip}>
                {f.icon}
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Main Content Area ── */}
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.contentGrid}>
            {/* ── Primary Card: Download Tool ── */}
            <div className={styles.primaryCard}>
              {/* Status Bar */}
              <div className={styles.statusBar}>
                <div className={styles.statusInfo}>
                  {loggedInUser && sampleLimitCount === null && (
                    <>
                      <span className={`${styles.statusIcon} ${styles.info}`}>
                        <IoMdInformationCircle size={16} />
                      </span>
                      <span className={styles.statusText}>Loading...</span>
                    </>
                  )}

                  {loggedInUser && sampleLimitCount !== null && sampleLimitCount > 0 && (
                    <>
                      <span className={`${styles.statusIcon} ${styles.info}`}>
                        <IoMdInformationCircle size={16} />
                      </span>
                      <span className={styles.statusText}>
                        You have{" "}
                        <span className={styles.attemptPill}>
                          {sampleLimitCount} attempt{sampleLimitCount > 1 ? "s" : ""}
                        </span>{" "}
                        remaining this month
                      </span>
                    </>
                  )}

                  {loggedInUser && sampleLimitCount !== null && sampleLimitCount <= 0 && (
                    <>
                      <span className={`${styles.statusIcon} ${styles.danger}`}>
                        <IoCloseCircleSharp size={16} />
                      </span>
                      <span className={styles.limitExceeded}>
                        Monthly download limit reached. Try again next month.
                      </span>
                    </>
                  )}

                  {!loggedInUser && (
                    <div className={styles.notLoggedInRow}>
                      <span className={`${styles.statusIcon} ${styles.info}`}>
                        <IoMdInformationCircle size={16} />
                      </span>
                      <span className={styles.statusText}>
                        We offer{" "}
                        <span className={styles.attemptPill}>4 free samples</span>{" "}
                        each month. Log in to access yours.
                      </span>
                    </div>
                  )}
                </div>

                {!loggedInUser && (
                  <div className={styles.statusActions}>
                    <Button
                      onClick={pressLogin}
                      variant={BUTTON_VARIANT_ENUM.SECONDARY}
                    >
                      Login
                    </Button>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <Suspense fallback={null}>
                  <FreeSampleDownloader
                    productList={tableDataSet}
                    databaseMainTypes={databaseMainTypes}
                    placeHolder={searchPlaceHolder}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    tabsData={tabsData}
                  />
                </Suspense>
              </div>
            </div>

            {/* ── CTA Section ── */}
            <div className={styles.ctaSection}>
              <FreeSampleLeftContent
                databaseMainTypes={databaseMainTypes}
                selectedItem={selectedItem}
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default FreeSampleMainView;
