"use client";
import { IOption } from "@/shared/types";
import { TbUserSearch } from "react-icons/tb";
import { DATABASE_MAIN_TYPES } from "@/shared/enums";

import Button from "../button/Button";
import styles from "./freeSampleLeftContent.module.scss";
import { getQueryString } from "@/shared/InternalService";

interface IFreeSampleLeftContent {
  databaseMainTypes: DATABASE_MAIN_TYPES;
  selectedItem: IOption | null;
}

const FreeSampleLeftContent = (props: IFreeSampleLeftContent) => {
  const { selectedItem, databaseMainTypes } = props;

  return (
    <div className={styles.ctaBanner}>
      <div className={styles.ctaContent}>
        <div className={styles.ctaLabel}>Need a bigger list?</div>
        <p className={styles.ctaDescription}>
          Receive a premium custom list designed specifically for your needs.
        </p>
      </div>
      <a
        href={
          selectedItem == null
            ? undefined
            : `${process.env.NEXT_PUBLIC_BASE_URL}/app/prospector${getQueryString(selectedItem?.filterValue ?? "", databaseMainTypes)}`
        }
        style={
          selectedItem == null
            ? { pointerEvents: "none", opacity: 0.6 }
            : undefined
        }
        tabIndex={selectedItem == null ? -1 : 0}
        className={styles.ctaLink}
      >
        <Button className={styles.ctaButton}>
          <TbUserSearch size={20} fontWeight="bold" /> Customize the Premium List
        </Button>
      </a>
    </div>
  );
};

export default FreeSampleLeftContent;
