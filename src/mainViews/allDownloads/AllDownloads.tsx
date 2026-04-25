"use client";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import styles from "./style.module.scss";
import instance from "../../services/baseServices";
import { useRootContext } from "@/contexts/RootContext";
import { AddToCart, triggerForm } from "@/shared/InternalService";
import DashboardPageHeader from "@/components/dashboardPageHeader/DashboardPageHeader";
import { FaDownload } from "react-icons/fa";
import { COLORS_ENUM } from "@/shared/enums";

const AllDownloadsMainView = () => {
  const { currentCartItem, setCurrentCartItem } = useRootContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { loggedInUser } = useRootContext();
  const [fullDownloadList, setFullDownloadList] = useState([]);

  const getFullDownloadList = useCallback(async () => {
    try {
      setLoading(true);
      const fullDownloadList: any = await instance.post(`downloadList`);
      setFullDownloadList(fullDownloadList.data);
      setLoading(false);
    } catch (error: any) {
      triggerForm({
        title: "",
        text: error.response.data?.message || error.response.data,
        icon: "error",
        confirmButtonText: "OK",
      });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      (async () => {
        await getFullDownloadList();
      })();
    }
  }, [loggedInUser, getFullDownloadList]);

  const pressRenew = (downloadObject: any) => {
    downloadObject?.orderInfo?.currentCartItem.forEach((element: any) => {
      AddToCart(
        currentCartItem,
        setCurrentCartItem,
        element.url,
        element.uniqueNPI,
        element?.price,
        element.productName,
      );
    });
    router.push("/checkout");
  };

  const allDownloadItems = useMemo(
    () =>
      fullDownloadList.flatMap(
        (item: any) => item?.orderList || [],
      ),
    [fullDownloadList],
  );

  const activeDownloadsCount = useMemo(
    () =>
      allDownloadItems.filter((item: any) => {
        const hasLink = !!item?.signedUrl;
        const isExpired = dayjs(item?.expireDate).isBefore(dayjs());
        return hasLink && !isExpired;
      }).length,
    [allDownloadItems],
  );

  return (
    <div className={styles.wrapper}>
      <DashboardPageHeader
        title={"My Downloads"}
        description={"Manage and access your purchased products"}
        icon={FaDownload}
        stats={
          [
            { label: "Total Downloads", value: allDownloadItems.length.toString(), color: COLORS_ENUM.SKY_BLUE },
            {
              label: "Active", value: activeDownloadsCount.toString(), color: COLORS_ENUM.EMERALD
            }]
        }
      />
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Expire Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!loggedInUser && (
              <tr>
                <td colSpan={4} className={styles.stateCell}>
                  Please log in to access your downloads.
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan={4} className={styles.stateCell}>
                  Loading....
                </td>
              </tr>
            )}
            {loggedInUser && !loading && !fullDownloadList.length && (
              <tr>
                <td colSpan={4} className={styles.stateCell}>
                  No any Downloads Found!
                </td>
              </tr>
            )}
            {fullDownloadList?.map((element: any) => {
              return element?.orderList?.map?.(
                (childElement: any, index: number) => {
                  const isExpired =
                    Date.now() - new Date(childElement?.expireDate).getTime() >
                    0;
                  const hasLink = !!childElement?.signedUrl;

                  return (
                    <tr key={index}>
                      <td className={styles.nameCell}>{childElement?.name}</td>
                      <td className={styles.dateCell}>
                        {dayjs(childElement?.expireDate).format(
                          "YYYY-MMM-DD / h:mm A",
                        )}
                      </td>
                      <td>
                        {!hasLink ? (
                          <span
                            className={`${styles.badge} ${styles.badgeBuilding}`}
                          >
                            Processing
                          </span>
                        ) : isExpired ? (
                          <span
                            className={`${styles.badge} ${styles.badgeExpired}`}
                          >
                            Expired
                          </span>
                        ) : (
                          <span
                            className={`${styles.badge} ${styles.badgeActive}`}
                          >
                            Active
                          </span>
                        )}
                      </td>
                      <td>
                        {childElement?.signedUrl ? (
                          isExpired ? (
                            <button
                              className={`${styles.actionBtn} ${styles.btnRenew}`}
                              onClick={() => pressRenew(element)}
                            >
                              Renew
                            </button>
                          ) : (
                            <a
                              target="_blank"
                              href={childElement?.signedUrl}
                              rel="noreferrer"
                              className={`${styles.actionBtn} ${styles.btnDownload}`}
                            >
                              Download
                            </a>
                          )
                        ) : (
                          <span className={styles.buildingMsg}>
                            Link is building.{" "}
                            <Link href="/support">Ping us</Link> if this takes
                            more than 5 minutes
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                },
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDownloadsMainView;
