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
import {
  FaDownload,
  FaSearch,
  FaSort,
  FaChevronUp,
  FaChevronDown,
  FaUserMd,
  FaTooth,
  FaBaby,
  FaTeeth,
  FaMapMarkerAlt,
  FaVenusMars,
  FaStethoscope,
  FaIdCard,
  FaMapMarkedAlt,
  FaCity,
  FaEnvelope,
  FaCertificate,
  FaCheckCircle,
  FaTimesCircle,
  FaRedo,
  FaSpinner,
  FaCheck,
  FaGlobeAmericas,
} from "react-icons/fa";
import { COLORS_ENUM } from "@/shared/enums";

const AllDownloadsMainView = () => {
  const { currentCartItem, setCurrentCartItem } = useRootContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { loggedInUser } = useRootContext();
  const [fullDownloadList, setFullDownloadList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedRows, setExpandedRows] = useState(new Set());

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

  const toggleExpand = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

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

  const getStatus = (item: any) => {
    const hasLink = !!item?.signedUrl;
    const isExpired = dayjs(item?.expireDate).isBefore(dayjs());
    if (!hasLink) return 'processing';
    if (isExpired) return 'expired';
    return 'active';
  };

  const parseFiltersFromName = (name: string) => {
    const filters: any = {
      states: [],
      countStates: 0,
      cities: [],
      countCities: 0,
      zips: [],
      countZips: 0,
      gender: [],
      countGender: 0,
      specialization: [],
      countSpecialization: 0,
      licenseStates: [],
      countLicense: 0
    };

    const match = name.match(/\((.*?)\)/);
    if (!match) return filters;

    const filterString = match[1];
    const sections = filterString.split(/,(?=\s*(?:State|City|Zip|Specialization|Gender|LicenseState):)/);

    sections.forEach(section => {
      const [key, ...valueParts] = section.split(':');
      const keyTrimmed = key.trim();
      const valueString = valueParts.join(':').trim();

      if (keyTrimmed === 'State') {
        filters.states = valueString.split(';').map((s: string) => s.trim()).filter(Boolean);
        filters.countStates = filters.states.length;
      } else if (keyTrimmed === 'City') {
        filters.cities = valueString.split(';').map((city: string) => {
          const [state, ...cityParts] = city.split('=');
          const name = cityParts.join('=').trim();
          return {
            name: state ? `${name}, ${state}` : name,
            count: 1
          };
        }).filter(Boolean);
        filters.countCities = filters.cities.length;
      } else if (keyTrimmed === 'Zip') {
        filters.zips = valueString.split(';').map((z: string) => z.trim()).filter(Boolean);
        filters.countZips = filters.zips.length;
      } else if (keyTrimmed === 'Specialization') {
        filters.specialization = valueString.split(';').map((s: string) => s.trim()).filter(Boolean);
        filters.countSpecialization = filters.specialization.length;
      } else if (keyTrimmed === 'Gender') {
        filters.gender = valueString.split(';').map((g: string) => g.trim()).filter(Boolean);
        filters.countGender = filters.gender.length;
      } else if (keyTrimmed === 'LicenseState') {
        filters.licenseStates = valueString.split(';').map((s: string) => s.trim()).filter(Boolean);
        filters.countLicense = filters.licenseStates.length;
      }
    });

    return filters;
  };

  const isCompleteList = (item: any) => {
    const filters = parseFiltersFromName(item?.name || '');
    return (
      filters.countStates === 0 &&
      filters.countCities === 0 &&
      filters.countZips === 0 &&
      filters.countGender === 0 &&
      filters.countSpecialization === 0 &&
      filters.countLicense === 0
    );
  };

  const filteredItems = useMemo(() => {
    let items = allDownloadItems;

    // Apply search filter
    if (searchQuery) {
      items = items.filter((item: any) =>
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (activeFilter !== 'all') {
      items = items.filter((item: any) => getStatus(item) === activeFilter);
    }

    return items;
  }, [allDownloadItems, searchQuery, activeFilter]);

  const getFileIcon = (index: number) => {
    const icons = [FaUserMd, FaTooth, FaBaby, FaTeeth];
    const colors = ['blue', 'purple', 'teal', 'orange'];
    return { Icon: icons[index % icons.length], color: colors[index % colors.length] };
  };

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

      <div className={styles.downloadsCard}>
        <div className={styles.cardHeader}>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search downloads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.filterChips}>
            <button
              className={`${styles.filterChip} ${activeFilter === 'all' ? styles.active : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              <span>All</span>
            </button>
            <button
              className={`${styles.filterChip} ${activeFilter === 'active' ? styles.active : ''}`}
              onClick={() => setActiveFilter('active')}
            >
              <FaCheckCircle />
              <span>Active</span>
            </button>
            <button
              className={`${styles.filterChip} ${activeFilter === 'expired' ? styles.active : ''}`}
              onClick={() => setActiveFilter('expired')}
            >
              <FaTimesCircle />
              <span>Expired</span>
            </button>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.downloadsTable}>
            <thead>
              <tr>
                <th className={styles.colName}>
                  <span>Name</span>
                  <FaSort className={styles.sortIcon} />
                </th>
                <th className={styles.colExpire}>
                  <span>Expire Date</span>
                  <FaSort className={styles.sortIcon} />
                </th>
                <th className={styles.colStatus}>
                  <span>Status</span>
                  <FaSort className={styles.sortIcon} />
                </th>
                <th className={styles.colAction}>Action</th>
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
              {loggedInUser && !loading && !filteredItems.length && (
                <tr>
                  <td colSpan={4} className={styles.stateCell}>
                    No any Downloads Found!
                  </td>
                </tr>
              )}
              {filteredItems.map((item: any, index: number) => {
                const status = getStatus(item);
                const isExpired = status === 'expired';
                const isProcessing = status === 'processing';
                const hasLink = !!item?.signedUrl;
                const isExpanded = expandedRows.has(index);
                const { Icon: FileIcon, color: fileColor } = getFileIcon(index);
                const parsedFilters = parseFiltersFromName(item?.name || '');

                return (
                  <React.Fragment key={index}>
                    <tr className={`${styles.downloadRow} ${isExpanded ? styles.expanded : ''}`} data-status={status}>
                      <td className={styles.nameCell}>
                        <div className={styles.productHeader}>
                          <div className={`${styles.fileIcon} ${styles[fileColor]}`}>
                            <FileIcon />
                          </div>
                          <div className={styles.fileInfo}>
                            <div className={styles.fileName}>{item?.name}</div>
                            {!isCompleteList(item) && (
                              <>
                                <div className={styles.fileMeta}>
                                  {parsedFilters?.states && parsedFilters.states[0] !== 'All USA' && (
                                    <span className={styles.metaTag}>
                                      <FaMapMarkerAlt /> {parsedFilters.states.slice(0, 3).join(', ')}
                                      {parsedFilters.states.length > 3 && ` +${parsedFilters.states.length - 3} more`}
                                    </span>
                                  )}
                                  {parsedFilters?.gender && (
                                    <span className={styles.metaTag}>
                                      <FaVenusMars /> {parsedFilters.gender.join(', ')}
                                    </span>
                                  )}
                                  {parsedFilters?.specialization && (
                                    <span className={styles.metaTag}>
                                      <FaStethoscope /> {parsedFilters.specialization[0]}
                                    </span>
                                  )}
                                  {parsedFilters?.licenseStates && (
                                    <span className={styles.metaTag}>
                                      <FaIdCard /> {parsedFilters.licenseStates.slice(0, 2).join(', ')}
                                      {parsedFilters.licenseStates.length > 2 && ` +${parsedFilters.licenseStates.length - 2}`}
                                    </span>
                                  )}
                                </div>
                                <div className={styles.filterPreview}>
                                  <span className={`${styles.filterDot} ${styles.states}`} title={`States: ${parsedFilters.countStates}`}>
                                    S:{parsedFilters.countStates}
                                  </span>
                                  <span className={`${styles.filterDot} ${styles.cities}`} title={`Cities: ${parsedFilters.countCities}`}>
                                    C:{parsedFilters.countCities}
                                  </span>
                                  <span className={`${styles.filterDot} ${styles.zips}`} title={`Zip codes: ${parsedFilters.countZips}`}>
                                    Z:{parsedFilters.countZips}
                                  </span>
                                  <span className={`${styles.filterDot} ${styles.gender}`} title={`Gender: ${parsedFilters.countGender}`}>
                                    G:{parsedFilters.countGender}
                                  </span>
                                  <span className={`${styles.filterDot} ${styles.specialty}`} title={`Specialization: ${parsedFilters.countSpecialization}`}>
                                    SP:{parsedFilters.countSpecialization}
                                  </span>
                                  <span className={`${styles.filterDot} ${styles.license}`} title={`License States: ${parsedFilters.countLicense}`}>
                                    L:{parsedFilters.countLicense}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                          {!isCompleteList(item) && (
                            <button
                              className={`${styles.expandBtn} ${isExpanded ? styles.active : ''}`}
                              onClick={() => toggleExpand(index)}
                              title="View filter details"
                            >
                              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className={styles.expireCell}>
                        <div className={styles.dateMain}>
                          {dayjs(item?.expireDate).format("YYYY-MM-DD")}
                        </div>
                        <div className={styles.dateTime}>
                          {dayjs(item?.expireDate).format("h:mm A")}
                        </div>
                      </td>
                      <td className={styles.statusCell}>
                        {isProcessing ? (
                          <span className={`${styles.statusBadge} ${styles.building}`}>
                            Processing
                          </span>
                        ) : isExpired ? (
                          <span className={`${styles.statusBadge} ${styles.expired}`}>
                            <FaTimesCircle /> Expired
                          </span>
                        ) : (
                          <span className={`${styles.statusBadge} ${styles.active}`}>
                            <FaCheckCircle /> Active
                          </span>
                        )}
                      </td>
                      <td className={styles.actionCell}>
                        {hasLink ? (
                          isExpired ? (
                            <button
                              className={`${styles.actionBtn} ${styles.renewBtn}`}
                              onClick={() => pressRenew(item)}
                            >
                              <FaRedo /> Renew
                            </button>
                          ) : (
                            <a
                              target="_blank"
                              href={item?.signedUrl}
                              rel="noreferrer"
                              className={`${styles.actionBtn} ${styles.downloadBtn}`}
                            >
                              <FaDownload /> Download
                            </a>
                          )
                        ) : (
                          <span className={styles.buildingMsg}>
                            Link is building.{" "}
                            <Link href="/support">Ping us</Link> if this takes more than 5 minutes
                          </span>
                        )}
                      </td>
                    </tr>
                    {isExpanded && !isCompleteList(item) && parsedFilters.countStates > 0 && (
                      <tr className={styles.detailRow}>
                        <td colSpan={4}>
                          <div className={styles.filterBreakdown}>
                            <div className={styles.breakdownGrid}>
                              <div className={`${styles.breakdownItem} ${parsedFilters.countStates === 50 ? styles.fullWidth : ''}`}>
                                <div className={styles.breakdownHeader}>
                                  <FaMapMarkedAlt />
                                  <span className={styles.breakdownTitle}>States</span>
                                  <span className={styles.breakdownCount}>{parsedFilters.countStates}</span>
                                </div>
                                <div className={styles.breakdownChips}>
                                  {parsedFilters.states.slice(0, 6).map((state: string, idx: number) => (
                                    <span key={idx} className={`${styles.bChip} ${styles.blue}`}>
                                      {state}
                                    </span>
                                  ))}
                                  {parsedFilters.states.length > 6 && (
                                    <span className={`${styles.bChip} ${styles.blue}`}>
                                      +{parsedFilters.states.length - 6} more
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className={styles.breakdownItem}>
                                <div className={styles.breakdownHeader}>
                                  <FaCity />
                                  <span className={styles.breakdownTitle}>Cities</span>
                                  <span className={styles.breakdownCount}>{parsedFilters.countCities}</span>
                                </div>
                                <div className={styles.breakdownChips}>
                                  {parsedFilters.cities.slice(0, 4).map((city: any, idx: number) => (
                                    <span key={idx} className={`${styles.bChip} ${styles.teal}`}>
                                      {city.name}
                                    </span>
                                  ))}
                                  {parsedFilters.cities.length > 4 && (
                                    <span className={`${styles.bChip} ${styles.teal}`}>
                                      +{parsedFilters.cities.length - 4} more
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className={styles.breakdownItem}>
                                <div className={styles.breakdownHeader}>
                                  <FaEnvelope />
                                  <span className={styles.breakdownTitle}>Zip Codes</span>
                                  <span className={styles.breakdownCount}>{parsedFilters.countZips}</span>
                                </div>
                                <div className={styles.breakdownChips}>
                                  {parsedFilters.zips.slice(0, 3).map((zip: string, idx: number) => (
                                    <span key={idx} className={`${styles.bChip} ${styles.purple}`}>
                                      {zip}
                                    </span>
                                  ))}
                                  {parsedFilters.zips.length > 3 && (
                                    <span className={`${styles.bChip} ${styles.purple}`}>
                                      +{parsedFilters.zips.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className={styles.breakdownItem}>
                                <div className={styles.breakdownHeader}>
                                  <FaVenusMars />
                                  <span className={styles.breakdownTitle}>Gender</span>
                                </div>
                                <div className={styles.breakdownChips}>
                                  {parsedFilters.gender.map((gen: string, idx: number) => (
                                    <span key={idx} className={`${styles.bChip} ${styles.orange}`}>
                                      {gen}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className={styles.breakdownItem}>
                                <div className={styles.breakdownHeader}>
                                  <FaStethoscope />
                                  <span className={styles.breakdownTitle}>Specialization</span>
                                </div>
                                <div className={styles.breakdownChips}>
                                  {parsedFilters.specialization.map((spec: string, idx: number) => (
                                    <span key={idx} className={`${styles.bChip} ${styles.green}`}>
                                      {spec}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className={styles.breakdownItem}>
                                <div className={styles.breakdownHeader}>
                                  <FaCertificate />
                                  <span className={styles.breakdownTitle}>License State</span>
                                  <span className={styles.breakdownCount}>{parsedFilters.countLicense}</span>
                                </div>
                                <div className={styles.breakdownChips}>
                                  {parsedFilters.licenseStates.slice(0, 4).map((state: string, idx: number) => (
                                    <span key={idx} className={`${styles.bChip} ${styles.indigo}`}>
                                      {state}
                                    </span>
                                  ))}
                                  {parsedFilters.licenseStates.length > 4 && (
                                    <span className={`${styles.bChip} ${styles.indigo}`}>
                                      +{parsedFilters.licenseStates.length - 4} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className={styles.tableFooter}>
          <div className={styles.showingText}>
            Showing <strong>{filteredItems.length}</strong> downloads
          </div>
          <div className={styles.pagination}>
            <button className={`${styles.pageBtn} ${styles.disabled}`}>
              <FaSort style={{ transform: 'rotate(90deg)' }} />
            </button>
            <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
            <button className={`${styles.pageBtn} ${styles.disabled}`}>
              <FaSort style={{ transform: 'rotate(-90deg)' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDownloadsMainView;
