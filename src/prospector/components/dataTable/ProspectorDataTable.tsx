import { useMemo, useState } from "react";
import Pagination from "@/components/pagination/Pagination";
import { useProspectorContext } from "@/contexts/ProspectorContext";
import { IProspectorData } from "@/shared/interface";
import styles from "./prospectorDataTable.module.scss";
import { FaCheckCircle, FaSearch, FaSyncAlt, FaThList } from "react-icons/fa";
import { FaEnvelope, FaPhone, FaSort } from "react-icons/fa6";

const PAGE_SIZE = 10;

type ColumnConfig = {
    key: keyof IProspectorData;
    label: string;
    required?: boolean;
    render: (row: IProspectorData) => string;
};

const columns: ColumnConfig[] = [
    { key: "Full Name", label: "Full Name", required: true, render: (row) => row["Full Name"] },
    { key: "Email", label: "Email", required: true, render: (row) => row.Email },
    { key: "NPI", label: "NPI", render: (row) => row.NPI ?? "-" },
    { key: "First Name", label: "First Name", render: (row) => row["First Name"] },
    { key: "Middle Name", label: "Middle Name", render: (row) => row["Middle Name"] ?? "-" },
    { key: "Last Name", label: "Last Name", render: (row) => row["Last Name"] },
    { key: "Suffix", label: "Suffix", render: (row) => row.Suffix ?? "-" },
    { key: "Title", label: "Title", render: (row) => row.Title ?? "-" },
    { key: "Gender", label: "Gender", render: (row) => row.Gender },
    { key: "Specialty Code", label: "Specialty Code", render: (row) => row["Specialty Code"] },
    { key: "Specialty", label: "Specialty", render: (row) => row.Specialty },
    { key: "Specialty2", label: "Specialty2", render: (row) => row.Specialty2 ?? "-" },
    { key: "Address1", label: "Address1", render: (row) => row.Address1 },
    { key: "Address2", label: "Address2", render: (row) => row.Address2 ?? "-" },
    { key: "City", label: "City", render: (row) => row.City },
    { key: "State", label: "State", render: (row) => row.State },
    { key: "Zip Code", label: "Zip Code", render: (row) => row["Zip Code"] },
    { key: "Phone", label: "Phone", render: (row) => row.Phone },
    { key: "Fax", label: "Fax", render: (row) => row.Fax || "-" },
    { key: "License Number", label: "License Number", render: (row) => row["License Number"] ?? "-" },
    { key: "License State", label: "License State", render: (row) => row["License State"] },
    { key: "Certifications", label: "Certifications", render: (row) => row.Certifications ?? "-" },
    { key: "Category", label: "Category", render: (row) => row.Category },
    { key: "Address", label: "Address", render: (row) => row.Address },
    { key: "FullName", label: "FullName", render: (row) => row.FullName },
    { key: "County", label: "County", render: (row) => row.County ?? "-" },
    { key: "Office", label: "Office", render: (row) => row.Office ?? "-" },
    { key: "Cell Number", label: "Cell Number", render: (row) => row["Cell Number"] ?? "-" },
    { key: "Cell Numbers", label: "Cell Numbers", render: (row) => row["Cell Numbers"] ?? "-" },
];

const defaultVisibleColumns = new Set<keyof IProspectorData>([
    "NPI",
    "First Name",
    "Last Name",
    "Gender",
    "Specialty",
    "City",
    "State",
    "Phone",
    "License State",
]);

const getInitialVisibility = () =>
    columns.reduce<Record<string, boolean>>((accumulator, column) => {
        accumulator[column.key] = column.required || defaultVisibleColumns.has(column.key);
        return accumulator;
    }, {});

