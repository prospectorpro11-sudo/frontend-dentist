import { FiUser } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import Login from "./views/Login";
import SignUp from "./views/SignUp";
import styles from "./style.module.scss";
import UCDModal from "../UCDModal/UCDModal";
import { useRootContext } from "@/contexts/RootContext";

const AuthModal = () => {
  const { authEnable, setAuthEnable, loginVisible, setLoginVisible } = useRootContext();

  const pressClose = () => {
    setAuthEnable(false);
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
      wrapperClassName={styles.authModalWrapper}
      bodyClassName={styles.modalBody}
    >
      <div className={styles.authCard}>
        <button type="button" className={styles.closeButton} onClick={pressClose} aria-label="Close auth modal">
          <IoClose size={18} />
        </button>

        <div className={styles.iconBadge}>
          <FiUser size={26} />
        </div>

        <h2 className={styles.title}>{loginVisible ? "Welcome back" : "Create a new Account"}</h2>
        <p className={styles.subTitle}>{loginVisible ? "Enter your credentials to continue" : "Enter your details and register"}</p>

        <div className={styles.formWrapper}>{loginVisible ? <Login /> : <SignUp />}</div>

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

        {!loginVisible && (
          <p className={styles.termsText}>
            By clicking Register, you agree to accept our{" "}
            <a href="#!" onClick={(event) => event.preventDefault()}>
              Terms and Conditions
            </a>
          </p>
        )}
      </div>
    </UCDModal>
  );
};

export default AuthModal;
