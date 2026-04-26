import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import Login from "./views/Login";
import SignUp from "./views/SignUp";
import styles from "./style.module.scss";
import UCDModal from "../UCDModal/UCDModal";
import { useRootContext } from "@/contexts/RootContext";

const AuthModal = () => {
  const { authEnable, setAuthEnable, loginVisible, setLoginVisible } = useRootContext();
  const [isAnimating, setIsAnimating] = useState(false);

  const pressClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setAuthEnable(false);
      setIsAnimating(false);
    }, 300);
  };

  const pressLoginTab = () => {
    setLoginVisible(true);
  };

  const pressSignUpTab = () => {
    setLoginVisible(false);
  };

  return (
    <UCDModal
      open={authEnable}
      onHide={pressClose}
      centered
      wrapperClassName={`${styles.authModalWrapper} ${isAnimating ? styles.modalExit : ''}`}
      bodyClassName={styles.modalBody}
    >
      <div className={styles.authCard}>
        <div className={styles.modalHeader}>
          <div className={styles.iconBadge}>
            <FiUser className={styles.userIcon} size={28} />
          </div>
          <button 
            type="button" 
            className={styles.closeButton} 
            onClick={pressClose} 
            aria-label="Close auth modal"
            title="Close"
          >
            <IoClose size={20} />
          </button>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>{loginVisible ? "Welcome back" : "Create account"}</h2>
            <p className={styles.subTitle}>{loginVisible ? "Enter your credentials to continue" : "Enter your details to register"}</p>
          </div>

          <div className={styles.formWrapper}>
            {loginVisible ? <Login /> : <SignUp />}
          </div>

          <div className={styles.switchSection}>
            <p className={styles.switchText}>
              {loginVisible ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                className={styles.switchButton}
                onClick={loginVisible ? pressSignUpTab : pressLoginTab}
              >
                {loginVisible ? "Register" : "Log in"}
              </button>
            </p>
          </div>

          {!loginVisible && (
            <div className={styles.termsSection}>
              <p className={styles.termsText}>
                By clicking Register, you agree to accept our{" "}
                <a href="#!" onClick={(event) => event.preventDefault()}>
                  Terms and Conditions
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </UCDModal>
  );
};

export default AuthModal;