const ProspectorDataTable = () => {
    const { data, stats } = useProspectorContext();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [columnPanelOpen, setColumnPanelOpen] = useState<boolean>(false);
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(getInitialVisibility);

    const exposedRows = data ?? [];
    const totalContacts = stats?.totalContacts ?? exposedRows.length;
    const exposedTotal = exposedRows.length;
    const totalPages = Math.max(1, Math.min(3, Math.ceil(exposedTotal / PAGE_SIZE)));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, exposedTotal);
    const rows = useMemo(() => exposedRows.slice(startIndex, startIndex + PAGE_SIZE), [exposedRows, startIndex]);

    const visibleColumnsList = columns.filter((column) => visibleColumns[column.key]);

    const visibleCount = visibleColumnsList.length + 1;
    const totalColumnCount = columns.length + 1;

    const toggleColumn = (column: ColumnConfig) => {
        if (column.required) {
            return;
        }

        setVisibleColumns((current) => ({
            ...current,
            [column.key]: !current[column.key],
        }));
    };

    return (
        <div className={styles.gridSec}>
            <div className={styles.gtbar}>
                <div className={styles.gtleft}>
                    <div className={styles.gsearch}>
                        <i><FaSearch /></i>
                        <input type="text" placeholder="Search contacts..." />
                    </div>
                    <button
                        className={`${styles.tblbtn} ${columnPanelOpen ? styles.active : ""}`}
                        type="button"
                        onClick={() => setColumnPanelOpen((current) => !current)}
                    >
                        <FaThList /> Columns <span className={styles.cnt}>{visibleCount}/{totalColumnCount}</span>
                    </button>
                </div>
                <div className={styles.gtright}>
                    <button className={styles.gtact} type="button" title="Refresh">
                        <FaSyncAlt />
                    </button>
                </div>
            </div>

            {columnPanelOpen && (
                <div className={styles.colpan}>
                    {columns.map((column) => {
                        const isVisible = Boolean(visibleColumns[column.key]);
                        const isRequired = Boolean(column.required);

                        return (
                            <button
                                key={column.key}
                                className={`${styles.coltgl} ${isVisible ? styles.on : styles.off} ${isRequired ? styles.required : ""}`}
                                type="button"
                                onClick={() => toggleColumn(column)}
                                disabled={isRequired}
                                title={isRequired ? `${column.label} is always visible` : `Toggle ${column.label}`}
                            >
                                <FaCheckCircle /> {column.label}
                            </button>
                        );
                    })}
                </div>
            )}

            <div className={styles.gridWrap}>
                <table className={styles.grid}>
                    <thead>
                        <tr>
                            <th>
                                <div className={styles.thInner}>
                                    # <i className={styles.sico}><FaSort /></i>
                                </div>
                            </th>
                            {visibleColumnsList.map((column) => (
                                <th key={column.key}>
                                    <div className={styles.thInner}>
                                        {column.label} <i className={styles.sico}><FaSort /></i>
                                    </div>
                                    <div className={styles.rhandle} />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length > 0 ? (
                            rows.map((row, rowIndex) => {
                                const serial = startIndex + rowIndex + 1;

                                return (
                                    <tr key={`${row.FullName}-${serial}`}>
                                        <td>
                                            <div className={styles.rnum}>{serial}</div>
                                        </td>
                                        {visibleColumnsList.map((column) => {
                                            const value = column.render(row);

                                            if (column.key === "Full Name") {
                                                return (
                                                    <td key={column.key}>
                                                        <div className={`${styles.cell} ${styles.ncell}`}>
                                                            <div className={styles.nava}>{value.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("") || "NA"}</div>
                                                            <div>
                                                                <div className={styles.nname}>{value}</div>
                                                                <div className={styles.nsub}>{row.Specialty}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                );
                                            }

                                            if (column.key === "Email") {
                                                return (
                                                    <td key={column.key}>
                                                        <span className={styles.emText}><span className={styles.ei}><FaEnvelope /></span> {value}</span>
                                                    </td>
                                                );
                                            }

                                            if (column.key === "Phone" || column.key === "Cell Number" || column.key === "Cell Numbers") {
                                                return (
                                                    <td key={column.key}>
                                                        <span className={styles.phText}><span className={styles.pi}><FaPhone /></span> {value}</span>
                                                    </td>
                                                );
                                            }

                                            if (column.key === "State" || column.key === "License State") {
                                                return (
                                                    <td key={column.key}>
                                                        <span className={styles.sbdg}>{value}</span>
                                                    </td>
                                                );
                                            }

                                            if (column.key === "Specialty" || column.key === "Specialty2" || column.key === "Category") {
                                                return (
                                                    <td key={column.key}>
                                                        <span className={`${styles.spbdg} ${styles.c1}`}>{value}</span>
                                                    </td>
                                                );
                                            }

                                            return (
                                                <td key={column.key}>
                                                    <span className={styles.ctText}>{value}</span>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={visibleColumnsList.length + 1}>
                                    <div className={styles.emptyState}>No contacts available.</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className={styles.gprog}>
                <div className={styles.gprogress}>
                    <div className={styles.gfill} style={{ width: `${totalPages > 0 ? (currentPage / totalPages) * 100 : 0}%` }} />
                </div>
            </div>

            <div className={styles.gfoot}>
                <div className={styles.rc}>
                    Showing <b>{totalContacts === 0 ? 0 : startIndex + 1}</b> to <b>{endIndex}</b> of <b>{totalContacts}</b> results
                </div>
                <Pagination
                    currentPage={safeCurrentPage}
                    totalPages={totalPages}
                    pageEndIndex={endIndex}
                    totalResults={exposedTotal}
                    perPage={PAGE_SIZE}
                    perPageOptions={[PAGE_SIZE]}
                    onPageChange={(page) => setCurrentPage(Math.min(3, Math.max(1, page)))}
                    onPerPageChange={() => undefined}
                />
            </div>
        </div>
    );
};

export default ProspectorDataTable;