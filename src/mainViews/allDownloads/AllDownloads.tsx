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
      // Temporary: Using dummy data for UI testing
      const dummyData = [
        {
          orderList: [
            {
              name: "5,539,978 Custom Nurse List (Complete List)",
              expireDate: "2026-05-28T15:45:00.000Z",
              signedUrl: "https://example.com/download/nurse-list-complete",
              orderInfo: {
                currentCartItem: [
                  {
                    url: "https://example.com/download/nurse-list-complete",
                    uniqueNPI: "NUR123456",
                    price: 299.99,
                    productName: "5,539,978 Custom Nurse List (Complete List)"
                  }
                ]
              },
              filters: {
                states: ["All USA"],
                countStates: 50,
                cities: [{ name: "All Cities", count: 10000 }],
                countCities: 10000,
                zips: [{ name: "All Zip Codes", count: 5000 }],
                countZips: 5000,
                gender: ["Male", "Female"],
                countGender: 2,
                specialization: ["All Nurses"],
                countSpecialization: 1,
                licenseStates: ["All States"],
                countLicense: 50
              }
            },
            {
              name: "114,780 Custom Doctor List (State: AZ;CA, City: AK=chugiak-anchorage-ak;AK=indian-anchorage-ak, Zip: 02446-5587;02114-3002;01960-7901, Specialization: All Physicians, Gender: Male;Female, LicenseState: CT;AZ;CA)",
              expireDate: "2026-05-28T15:45:00.000Z",
              signedUrl: "https://example.com/download/texas-dental-list",
              orderInfo: {
                currentCartItem: [
                  {
                    url: "https://example.com/download/texas-dental-list",
                    uniqueNPI: "TEX123456",
                    price: 99.99,
                    productName: "114,780 Custom Doctor List"
                  }
                ]
              },
              filters: {
                states: ["AZ", "CA"],
                countStates: 2,
                cities: [
                  { name: "Soldotna, AK", count: 1 },
                  { name: "Sitka, AK", count: 1 },
                  { name: "Anchorage, AK", count: 1 },
                  { name: "Dothan, AL", count: 1 },
                  { name: "Cullman, AL", count: 1 },
                ],
                countCities: 5,
                zips: ["02446-5587", "02114-3002", "01960-7901"],
                countZips: 3,
                gender: ["Male", "Female"],
                countGender: 2,
                specialization: ["All Physicians"],
                countSpecialization: 1,
                licenseStates: ["CT", "AZ", "CA"],
                countLicense: 3
              }
            },
            {
              name: "45,320 Dentists by Specialty (State: NY;TX;FL, City: NY=New York;NY=Buffalo;TX=Houston, Zip: 10001-xxxx;77001-xxxx, Specialization: Orthodontics, Gender: Female, LicenseState: NY;TX)",
              expireDate: "2026-04-05T11:20:00.000Z",
              signedUrl: null,
              orderInfo: {
                currentCartItem: [
                  {
                    url: "https://example.com/download/dentists-specialty",
                    uniqueNPI: "SP123789",
                    price: 199.99,
                    productName: "45,320 Dentists by Specialty"
                  }
                ]
              },
              filters: {
                states: ["NY", "TX", "FL"],
                countStates: 3,
                cities: [
                  { name: "New York, NY", count: 1 },
                  { name: "Buffalo, NY", count: 1 },
                  { name: "Houston, TX", count: 1 },
                ],
                countCities: 8,
                zips: ["10001-xxxx", "77001-xxxx"],
                countZips: 12,
                gender: ["Female"],
                countGender: 1,
                specialization: ["Orthodontics"],
                countSpecialization: 1,
                licenseStates: ["NY", "TX"],
                countLicense: 2
              }
            },
            {
              name: "28,650 Pediatric Dentists Database (State: All USA, City: All Major Cities, Zip: All Zip Codes, Specialization: Pediatric Dentistry, Gender: Male;Female, LicenseState: All States)",
              expireDate: "2026-06-15T09:00:00.000Z",
              signedUrl: "https://example.com/download/pediatric-dentists",
              orderInfo: {
                currentCartItem: [
                  {
                    url: "https://example.com/download/pediatric-dentists",
                    uniqueNPI: "PED456123",
                    price: 149.99,
                    productName: "28,650 Pediatric Dentists Database"
                  }
                ]
              },
              filters: {
                states: ["All USA"],
                countStates: 50,
                cities: [{ name: "All Major Cities", count: 150 }],
                countCities: 150,
                zips: [{ name: "All Zip Codes", count: 500 }],
                countZips: 500,
                gender: ["Male", "Female"],
                countGender: 2,
                specialization: ["Pediatric Dentistry"],
                countSpecialization: 1,
                licenseStates: ["All States"],
                countLicense: 50
              }
            },
            {
              name: "12,480 Orthodontists Contact List (State: IL;PA;OH, City: IL=Chicago;PA=Philadelphia, Zip: 60601-xxxx;19101-xxxx, Specialization: Orthodontics, Gender: Male, LicenseState: IL;PA)",
              expireDate: "2026-04-10T14:15:00.000Z",
              signedUrl: null,
              orderInfo: {
                currentCartItem: [
                  {
                    url: "https://example.com/download/orthodontists",
                    uniqueNPI: "ORTH789456",
                    price: 89.99,
                    productName: "12,480 Orthodontists Contact List"
                  }
                ]
              },
              filters: {
                states: ["IL", "PA", "OH"],
                countStates: 3,
                cities: [
                  { name: "Chicago, IL", count: 1 },
                  { name: "Philadelphia, PA", count: 1 },
                ],
                countCities: 6,
                zips: ["60601-xxxx", "19101-xxxx"],
                countZips: 8,
                gender: ["Male"],
                countGender: 1,
                specialization: ["Orthodontics"],
                countSpecialization: 1,
                licenseStates: ["IL", "PA"],
                countLicense: 2
              }
            }
          ]
        }
      ];
      // Uncomment the line below to use real API
      // const fullDownloadList: any = await instance.post(`downloadList`);
      // setFullDownloadList(fullDownloadList.data);
      setFullDownloadList(dummyData);
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

  const isCompleteList = (item: any) => {
    return item?.name?.includes('(Complete List)');
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
                                   {item?.filters?.states && item.filters.states[0] !== 'All USA' && (
                                     <span className={styles.metaTag}>
                                       <FaMapMarkerAlt /> {item.filters.states.slice(0, 3).join(', ')}
                                       {item.filters.states.length > 3 && ` +${item.filters.states.length - 3} more`}
                                     </span>
                                   )}
                                   {item?.filters?.gender && (
                                     <span className={styles.metaTag}>
                                       <FaVenusMars /> {item.filters.gender.join(', ')}
                                     </span>
                                   )}
                                   {item?.filters?.specialization && (
                                     <span className={styles.metaTag}>
                                       <FaStethoscope /> {item.filters.specialization[0]}
                                     </span>
                                   )}
                                   {item?.filters?.licenseStates && (
                                     <span className={styles.metaTag}>
                                       <FaIdCard /> {item.filters.licenseStates.slice(0, 2).join(', ')}
                                       {item.filters.licenseStates.length > 2 && ` +${item.filters.licenseStates.length - 2}`}
                                     </span>
                                   )}
                                 </div>
                                 <div className={styles.filterPreview}>
                                   <span className={`${styles.filterDot} ${styles.states}`} title={`States: ${item.filters.countStates}`}>
                                     S:{item.filters.countStates}
                                   </span>
                                   <span className={`${styles.filterDot} ${styles.cities}`} title={`Cities: ${item.filters.countCities}`}>
                                     C:{item.filters.countCities}
                                   </span>
                                   <span className={`${styles.filterDot} ${styles.zips}`} title={`Zip codes: ${item.filters.countZips}`}>
                                     Z:{item.filters.countZips}
                                   </span>
                                   <span className={`${styles.filterDot} ${styles.gender}`} title={`Gender: ${item.filters.countGender}`}>
                                     G:{item.filters.countGender}
                                   </span>
                                   <span className={`${styles.filterDot} ${styles.specialty}`} title={`Specialization: ${item.filters.countSpecialization}`}>
                                     SP:{item.filters.countSpecialization}
                                   </span>
                                   <span className={`${styles.filterDot} ${styles.license}`} title={`License States: ${item.filters.countLicense}`}>
                                     L:{item.filters.countLicense}
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
                     {isExpanded && item?.filters && !isCompleteList(item) && (
                      <tr className={styles.detailRow}>
                        <td colSpan={4}>
                          <div className={styles.filterBreakdown}>
                            <div className={styles.breakdownGrid}>
                              <div className={`${styles.breakdownItem} ${item.filters.countStates === 50 ? styles.fullWidth : ''}`}>
                                <div className={styles.breakdownHeader}>
                                  <FaMapMarkedAlt />
                                  <span className={styles.breakdownTitle}>States</span>
                                  <span className={styles.breakdownCount}>{item.filters.countStates}</span>
                                </div>
                                <div className={styles.breakdownChips}>
                                  {item.filters.states.slice(0, 6).map((state: string, idx: number) => (
                                    <span key={idx} className={`${styles.bChip} ${styles.blue}`}>
                                      {state}
                                    </span>
                                  ))}
                                  {item.filters.states.length > 6 && (
                                    <span className={`${styles.bChip} ${styles.blue}`}>
                                      +{item.filters.states.length - 6} more
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className={styles.breakdownItem}>
                                <div className={styles.breakdownHeader}>
                                  <FaCity />
                                  <span className={styles.breakdownTitle}>Cities</span>
                                  <span className={styles.breakdownCount}>{item.filters.countCities}</span>
                                </div>
                                <div className={styles.breakdownChips}>
                                  {item.filters.cities.slice(0, 4).map((city: any, idx: number) => (
                                    <span key={idx} className={`${styles.bChip} ${styles.teal}`}>
                                      {city.name}
                                    </span>
                                  ))}
                                  {item.filters.cities.length > 4 && (
                                    <span className={`${styles.bChip} ${styles.teal}`}>
                                      +{item.filters.cities.length - 4} more
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className={styles.breakdownItem}>
                                <div className={styles.breakdownHeader}>
                                  <FaEnvelope />
                                  <span className={styles.breakdownTitle}>Zip Codes</span>
                                  <span className={styles.breakdownCount}>{item.filters.countZips}</span>
                                </div>
                                <div className={styles.breakdownChips}>
                                  {item.filters.zips.slice(0, 3).map((zip: string, idx: number) => (
                                    <span key={idx} className={`${styles.bChip} ${styles.purple}`}>
                                      {zip}
                                    </span>
                                  ))}
                                  {item.filters.zips.length > 3 && (
                                    <span className={`${styles.bChip} ${styles.purple}`}>
                                      +{item.filters.zips.length - 3} more
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
                                  {item.filters.gender.map((gen: string, idx: number) => (
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
                                  {item.filters.specialization.map((spec: string, idx: number) => (
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
                                  <span className={styles.breakdownCount}>{item.filters.countLicense}</span>
                                </div>
                                <div className={styles.breakdownChips}>
                                  {item.filters.licenseStates.slice(0, 4).map((state: string, idx: number) => (
                                    <span key={idx} className={`${styles.bChip} ${styles.indigo}`}>
                                      {state}
                                    </span>
                                  ))}
                                  {item.filters.licenseStates.length > 4 && (
                                    <span className={`${styles.bChip} ${styles.indigo}`}>
                                      +{item.filters.licenseStates.length - 4} more
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
