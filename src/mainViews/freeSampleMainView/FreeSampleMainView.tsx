"use client";
import { HiSparkles } from "react-icons/hi2";
import { Col, Container } from "react-bootstrap";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Suspense, useEffect, useState } from "react";
import { IoMdInformationCircle } from "react-icons/io";

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

  return (
    <div className={styles.heroSection}>
      {/* Decorative background blobs */}
      <div className={styles.decorBlob1} />
      <div className={styles.decorBlob2} />

      <Container>
        {/* ── Header ── */}
        <div className={styles.headerArea}>
          <div className={styles.badge}>
            <HiSparkles size={14} />
            Free Sample
          </div>
          <h2 className={styles.mainTitle}>{getTitle[databaseMainTypes]}</h2>
          <p className={styles.subtitle}>
            {getSubtitle[databaseMainTypes]}
          </p>
        </div>

        {/* ── Status strip ── */}
        {/* ── Unified Central Card ── */}
        <Col xs={12} lg={8} className="mx-auto">
          <div className={styles.unifiedCard}>
            {/* Embedded Status area */}
            <div className={styles.embeddedStatus}>
              <div className={styles.statusInfo}>
                {loggedInUser && sampleLimitCount === null && (
                  <>
                    <span className={`${styles.statusIcon} ${styles.info}`}>
                      <IoMdInformationCircle size={18} />
                    </span>
                    Loading...
                  </>
                )}

                {loggedInUser && sampleLimitCount !== null && sampleLimitCount > 0 && (
                  <>
                    <span className={`${styles.statusIcon} ${styles.info}`}>
                      <IoMdInformationCircle size={18} />
                    </span>
                    You have{" "}
                    <span className={styles.attemptPill}>
                      {sampleLimitCount} attempt{sampleLimitCount > 1 ? "s" : ""}
                    </span>{" "}
                    remaining this month
                  </>
                )}

                {loggedInUser && sampleLimitCount !== null && sampleLimitCount <= 0 && (
                  <>
                    <span className={`${styles.statusIcon} ${styles.danger}`}>
                      <IoCloseCircleSharp size={18} />
                    </span>
                    <span className={styles.limitExceeded}>
                      Monthly download limit reached. Try again next month.
                    </span>
                  </>
                )}

                {!loggedInUser && (
                  <div className={styles.notLoggedInRow}>
                    <span className={`${styles.statusIcon} ${styles.info}`}>
                      <IoMdInformationCircle size={18} />
                    </span>
                    We offer{" "}
                    <span className={styles.attemptPill}>4 free samples</span>{" "}
                    each month. Log in to access yours.
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

            {/* Content Area */}
            <div className={styles.cardContent}>
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

          <div className={styles.ctaWrapper}>
            <FreeSampleLeftContent
              databaseMainTypes={databaseMainTypes}
              selectedItem={selectedItem}
            />
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default FreeSampleMainView;
