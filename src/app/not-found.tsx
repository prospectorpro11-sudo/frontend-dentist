"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./not-found.module.scss";
import Button from "@/components/button/Button";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";
import FrontendLayout from "@/layouts/frontend/FrontendLayout";

export default function NotFound() {
  const router = useRouter();

  return (
    <FrontendLayout>
      <div className={styles.wrapper}>
        {/* ── Floating ambient shapes ── */}
        <div className={styles.shapes}>
          <div className={styles.shape} />
          <div className={styles.shape} />
          <div className={styles.shape} />
          <div className={styles.shape} />
        </div>

        {/* ── Main content ── */}
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          <div className={styles.divider} />
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.description}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
          <div className={styles.actions}>
            <Button
              variant={BUTTON_VARIANT_ENUM.PRIMARY}
              icon={<i className="bi bi-arrow-left" />}
              onClick={() => router.back()}
            >
              Go Back
            </Button>
            <Link href="/">
              <Button
                variant={BUTTON_VARIANT_ENUM.TERTIARY}
                icon={<i className="bi bi-house-door" />}
              >
                Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </FrontendLayout>
  );
}
