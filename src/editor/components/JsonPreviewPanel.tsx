"use client";

import { useMemo } from "react";
import Button from "@/components/button/Button";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";
import styles from "../editorWorkspace.module.scss";
import { triggerForm } from "@/shared/InternalService";

type JsonPreviewPanelProps = {
  title?: string;
  data: Record<string, any>;
};

const JsonPreviewPanel = ({ title = "JSON Preview", data }: JsonPreviewPanelProps) => {
  const formatted = useMemo(() => JSON.stringify(data || {}, null, 2), [data]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
      triggerForm({
        title: "Copied",
        text: "JSON has been copied to your clipboard.",
        icon: "success",
      });
    } catch (_error) {
      triggerForm({
        title: "Copy failed",
        text: "Could not copy JSON. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className={`${styles.card} ${styles.scrollCard}`}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>{title}</h3>
        <Button variant={BUTTON_VARIANT_ENUM.SECONDARY} onClick={onCopy}>
          Copy JSON
        </Button>
      </div>
      <pre className={styles.jsonPre}>{formatted}</pre>
    </div>
  );
};

export default JsonPreviewPanel;
