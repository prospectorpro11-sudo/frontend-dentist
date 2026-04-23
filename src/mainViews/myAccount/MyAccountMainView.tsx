"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
import Select, { SingleValue } from "react-select";
import classNames from "classnames";
import Form from "react-bootstrap/Form";
import { Formik, Field, Form as FormikForm } from "formik";

import instance from "../../services/baseServices";
import styles from "./myAccountMainView.module.scss";
import { COUNTRY_LIST } from "@/seeds/countryList";
import { resetPassword } from "@/database/Authentication";
import { useRootContext } from "@/contexts/RootContext";
import { BiCamera } from "react-icons/bi";
import {
  replaceWithPrefix,
  triggerForm,
  validateRequired,
  validURL,
} from "@/shared/InternalService";
import Button from "@/components/button/Button";
import { BUTTON_SIZE_ENUM, BUTTON_VARIANT_ENUM } from "@/shared/enums";
import UserProfile from "@/components/images/userProfile";
import { COLORS } from "@/shared/colors";

dayjs.extend(utc);

type CountryOption = {
  value: string;
  label: string;
};

const mapCountryToOption = (countryValue: unknown): CountryOption | null => {
  if (!countryValue) {
    return null;
  }

  if (typeof countryValue === "object") {
    const typedCountry = countryValue as Partial<CountryOption>;
    if (
      typeof typedCountry.value === "string" &&
      typeof typedCountry.label === "string"
    ) {
      return {
        value: typedCountry.value,
        label: typedCountry.label,
      };
    }
  }

  if (typeof countryValue === "string") {
    return (
      COUNTRY_LIST.find(
        (country) =>
          country.value === countryValue || country.label === countryValue,
      ) || null
    );
  }

  return null;
};

const IconUser = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconMail = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconMapPin = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconEdit = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const IconKey = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);
const IconGlobe = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

function LabeledField({
  label,
  id,
  name,
  placeholder = "",
  type = "text",
  validate,
  errors,
}: any) {
  return (
    <Form.Group className={styles.fieldGroup}>
      <Form.Label htmlFor={id} className={styles.fieldLabel}>
        {label}
      </Form.Label>
      <Field
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        validate={validate}
        className={styles.fieldInput}
      />
      {errors?.[name] && (
        <Form.Text className={styles.fieldError}>{errors[name]}</Form.Text>
      )}
    </Form.Group>
  );
}

/* ─── InfoRow helper (read-only display) ─────────────────────────── */
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <div className={styles.infoRow}>
      <span className={styles.infoIcon}>{icon}</span>
      <div>
        <span className={styles.infoLabel}>{label}</span>
        <span className={styles.infoValue}>{value}</span>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
