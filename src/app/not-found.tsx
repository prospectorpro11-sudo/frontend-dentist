"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import styles from "./not-found.module.scss";
import Button from "@/components/button/Button";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";
import FrontendLayout from "@/layouts/frontend/FrontendLayout";

export default function NotFound() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <FrontendLayout>
      <div
        className={`${styles.wrapper} ${isLoaded ? styles.loaded : ''}`}
        ref={wrapperRef}
      >
        {/* ── Interactive spotlight effect ── */}
        <div
          className={styles.spotlight}
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        />

        {/* ── Floating geometric shapes ── */}
        <div className={styles.shapes}>
          <div className={`${styles.shape} ${styles.shape1}`} />
          <div className={`${styles.shape} ${styles.shape2}`} />
          <div className={`${styles.shape} ${styles.shape3}`} />
          <div className={`${styles.shape} ${styles.shape4}`} />
          <div className={`${styles.shape} ${styles.shape5}`} />
          <div className={`${styles.shape} ${styles.shape6}`} />
        </div>

        {/* ── Particle field ── */}
        <div className={styles.particles}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                '--delay': `${i * 0.15}s`,
                '--duration': `${3 + Math.random() * 2}s`,
                '--size': `${2 + Math.random() * 4}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* ── Main content ── */}
        <div className={styles.content}>
          {/* Animated 404 with glitch effect */}
          <div className={styles.errorCodeWrapper}>
            <div className={styles.errorCode} data-text="404">
              404
            </div>
            <div className={styles.errorCodeGlitch} data-text="404">
              404
            </div>
          </div>

          {/* Decorative elements */}
          <div className={styles.decorativeLine}>
            <span className={styles.lineDot} />
            <span className={styles.lineBar} />
            <span className={styles.lineDot} />
          </div>

          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.description}>
            Oops! The page you&apos;re looking for seems to have wandered off.
            Don&apos;t worry, we&apos;ll help you find your way back.
          </p>

          {/* Action buttons with hover effects */}
          <div className={styles.actions}>
            <Button
              variant={BUTTON_VARIANT_ENUM.PRIMARY}
              icon={<i className="bi bi-arrow-left" />}
              onClick={() => router.back()}
              className={styles.actionButton}
            >
              Go Back
            </Button>
            <Link href="/">
              <Button
                variant={BUTTON_VARIANT_ENUM.TERTIARY}
                icon={<i className="bi bi-house-door" />}
                className={styles.actionButton}
              >
                Homepage
              </Button>
            </Link>
          </div>

          {/* Helpful links */}
          <div className={styles.helpfulLinks}>
            <span className={styles.helpText}>Or try these:</span>
            <div className={styles.linkGroup}>
              <Link href="/prospector" className={styles.helpLink}>
                Prospector
              </Link>
              <span className={styles.linkSeparator}>•</span>
              <Link href="/contact-us" className={styles.helpLink}>
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Corner decorations */}
        <div className={styles.cornerDecoration}>
          <div className={`${styles.corner} ${styles.topLeft}`} />
          <div className={`${styles.corner} ${styles.topRight}`} />
          <div className={`${styles.corner} ${styles.bottomLeft}`} />
          <div className={`${styles.corner} ${styles.bottomRight}`} />
        </div>
      </div>
    </FrontendLayout>
  );
}
