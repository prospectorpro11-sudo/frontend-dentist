import classNames from "classnames";
import styles from "./pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pageEndIndex: number;
  totalResults: number;
  perPage: number;
  perPageOptions?: number[];
  showPerPage?: boolean;
  fullWidth?: boolean;
  className?: string;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

const getPageTokens = (total: number, current: number): Array<number | "ellipsis"> => {
  if (total <= 1) return [1];

  const pages: number[] = [];
  for (let i = 1; i <= total; i += 1) {
    if (total <= 6 || i <= 2 || i > total - 1 || Math.abs(i - current) <= 1) {
      pages.push(i);
    }
  }

  const uniquePages = [...new Set(pages)].sort((a, b) => a - b);
  const tokens: Array<number | "ellipsis"> = [];
  let last = 0;

  uniquePages.forEach((p) => {
    if (p - last > 1) tokens.push("ellipsis");
    tokens.push(p);
    last = p;
  });

  return tokens;
};

const Pagination = ({
  currentPage,
  totalPages,
  pageEndIndex,
  totalResults,
  perPage,
  perPageOptions = [6, 9, 12, 24],
  showPerPage = true,
  fullWidth = false,
  className,
  onPageChange,
  onPerPageChange,
}: PaginationProps) => {
  return (
    <div className={classNames(styles.paginationSection, fullWidth && styles.fullWidth, className)}>
      <div className={styles.showingText}>
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> -{" "}
        <span>
          Showing <strong>{pageEndIndex}</strong> of {totalResults} results
        </span>
      </div>

      {showPerPage && (
        <div className={styles.perPageGroup}>
          <span>Per page</span>
          <select value={perPage} onChange={(e) => onPerPageChange(parseInt(e.target.value, 10))}>
            {perPageOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.pageBtns}>
        <button
          type="button"
          className={styles.pageBtn}
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          {"<"}
        </button>

        {getPageTokens(totalPages, currentPage).map((token, idx) => {
          if (token === "ellipsis") {
            return <span key={`ellipsis-${idx}`}>...</span>;
          }

          return (
            <button
              key={token}
              type="button"
              className={classNames(styles.pageBtn, token === currentPage && styles.pageBtnActive)}
              onClick={() => onPageChange(token)}
            >
              {token}
            </button>
          );
        })}

        <button
          type="button"
          className={styles.pageBtn}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