const MyAccountMainView = () => {
  const { loggedInUser, setLoggedInUser } = useRootContext();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [editable, setEditable] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null,
  );
  const country = selectedCountry || mapCountryToOption(loggedInUser?.country);

  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const pressEditable = () => {
    setEditable(!editable);
  };

  const changeHandler = (value: SingleValue<CountryOption>) => {
    setSelectedCountry(value);
  };

  const pressChange = () => {
    setResetLoading(true);
    loggedInUser?.email && resetPassword(loggedInUser?.email, setResetLoading);
  };

  useEffect(() => {
    const userDetails = async () => {
      try {
        const response = await instance.post(`/user`);
        setUserDetails(response.data);
      } catch (error) {
        console.log(error, "error checker")
      }
    }
    userDetails();
  }, [])



  return (
    <div className={styles.page}>
      {/* ── Page header ── */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Account</h1>
        <p className={styles.pageSubtitle}>
          Manage your profile and account settings
        </p>
      </div>

      <div className={styles.layout}>
        {/* ════════ LEFT — profile sidebar ════════ */}
        <aside className={styles.sidebar}>
          {/* avatar */}
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrap}>
              <div className={styles.picture}>
                <Image
                  src="/profile_dummy.jpg"
                  width={110}
                  layout="fixed"
                  height={110}
                  alt="Profile picture"
                />
              </div>
              <div className={styles.upload}>
                <label>
                  <input type="file" disabled />
                  <Button
                    disabled
                    type="button"
                    variant={BUTTON_VARIANT_ENUM.TERTIARY}
                  >
                    <BiCamera size={18} />
                  </Button>
                </label>
              </div>
            </div>
            {loggedInUser?.displayName && (
              <h2 className={styles.avatarName}>{loggedInUser.displayName}</h2>
            )}
            <p className={styles.avatarEmail}>
              {replaceWithPrefix(loggedInUser?.email || "")}
            </p>
          </div>

          {/* divider */}
          <hr className={styles.sidebarDivider} />

          {/* address summary */}
          <div className={styles.addressSummary}>
            <p className={styles.sidebarSectionLabel}>Address on file</p>
            {loggedInUser ? (
              <>
                <InfoRow
                  icon={<IconMapPin />}
                  label="Street"
                  value={[
                    loggedInUser?.streetAddress,
                    loggedInUser?.streetAddress2,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                />
                <InfoRow
                  icon={<IconMapPin />}
                  label="City"
                  value={[
                    loggedInUser?.city,
                    loggedInUser?.state,
                    loggedInUser?.zip,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                />
                <InfoRow
                  icon={<IconGlobe />}
                  label="Country"
                  value={mapCountryToOption(loggedInUser?.country)?.label}
                />
              </>
            ) : (
              <p className={styles.noData}>No address saved yet.</p>
            )}
          </div>

          {/* illustration */}
          <div className={styles.illustration}>
            <UserProfile
              width={160}
              height={160}
              primary={COLORS.PRIMARY}
              secondary={COLORS.SECONDARY}
            />
          </div>
        </aside>

        {/* ════════ RIGHT — main content ════════ */}
        <main className={styles.content}>
          {/* ── Personal Info section ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <IconUser />
              </div>
              <div>
                <h2 className={styles.sectionTitle}>Personal Information</h2>
                <p className={styles.sectionDesc}>
                  Your name, company, and contact details
                </p>
              </div>
            </div>

            {editable ? (
              /* ─── EDIT FORM ─── */
              <Formik
                initialValues={{
                  userName: loggedInUser?.name,
                  companyName: loggedInUser?.companyName,
                  companyWebsite: loggedInUser?.companyWebsite,
                  streetAddress: loggedInUser?.streetAddress,
                  streetAddress2: loggedInUser?.streetAddress2,
                  city: loggedInUser?.city,
                  state: loggedInUser?.state,
                  zip: loggedInUser?.zip,
                }}
                onSubmit={async (values, { resetForm }) => {
                  if (!country) {
                    triggerForm({
                      text: "Country field is empty",
                      icon: "error",
                      confirmButtonText: "OK",
                    });
                    return;
                  }

                  setLoading(true);
                  const oldLoggedInUser = { ...loggedInUser };

                  // TODO: Check
                  try {
                    await instance.post(`/updateUser`, {
                      companyName: values?.companyName,
                      companyWebsite: values?.companyWebsite,
                      streetAddress: values?.streetAddress,
                      city: values?.city,
                      state: values?.state,
                      zip: values?.zip,
                      streetAddress2: values.streetAddress2 || "",
                      country,
                      date: dayjs().unix(),
                      name: values.userName,
                    });
                    // await UserService.update(loggedInUser.uid, {
                    //   companyName: values?.companyName,
                    //   companyWebsite: values?.companyWebsite,
                    //   streetAddress: values?.streetAddress,
                    //   city: values?.city,
                    //   state: values?.state,
                    //   zip: values?.zip,
                    //   streetAddress2: values.streetAddress2 || "",
                    //   country,
                    //   date: dayjs().unix(),
                    //   name: values.userName,
                    // });
                    triggerForm({
                      text: "Successfully Saved!",
                      icon: "success",
                      confirmButtonText: "OK",
                    });

                    // const userData = await UserService.getOne(
                    //   loggedInUser.uid
                    // );
                    const userData = await instance.post(`/user`);

                    setLoggedInUser({ ...oldLoggedInUser, ...userData.data });
                    setEditable(false);
                    setLoading(false);
                  } catch (error: any) {
                    triggerForm({
                      title: "",
                      text: error.response.data?.message || error.response.data,
                      icon: "error",
                      confirmButtonText: "OK",
                    });
                    setLoading(false);
                  }
                }}
              >
                {({ errors, touched, isValidating }: any) => (
                  <FormikForm className={styles.form}>
                    {/* row 1 — identity */}
                    <div className={styles.formGrid}>
                      <LabeledField
                        label="Full Name"
                        id="userName"
                        name="userName"
                        placeholder="John Doe"
                        validate={validateRequired}
                        errors={errors}
                      />
                    </div>

                    {/* row 2 — company */}
                    <div className={styles.formGrid2}>
                      <LabeledField
                        label="Company Name"
                        id="companyName"
                        name="companyName"
                        placeholder="Acme Inc."
                        validate={validateRequired}
                        errors={errors}
                      />
                      <LabeledField
                        label="Company Website"
                        id="companyWebsite"
                        name="companyWebsite"
                        placeholder="https://acme.com"
                        validate={validURL}
                        errors={errors}
                      />
                    </div>

                    {/* section break */}
                    <p className={styles.formSectionLabel}>
                      <IconMapPin /> Billing Address
                    </p>

                    {/* row 3 — address */}
                    <div className={styles.formGrid2}>
                      <LabeledField
                        label="Street Address"
                        id="streetAddress"
                        name="streetAddress"
                        placeholder="House number and street name"
                        validate={validateRequired}
                        errors={errors}
                      />
                      <LabeledField
                        label="Apt / Suite (optional)"
                        id="streetAddress2"
                        name="streetAddress2"
                        placeholder="Apartment, Suite, Unit…"
                        errors={errors}
                      />
                    </div>

                    {/* row 4 — city/state/zip/country */}
                    <div className={styles.formGrid4}>
                      <Form.Group className={styles.fieldGroup}>
                        <Form.Label
                          className={styles.fieldLabel}
                          htmlFor="country-select"
                        >
                          Country
                        </Form.Label>
                        <Select<CountryOption, false>
                          inputId="country-select"
                          className="custom-select"
                          classNamePrefix="custom-select"
                          options={COUNTRY_LIST}
                          value={country}
                          onChange={changeHandler}
                        />
                      </Form.Group>
                      <LabeledField
                        label="Town / City"
                        id="city"
                        name="city"
                        type="text"
                        validate={validateRequired}
                        errors={errors}
                      />
                      <LabeledField
                        label="State"
                        id="state"
                        name="state"
                        placeholder="New York"
                        validate={validateRequired}
                        errors={errors}
                      />
                      <LabeledField
                        label="Zip Code"
                        id="zip"
                        name="zip"
                        validate={validateRequired}
                        errors={errors}
                      />
                    </div>

                    {/* actions */}
                    <div className={styles.formActions}>
                      <Button
                        size={BUTTON_SIZE_ENUM.LARGE}
                        type="submit"
                        disabled={loading}
                        isLoading={loading}
                      >
                        Save Changes
                      </Button>
                      <Button
                        onClick={pressEditable}
                        variant={BUTTON_VARIANT_ENUM.TERTIARY}
                        size={BUTTON_SIZE_ENUM.LARGE}
                        type="button"
                      >
                        Cancel
                      </Button>
                    </div>
                  </FormikForm>
                )}
              </Formik>
            ) : (
              /* ─── READ-ONLY VIEW ─── */
              <div className={styles.readView}>
                <div className={styles.readGrid}>
                  {loggedInUser?.name && (
                    <div className={styles.readField}>
                      <span className={styles.readLabel}>Full Name</span>
                      <span className={styles.readValue}>
                        {loggedInUser.name}
                      </span>
                    </div>
                  )}
                  <div className={styles.readField}>
                    <span className={styles.readLabel}>Email Address</span>
                    <span className={styles.readValue}>
                      {replaceWithPrefix(loggedInUser?.email || "")}
                    </span>
                  </div>
                  {loggedInUser?.companyName && (
                    <div className={styles.readField}>
                      <span className={styles.readLabel}>Company</span>
                      <span className={styles.readValue}>
                        {loggedInUser.companyName}
                      </span>
                    </div>
                  )}
                  {loggedInUser?.companyWebsite && (
                    <div className={styles.readField}>
                      <span className={styles.readLabel}>Website</span>
                      <span className={styles.readValue}>
                        {loggedInUser.companyWebsite}
                      </span>
                    </div>
                  )}
                </div>

                {loggedInUser && (
                  <div className={styles.addressBlock}>
                    <span className={styles.readLabel}>
                      <IconMapPin /> Billing Address
                    </span>
                    <p className={styles.addressText}>
                      {userDetails?.name} {userDetails?.name && <br />}
                      {userDetails?.streetAddress}{" "}
                      {userDetails?.streetAddress && <br />}
                      {userDetails?.streetAddress2 ? (
                        <>
                          {userDetails?.streetAddress2}
                          {userDetails?.streetAddress2 && <br />}
                        </>
                      ) : (
                        ""
                      )}
                      {userDetails?.city}
                      {userDetails?.state && ","} {userDetails?.state}{" "}
                      {userDetails?.zip} {userDetails?.zip && <br />}
                      {userDetails?.country?.label}
                      <br />
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* ── Action buttons ── */}
          <section className={styles.actionsSection}>
            <button
              className={classNames(styles.actionCard, {
                [styles.actionCardDisabled]: editable,
              })}
              onClick={!editable ? pressEditable : undefined}
              disabled={editable}
            >
              <span className={styles.actionCardIcon}>
                <IconEdit />
              </span>
              <div>
                <span className={styles.actionCardTitle}>Edit Profile</span>
                <span className={styles.actionCardDesc}>
                  Update your name, company &amp; address
                </span>
              </div>
            </button>

            <button
              className={classNames(
                styles.actionCard,
                styles.actionCardSecondary,
              )}
              onClick={pressChange}
              disabled={resetLoading}
            >
              <span
                className={classNames(
                  styles.actionCardIcon,
                  styles.actionCardIconSecondary,
                )}
              >
                <IconKey />
              </span>
              <div>
                <span className={styles.actionCardTitle}>
                  {resetLoading ? "Sending…" : "Change Password"}
                </span>
                <span className={styles.actionCardDesc}>
                  We&apos;ll email you a reset link
                </span>
              </div>
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MyAccountMainView;
