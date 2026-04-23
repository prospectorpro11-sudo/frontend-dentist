"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Select, { SingleValue } from "react-select";
import classNames from "classnames";
import Form from "react-bootstrap/Form";
import { Formik, Field, Form as FormikForm } from "formik";
import {
  FaCamera,
  FaEnvelope,
  FaUser,
  FaBuilding,
  FaLock,
  FaPaperPlane,
  FaKey,
  FaInfoCircle,
  FaChevronDown,
  FaUsers,
  FaIndustry,
  FaGlobe,
  FaCheck,
  FaTimes,
  FaUserCircle,
  FaCheckCircle,
} from 'react-icons/fa';
import instance from "../../services/baseServices";
import styles from "./myAccountMainView.module.scss";
import { COUNTRY_LIST } from "@/seeds/countryList";
import { resetPassword } from "@/database/Authentication";
import { useRootContext } from "@/contexts/RootContext";
import {
  replaceWithPrefix,
  triggerForm,
  validateRequired,
  validURL,
} from "@/shared/InternalService";
import Button from "@/components/button/Button";
import { BUTTON_SIZE_ENUM, BUTTON_VARIANT_ENUM } from "@/shared/enums";
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
    if (loggedInUser?.email) {
      resetPassword(loggedInUser.email, setResetLoading);
    }
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

  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <FaUser /> },
    { id: 'security', label: 'Security', icon: <FaLock /> },
  ];

  // Company State
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [companyForm, setCompanyForm] = useState({
    name: 'PowerScrews Inc.',
    website: 'https://powerscrews.com',
    industry: 'tech',
    size: 'small',
    description: 'Leading provider of industrial fastening solutions and specialized hardware.',
  });

  // Handlers
  const handleCompanyChange = (field: string, value: string) => {
    setCompanyForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCompanySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditingCompany(false);
    console.log('Saving company info:', companyForm);
  };

  return (
    <div className={styles.page}>
      {/* ── Page header ── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.pageIcon}>
            <FaUserCircle />
          </div>
          <div className={styles.pageInfo}>
            <h2>My Account</h2>
            <p className={styles.pageSubtitle}>Manage your profile, company details, and security settings</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={classNames(styles.statsMini, styles.activeBadge)}>
            <div className={styles.statIconSmall}><FaCheckCircle /></div>
            <div className={styles.statLabel}>Active</div>
          </div>
        </div>
      </div>
      <div className={styles.accountMainCard}>
        <div className={styles.profileOverview}>
          <div className={styles.profileLeft}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatarCircle}>
                  <img src="https://ui-avatars.com/api/?name=Franklin+Carter&background=0ea5e9&color=fff&size=128&bold=true" alt="Avatar" />
                </div>
                <button className={styles.avatarChangeBtn} title="Change photo">
                  <FaCamera />
                </button>
              </div>
            </div>
            <div className={styles.profileDetails}>
              <div className={styles.profileNameRow}>
                <h3>{loggedInUser?.displayName}</h3>
                <span className={styles.verifiedBadge}>
                  <FaCheckCircle />
                  Verified
                </span>
              </div>
              <p className={styles.profileEmailDisplay}>
                <FaEnvelope />
                {loggedInUser?.email}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.tabNavigation}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={classNames(styles.tabBtn, {
                [styles.active]: activeTab === tab.id,
              })}
              data-tab={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        <div className={styles.tabContentWrapper}>

          {/* ========== PERSONAL INFO TAB ========== */}
          <div className={classNames(styles.tabContent, {
            [styles.active]: activeTab === 'personal'
          })} id="personalTab">
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
                onSubmit={async (values) => {
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
                {({ errors }: any) => (
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
            <br />
            {!editable && (
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
            )}
          </div>

          {/* ========== COMPANY DETAILS TAB ========== */}
          <div className={classNames(styles.tabContent, {
            [styles.active]: activeTab === 'company'
          })} id="companyTab">
            {/* Edit Form */}
            <div className={classNames(styles.companyEdit, {
              [styles.active]: isEditingCompany
            })} id="companyEdit" style={{ display: isEditingCompany ? 'block' : 'none' }}>
              <form id="companyForm" onSubmit={handleCompanySubmit}>
                <div className={styles.formSection}>
                  <div className={styles.sectionHeader}>
                    <div className={styles.sectionIcon}>
                      <FaBuilding />
                    </div>
                    <div>
                      <h4>Edit Company Information</h4>
                      <p>Update your business organization details</p>
                    </div>
                  </div>
                  <div className={styles.formGrid}>
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>
                        <FaBuilding />
                        Company Name
                      </label>
                      <input
                        type="text"
                        className={styles.fieldInput}
                        value={companyForm.name}
                        placeholder="Company Name"
                        onChange={(e) => handleCompanyChange('name', e.target.value)}
                      />
                    </div>
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>
                        <FaGlobe />
                        Company Website
                      </label>
                      <input
                        type="url"
                        className={styles.fieldInput}
                        value={companyForm.website}
                        placeholder="https://company.com"
                        onChange={(e) => handleCompanyChange('website', e.target.value)}
                      />
                    </div>
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>
                        <FaIndustry />
                        Industry
                      </label>
                      <div className={styles.selectWrapper}>
                        <select
                          className={classNames(styles.fieldInput, styles.fieldSelect)}
                          value={companyForm.industry}
                          onChange={(e) => handleCompanyChange('industry', e.target.value)}
                        >
                          <option value="" disabled>Select industry</option>
                          <option value="tech">Technology</option>
                          <option value="marketing">Marketing</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="finance">Finance</option>
                        </select>
                        <FaChevronDown className={styles.selectArrow} />
                      </div>
                    </div>
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>
                        <FaUsers />
                        Company Size
                      </label>
                      <div className={styles.selectWrapper}>
                        <select
                          className={classNames(styles.fieldInput, styles.fieldSelect)}
                          value={companyForm.size}
                          onChange={(e) => handleCompanyChange('size', e.target.value)}
                        >
                          <option value="" disabled>Select size</option>
                          <option value="small">1-50 employees</option>
                          <option value="medium">51-200 employees</option>
                          <option value="large">201-500 employees</option>
                          <option value="enterprise">500+ employees</option>
                        </select>
                        <FaChevronDown className={styles.selectArrow} />
                      </div>
                    </div>
                    <div className={classNames(styles.formField, styles.fullWidth)}>
                      <label className={styles.fieldLabel}>
                        <FaInfoCircle />
                        Company Description
                      </label>
                      <textarea
                        className={classNames(styles.fieldInput, styles.fieldTextarea)}
                        placeholder="Brief description of your company..."
                        value={companyForm.description}
                        onChange={(e) => handleCompanyChange('description', e.target.value)}
                      />
                      <span className={styles.fieldNote}>Optional - helps us serve you better</span>
                    </div>
                  </div>
                </div>

                <div className={styles.formFooter}>
                  <button
                    type="button"
                    className={styles.btnOutline}
                    id="cancelEditBtn"
                    onClick={() => setIsEditingCompany(false)}
                  >
                    <FaTimes />
                    <span>Cancel</span>
                  </button>
                  <button type="submit" className={styles.btnFilled}>
                    <FaCheck />
                    <span>Save Company Info</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ========== SECURITY TAB ========== */}
          <div className={classNames(styles.tabContent, {
            [styles.active]: activeTab === 'security'
          })} id="securityTab">
            <div className={styles.securityOverview}>
              {/* Password Reset Card */}
              <div className={styles.securityCard}>
                <div className={styles.securityCardIcon}>
                  <FaKey />
                </div>
                <div className={styles.securityCardContent}>
                  <h4>Change Password</h4>
                  <p>We&apos;ll send a secure password reset link to your email inbox</p>
                </div>
                <button
                  onClick={pressChange}
                  disabled={resetLoading}
                  className={styles.securityActionBtn}
                  id="sendResetLinkBtn"
                  type="button"
                >
                  <FaPaperPlane />
                  {resetLoading ? "Sending…" : "Send Reset Link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountMainView;
