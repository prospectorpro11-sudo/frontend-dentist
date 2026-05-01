import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Field, Form as FormikForm, Formik } from "formik";

import styles from "../style.module.scss";
import Button from "@/components/button/Button";
import { setUser } from "@/services/tokenService";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";
import { authenticateWithGoogle, registerUser } from "@/database/Authentication";
import { useRootContext } from "@/contexts/RootContext";
import { attachWithPrefix } from "@/shared/InternalService";

type SignUpFormValues = {
  userName: string;
  email: string;
  password: string;
};

type SignUpFormErrors = Partial<Record<keyof SignUpFormValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateSignUp = (values: SignUpFormValues): SignUpFormErrors => {
  const errors: SignUpFormErrors = {};

  if (!values.userName.trim()) {
    errors.userName = "Full name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password.trim()) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
};

const SignUp = () => {
  const { setAuthLoading, setAuthEnable, setLoggedInUser } = useRootContext();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const loginCallBack = (userResponse: unknown) => {
    setLoading(false);
    setAuthEnable(false);
    setLoggedInUser(userResponse as null);
    setAuthLoading(false);
    setUser(userResponse as null);
  };

  const loginCallBackFail = () => {
    setLoading(false);
    setAuthLoading(false);
  };

  const pressGoogleAuth = () => {
    setLoading(true);
    setAuthLoading(true);
    authenticateWithGoogle();
  };

  return (
    <Formik<SignUpFormValues>
      initialValues={{
        userName: "",
        email: "",
        password: "",
      }}
      validate={validateSignUp}
      onSubmit={(values, { resetForm }) => {
        setLoading(true);
        setAuthLoading(true);

        registerUser(
          values.userName.trim(),
          attachWithPrefix(values.email.trim()),
          values.password,
          (response: unknown) => {
            resetForm();
            loginCallBack(response);
          },
          loginCallBackFail
        );
      }}
    >
      {({ errors, touched }) => (
        <FormikForm className={styles.formContent}>
          <div className={styles.formGroup}>
            <label className={styles.fieldLabel} htmlFor="userName">
              Full name
            </label>
            <div className={styles.fieldControl}>
              <span className={styles.fieldIcon}>
                <FiUser size={16} />
              </span>
              <Field id="userName" name="userName" type="text" placeholder="Emma Taylor" className={styles.fieldInput} />
            </div>
            {errors.userName && touched.userName ? <p className={styles.errorText}>{errors.userName}</p> : null}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.fieldLabel} htmlFor="email">
              Email
            </label>
            <div className={styles.fieldControl}>
              <span className={styles.fieldIcon}>
                <FiMail size={16} />
              </span>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="emmataylor7@example.com"
                className={styles.fieldInput}
              />
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

          <Button disabled={loading} type="submit" isFullWidth variant={BUTTON_VARIANT_ENUM.ACTION}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default SignUp;
