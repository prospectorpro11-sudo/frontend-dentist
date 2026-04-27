import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiKey, FiMail, FiSend, FiShield } from "react-icons/fi";

import Button from "../button/Button";
import styles from "./style.module.scss";
import UCDModal from "../UCDModal/UCDModal";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";
import { useRootContext } from "@/contexts/RootContext";
import { resetPassword } from "@/database/Authentication";
import { triggerForm, validateEmail } from "@/shared/InternalService";


const ForgotPasswordModal = () => {
  const {
    forgetPasswordModalVisible,
    setForgetPasswordModalVisible,
    setAuthEnable,
    setLoginVisible,
  } = useRootContext();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const pressClose = () => {
    setForgetPasswordModalVisible(false);
  };

  const pressBackToLogin = () => {
    setForgetPasswordModalVisible(false);
    setAuthEnable(true);
    setLoginVisible(true);
  };

  const pressForgetPassword = async () => {
    if (validateEmail(email)) {
      triggerForm({
        title: "",
        text: "Valid Email is required",
        icon: "error",
        confirmButtonText: "OK",
      });

      return;
    }

    setLoading(true);

    try {
      resetPassword(email, setLoading);
    } catch { }
  };

  return (
    <UCDModal
      open={forgetPasswordModalVisible}
      onHide={pressClose}
      centered
      wrapperClassName={styles.modalWrapper}
      bodyClassName={styles.modalBody}
    >
      <div className={styles.card}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={pressClose}
          aria-label="Close forgot password modal"
        >
          <IoClose size={18} />
        </button>

        <div className={styles.kicker}>Password Recovery</div>

        <div className={styles.iconBadge}>
          <FiKey size={26} />
        </div>

        <h2 className={styles.title}>Reset your password</h2>
        <p className={styles.subTitle}>
          We will email you a secure link to reset your password.
        </p>

        <div className={styles.formGroup}>
          <label className={styles.fieldLabel} htmlFor="forgot-password-email">
            Email
          </label>
          <div className={styles.fieldControl}>
            <span className={styles.fieldIcon}>
              <FiMail size={16} />
            </span>
            <input
              id="forgot-password-email"
              type="email"
              value={email}
              placeholder="you@company.com"
              onChange={(event) => setEmail(event.target.value)}
              className={styles.fieldInput}
            />
          </div>
        </div>

        <div className={styles.helperCard}>
          <span className={styles.helperIcon}>
            <FiShield size={16} />
          </span>
          <p className={styles.helperText}>
            The reset link expires after 30 minutes for your security.
          </p>
        </div>

        <div className={styles.actionRow}>
          <Button
            isLoading={loading}
            disabled={loading}
            isFullWidth
            variant={BUTTON_VARIANT_ENUM.ACTION}
            onClick={pressForgetPassword}
            icon={<FiSend size={16} />}
          >
            Send reset link
          </Button>
          <button
            type="button"
            className={styles.backButton}
            onClick={pressBackToLogin}
          >
            Back to sign in
          </button>
        </div>
      </div>
    </UCDModal>
  );
};

export default ForgotPasswordModal;
