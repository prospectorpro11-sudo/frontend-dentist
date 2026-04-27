"use client";

import Select from "react-select";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

import Button from "../button/Button";
import { COLORS } from "@/shared/colors";
import instance from "@/services/baseServices";
import { ADMIN_EMAIL } from "@/shared/constant";
import { useRootContext } from "@/contexts/RootContext";
import styles from "./freeSampleDownloader.module.scss";
import { downloadSampleListEmailSend } from "@/shared/emailSend";
import { IDownloadInfo, IMainProductInfo } from "@/shared/interface";
import { BUTTON_SIZE_ENUM, DATABASE_MAIN_TYPES } from "@/shared/enums";
import { replaceWithPrefix, triggerForm } from "@/shared/InternalService";

interface IFreeSampleDownloader {
  productList: IMainProductInfo[] | null;
  databaseMainTypes: DATABASE_MAIN_TYPES;
  placeHolder?: string;
  selectedItem: IOption | null;
  setSelectedItem: (selectedItem: IOption | null) => void;
  tabsData?: { label: string; url: string; isDefaultActive?: boolean }[];
}

export type IOption = {
  label: string;
  value: string;
  filterValue: string;
  name: string;
  link: IDownloadInfo | null;
};

const FreeSampleDownloader = (props: IFreeSampleDownloader) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");

  const {
    productList,
    databaseMainTypes,
    placeHolder = "Search",
    selectedItem,
    setSelectedItem,
    tabsData,
  } = props;
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { setSampleLimitCount, loggedInUser, sampleLimitCount } =
    useRootContext();

  const [emailVerified, setEmailVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [resendTimerLoading, setResendTimerLoading] = useState(false);

  const getSampleLabel: any = {
    [DATABASE_MAIN_TYPES.JOB_TITLE]: "Free Sample",
    [DATABASE_MAIN_TYPES.STATES]: "Doctors Sample",
  };

  const filteredList = productList?.filter((item) => {
    const label = getSampleLabel[databaseMainTypes]?.toLowerCase() || "";
    const fileName = item.screenshot?.sampleFileName?.toLowerCase() || "";
    const productName = item.name?.toLowerCase() || "";
    const otherDescription =
      item?.otherStates?.description?.toLowerCase() || "";
    const search = searchText.toLowerCase();
    return (
      label.includes(search) ||
      fileName.includes(search) ||
      productName.includes(search) ||
      otherDescription.includes(search)
    );
  });

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const checkFreeSampleAttemptExist = async () => {
    if (loggedInUser) {
      const response: any = await instance.post("/check-free-sample-limit");
      setSampleLimitCount(response?.data?.count);
      setEmailVerified(response?.data?.user?.isEmailVerified);
    }
  };

  const freeSamples: IOption[] =
    filteredList
      ?.map((item) => {
        if (item.screenshot && item.screenshot.sampleFileName) {
          return {
            label: item.screenshot.sampleFileName,
            value: item.screenshot.sampleFileName,
            filterValue: item.otherStates?.description || "",
            name: item.name,
            link: item.url as unknown as IDownloadInfo | null,
          };
        }
        return null;
      })
      .filter((option): option is IOption => option !== null) || [];

  useEffect(() => {
    if (loggedInUser) {
      (async () => {
        await checkFreeSampleAttemptExist();
      })();
    }
  }, [pathname, loggedInUser]);

  const updateFreeSample = async () => {
    if (!selectedItem?.value) {
      triggerForm({
        title: "",
        text: `Sample file not found. please contact ${ADMIN_EMAIL}`,
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    try {
      setLoading(true);

      const response: any = await instance.post("update-free-sample", {
        fileName: `free-sample/${selectedItem?.value}`,
      });

      if (!response?.data?.downloadUrl) {
        triggerForm({
          title: "",
          text: "Download File Not Found! Please contact us to obtain the sample file.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        openInNewTab(response?.data?.downloadUrl);
        checkFreeSampleAttemptExist();

        const emailObject = {
          contactCount: 30,
          name: loggedInUser?.displayName,
          email: replaceWithPrefix(loggedInUser?.email ?? ""),
        };

        const middlePrefixURL: any = {
          [DATABASE_MAIN_TYPES.STATES]: "states",
          [DATABASE_MAIN_TYPES.JOB_TITLE]: "specialty",
          [DATABASE_MAIN_TYPES.HOME]: "",
          [DATABASE_MAIN_TYPES.CITIES]: "",
        };

        const newEmailObject = !selectedItem?.link
          ? {
            ...emailObject,
            urlText1: `Complete Premium Doctor List`,
            url1: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          }
          : {
            ...emailObject,
            urlText1: `Complete Premium Doctor List`,
            url1: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            urlText2: `Premium ${selectedItem?.name} List`,
            url2: `${process.env.NEXT_PUBLIC_BASE_URL}/${middlePrefixURL[databaseMainTypes]}/${selectedItem?.link}`,
          };

        downloadSampleListEmailSend(newEmailObject);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      triggerForm({
        title: "",
        text: "Oops! Something went wrong. Please contact us to let us know the issue and provide the sample file you want.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    const findSample = productList?.find((item) => item.id === queryId);
    if (
      findSample &&
      findSample.screenshot &&
      findSample.screenshot.sampleFileName
    ) {
      setSelectedItem({
        label: findSample.screenshot.sampleFileName,
        value: findSample.screenshot.sampleFileName,
        filterValue: findSample.otherStates?.description || "",
        name: findSample.name,
        link: findSample.url as unknown as IDownloadInfo | null,
      });
    }
  }, [queryId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleResendClick = async () => {
    if (resendTimer > 0) return;

    try {
      setResendTimerLoading(true);
      await instance.post("/verifyEmail");
      setResendTimer(60);
      setResendTimerLoading(false);
    } catch (error) {
      setResendTimerLoading(false);

      triggerForm({
        title: "Error",
        text: "Failed to send verification email. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Helper for status dot
  const StatusDot = ({ checked }: { checked: boolean }) => (
    <span
      className={`${styles.statusDot} ${checked ? styles.checked : styles.unchecked}`}
    >
      {checked ? <IoCheckmarkCircle size={24} /> : <IoCloseCircle size={24} />}
    </span>
  );

  return (
    <div className={styles.wrapper}>
      {/* ── Segmented Control (Tabs) ── */}
      {tabsData && tabsData.length > 0 && (
        <div className={styles.segmentedControl}>
          {tabsData.map((tab, index) => {
            const isActive =
              tab.url === pathname ||
              (!tabsData.some((t) => t.url === pathname) && tab.isDefaultActive);
            return (
              <a
                key={index}
                href={tab.url}
                className={`${styles.segmentBtn} ${isActive ? styles.active : ""}`}
              >
                {tab.label}
              </a>
            );
          })}
        </div>
      )}

      {/* ── Form Body ── */}
      <div className={styles.formBody}>
        {/* ── Dropdown ── */}
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Select Your Sample File</label>
          <Select
            instanceId="free-sample-downloader"
            value={selectedItem}
            className={`prospector-filter ${styles.inputSelector}`}
            options={freeSamples}
            isSearchable={true}
            inputValue={searchText}
            onInputChange={(inputValue) => setSearchText(inputValue)}
            onChange={(option) => setSelectedItem(option as IOption)}
            placeholder={placeHolder}
            noOptionsMessage={() => null}
            components={{
              IndicatorSeparator: null,
            }}
            styles={{
              control: (base, state) => ({
                ...base,
                minHeight: "52px",
                height: "52px",
                borderRadius: "12px",
                borderColor: state.isFocused ? "#3b82f6" : "#cbd5e1",
                boxShadow: state.isFocused ? "0 0 0 3px rgba(59, 130, 246, 0.15)" : "none",
                "&:hover": {
                  borderColor: state.isFocused ? "#3b82f6" : "#94a3b8",
                },
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0 16px",
              }),
              input: (base) => ({
                ...base,
                margin: 0,
                padding: 0,
              }),
              indicatorsContainer: (base) => ({
                ...base,
                height: "50px",
              }),
              menu: (base) => ({
                ...base,
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 10px 25px -5px rgba(24, 54, 91, 0.15)",
              }),
            }}
          />
        </div>

        {/* ── Status checklist ── */}
        <div className={styles.statusList}>
          {!loggedInUser && (
            <div className={styles.statusItem}>
              <StatusDot checked={false} />
              <span>You&apos;re not logged in</span>
            </div>
          )}

          {!emailVerified && (
            <div className={styles.statusItem}>
              <StatusDot checked={!!emailVerified || resendTimer > 0} />
              {emailVerified ? (
                <span>Email is verified</span>
              ) : (
                <div>
                  {resendTimer > 0
                    ? "Verification email sent. Check your inbox."
                    : "Email is not verified."}
                  <br />
                  <span
                    onClick={handleResendClick}
                    className={`${styles.resendLink} ${resendTimer > 0 ? styles.disabled : ""}`}
                    style={{
                      color: resendTimer > 0 ? "gray" : COLORS.PRIMARY,
                    }}
                  >
                    {!resendTimerLoading
                      ? resendTimer > 0
                        ? `Resend in ${resendTimer}s`
                        : "Send verification email"
                      : "Sending..."}
                  </span>
                </div>
              )}
            </div>
          )}

          {!selectedItem && (
            <div className={styles.statusItem}>
              <StatusDot checked={false} />
              <span>Please select a sample file from the dropdown above</span>
            </div>
          )}
        </div>

        <Button
          onClick={async () => {
            updateFreeSample();
          }}
          size={BUTTON_SIZE_ENUM.LARGE}
          disabled={
            !loggedInUser ||
            (sampleLimitCount ?? 0) <= 0 ||
            selectedItem == null ||
            !emailVerified
          }
          type="submit"
          isLoading={loading}
          className={styles.downloadButton}
        >
          Generate &amp; Download
        </Button>
      </div>
    </div>
  );
};

export default FreeSampleDownloader;
