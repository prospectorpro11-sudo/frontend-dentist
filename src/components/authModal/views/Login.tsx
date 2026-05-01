import { useState } from "react";
import { Field, Form as FormikForm, Formik } from "formik";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FiLock, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

import { setUser } from "@/services/tokenService";
import styles from "../style.module.scss";
import { useRootContext } from "@/contexts/RootContext";
import { attachWithPrefix } from "@/shared/InternalService";
import { authenticateWithGoogle, loginUser } from "@/database/Authentication";
import Button from "@/components/button/Button";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateLogin = (values: LoginFormValues): LoginFormErrors => {
  const errors: LoginFormErrors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password.trim()) {
    errors.password = "Password is required.";
  }

  return errors;
};

const Login = () => {
  const { setAuthEnable, setAuthLoading, setForgetPasswordModalVisible, setLoggedInUser } = useRootContext();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const loginCallBack = (user: unknown) => {
    setAuthEnable(false);
    setLoading(false);
    setAuthLoading(false);
    setLoggedInUser(user as null);
    setUser(user as null);
  };

  const loginCallBackFail = () => {
    setLoading(false);
    setAuthLoading(false);
  };

  const pressForgetPassword = () => {
    setAuthEnable(false);
    setAuthLoading(false);
    setForgetPasswordModalVisible(true);
  };

  const pressGoogleAuth = () => {
    setLoading(true);
    setAuthLoading(true);
    authenticateWithGoogle();
  };

  return (
    <Formik<LoginFormValues>
      initialValues={{
        email: "",
        password: "",
      }}
      validate={validateLogin}
      onSubmit={(values) => {
        setLoading(true);
        setAuthLoading(true);

        loginUser(attachWithPrefix(values.email.trim()), values.password, loginCallBack, loginCallBackFail);
      }}
    >
      {({ errors, touched }) => (
        <FormikForm className={styles.formContent}>
          <div className={styles.formGroup}>
            <label className={styles.fieldLabel} htmlFor="email">
              Email
            </label>
            <div className={styles.fieldControl}>
              <span className={styles.fieldIcon}>
                <FiMail size={16} />
              </span>
              <Field id="email" name="email" type="email" placeholder="emmataylor7@example.com" className={styles.fieldInput} />
            </div>
            {errors.email && touched.email ? <p className={styles.errorText}>{errors.email}</p> : null}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.fieldLabel} htmlFor="password">
              Password
            </label>
            <div className={styles.fieldControl}>
              <span className={styles.fieldIcon}>
                <FiLock size={16} />
              </span>
              <Field
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="**************"
                className={styles.fieldInput}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPass((prev) => !prev)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <BsEyeSlash size={16} /> : <BsEye size={16} />}
              </button>
            </div>
            {errors.password && touched.password ? <p className={styles.errorText}>{errors.password}</p> : null}
          </div>
          <button type="button" className={styles.socialButton} disabled={loading} onClick={pressGoogleAuth}>
            <span className={styles.socialIcon}>
              <FcGoogle size={18} />
            </span>
            Continue with Google
          </button>
          <div className={styles.socialDivider}>or</div>
          <div className="d-flex flex-column gap-1">
            <Button className="mx-auto" disabled={loading} variant={BUTTON_VARIANT_ENUM.TEXT} onClick={pressForgetPassword}>
              Forgot Password?
            </Button>
            <Button disabled={loading} type="submit" isFullWidth variant={BUTTON_VARIANT_ENUM.ACTION}>
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Login;
