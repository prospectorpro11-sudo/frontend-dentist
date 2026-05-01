import instance from "@/services/baseServices";
import { getUser } from "@/services/tokenService";
import { useRootContext } from "@/contexts/RootContext";
import { triggerForm } from "@/shared/InternalService";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Modal from "react-bootstrap/Modal";

import styles from "./supportTable.module.scss";

dayjs.extend(relativeTime);

interface ISupportTable {
  saveLoading: boolean;
}

type SupportRecord = {
  subject?: string;
  contactInput?: string;
  date?: number;
  status?: string;
};

const SupportTable = (props: ISupportTable) => {
  const { saveLoading } = props;
  const { loggedInUser } = useRootContext();
  const [selectedTicket, setSelectedTicket] = useState<SupportRecord | null>(null);

  // Use context for live auth state, fallback to tokenService for SSR or edge cases
  const hasUser = Boolean(loggedInUser || getUser());

  const fetchSupportList = async () => {
    const result: any = await instance.post(`/supportList`);
    return Array.isArray(result.data) ? result.data : [];
  };

  const {
    data: supportList,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["supportList"],
    queryFn: fetchSupportList,
    enabled: hasUser && !saveLoading,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const errorMessage =
    (error as any)?.response?.data?.message ||
    (error as any)?.response?.data ||
    (error as any)?.message ||
    "Something went wrong.";

  useEffect(() => {
    if (!isError || !error) {
      return;
    }

    triggerForm({
      title: "",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "OK",
    });
  }, [isError, error, errorMessage]);

  const list: SupportRecord[] = Array.isArray(supportList) ? supportList : [];
  const showEmpty = hasUser && !saveLoading && !isLoading && !isError && list.length === 0;
  const showLoading = (isLoading || isFetching) && list.length === 0;
  const showRefreshing = isFetching && list.length > 0;

  const formatDate = (timestamp?: number) => {
    if (!timestamp) {
      return { date: "--", relative: "" };
    }

    const parsed = dayjs.unix(timestamp);
    return {
      date: parsed.format("MMM D, YYYY"),
      relative: parsed.fromNow(),
    };
  };

  const getStatusClass = (status?: string) => {
    const normalized = status?.toLowerCase();
    if (normalized === "resolved") {
      return styles.statusResolved;
    }
    if (normalized === "processing") {
      return styles.statusProcessing;
    }
    return styles.statusPending;
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h3>Support History</h3>
          <p>Track the status of your recent support requests.</p>
        </div>
        {showRefreshing ? <span className={styles.refreshing}>Refreshing</span> : null}
      </div>

      {!hasUser ? (
        <div className={styles.stateCard}>Please log in to view your support history.</div>
      ) : saveLoading ? (
        <div className={styles.stateCard}>Updating your support history...</div>
      ) : showLoading ? (
        <div className={styles.stateCard}>Loading support requests...</div>
      ) : isError ? (
        <div className={styles.errorCard}>{errorMessage}</div>
      ) : showEmpty ? (
        <div className={styles.stateCard}>No support requests yet.</div>
      ) : (
        <div className={styles.tableCard}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {list.map((element, index) => {
                  const { date, relative } = formatDate(element?.date);
                  return (
                    <tr key={`${element?.subject ?? "support"}-${index}`}>
                      <td>
                        <div className={styles.subject}>{element?.subject || "Support request"}</div>
                      </td>
                      <td>
                        <div className={styles.datePrimary}>{date}</div>
                        {relative ? <div className={styles.dateMeta}>{relative}</div> : null}
                      </td>
                      <td>
                        <span className={`${styles.status} ${getStatusClass(element?.status)}`}>
                          {element?.status || "Pending"}
                        </span>
                      </td>
                      <td>
                        <button
                          className={styles.viewBtn}
                          onClick={() => setSelectedTicket(element)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        show={!!selectedTicket}
        onHide={() => setSelectedTicket(null)}
        centered
        className={styles.ticketModal}
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>
            {selectedTicket?.subject || "Support Request"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <div className={styles.modalMeta}>
            <span className={`${styles.status} ${getStatusClass(selectedTicket?.status)}`}>
              {selectedTicket?.status || "Pending"}
            </span>
            {selectedTicket?.date ? (
              <span className={styles.modalDate}>
                {dayjs.unix(selectedTicket.date).format("MMM D, YYYY · h:mm A")}
              </span>
            ) : null}
          </div>
          <div className={styles.modalDescription}>
            {selectedTicket?.contactInput || "No description provided."}
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default SupportTable;
