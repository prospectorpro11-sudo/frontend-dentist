'use client';
import Swal from "sweetalert2";
import Reaptcha from "reaptcha";
import { useState } from "react";
import classNames from "classnames";
import instance from "@/services/baseServices";
import Button from "@/components/button/Button";
import { BUTTON_SIZE_ENUM } from "@/shared/enums";
import { Col, Container, Row, Form } from "react-bootstrap";
import { Field, Form as FormikForm, Formik, type FormikHelpers } from "formik";
import { validateEmail, validateRequired, validURL } from "@/shared/InternalService";
import styles from "./contactUsMainView.module.scss";

const pageContent = {
  badge: "Get In Touch",
  titleMain: "Let's Start a",
  titleAccent: "Conversation",
  subtitle:
    "Have questions about our verified dentist database? Need a custom lead list? We're here to help you succeed.",
  form: {
    title: "Send Us a Message",
    subtitle: "Fill out the form below and we'll get back to you within 24 hours.",
    secureNote: "Your information is secure and encrypted",
  },
  welcome: {
    title: "We're Here to Help!",
    text: "Our team of data experts is ready to assist you with finding the perfect dentist leads for your campaign. Whether you need a custom list or have questions about our Prospector tool, we've got you covered.",
    features: [
      "Custom lead lists by specialty",
      "One-time purchases, no subscriptions",
      "GDPR & HIPAA compliant data",
      "95%+ verified deliverability",
    ],
  },
  methodsTitle: "Other Ways to Reach Us",
  methods: [
    {
      name: "Call Us Directly",
      icon: "bi bi-telephone-fill",
      variantClass: styles.blue,
      content: (
        <>
          <a href="tel:+18001234567">+1 (800) 123-4567</a>
          <br />
          Mon-Fri, 9AM-6PM EST
        </>
      ),
    },
    {
      name: "Live Chat Support",
      icon: "bi bi-chat-dots-fill",
      variantClass: styles.teal,
      content: (
        <>
          Instant responses
          <br />
          Available 24/7
        </>
      ),
    },
    {
      name: "Visit Our Office",
      icon: "bi bi-geo-alt-fill",
      variantClass: styles.purple,
      content: (
        <>
          123 Healthcare Blvd
          <br />
          San Francisco, CA 94102
        </>
      ),
    },
  ],
  faqTitle: "Quick Answers",
  faqs: [
    {
      question: "How do I get a custom lead list?",
      answer:
        "Use our Prospector tool to filter by specialty, location, and more. Or contact us for a tailored solution.",
    },
    {
      question: "Is the data GDPR compliant?",
      answer:
        "Yes, all our contacts are verified and fully compliant with GDPR, HIPAA, and CCPA regulations.",
    },
    {
      question: "What's your refund policy?",
      answer:
        "We offer free replacements if deliverability falls below 95%. Your satisfaction is guaranteed.",
    },
  ],
};

interface ContactFormValues {
  subject: string;
  name: string;
  email: string;
  companyName: string;
  message: string;
  companyWebsite: string;
  phoneNumber: string;
}


const ContactUsMainView = () => {
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (
    values: ContactFormValues,
    { resetForm }: FormikHelpers<ContactFormValues>,
  ) => {
    try {
      setLoading(true);

      if (!captchaValue) {
        await Swal.fire({
          text: "Captcha field is empty",
          icon: "error",
          confirmButtonText: "OK",
        });
        setLoading(false);
        return;
      }

      await instance.post("/update-contact-us", values);

      await Swal.fire({
        title: "",
        text: "Successfully Sent the Message",
        icon: "success",
        confirmButtonText: "OK",
      });

      resetForm();
      setCaptchaValue(null);
      setLoading(false);
    } catch {
      await Swal.fire({
        title: "",
        text: "Oops! Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
      setLoading(false);
    }
  };

  return (
    <section className={classNames("mt-5", styles.contactSection)}>
      <div className={styles.bgGradient} />
      <div className={styles.gridPattern} />
      <div className={styles.orb} />
      <div className={styles.orb} />
      <div className={styles.orb} />

      <div className={styles.floatingIcons}>
        <div className={styles.floatingIcon}>
          <i className="bi bi-tooth" />
        </div>
        <div className={styles.floatingIcon}>
          <i className="bi bi-person-badge" />
        </div>
        <div className={styles.floatingIcon}>
          <i className="bi bi-stethoscope" />
        </div>
        <div className={styles.floatingIcon}>
          <i className="bi bi-database" />
        </div>
      </div>

      <Container>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            {pageContent.titleMain} <span className="shifting-accent">{pageContent.titleAccent}</span>
          </h1>

          <p className={styles.pageSubtitle}>{pageContent.subtitle}</p>
        </div>

        <Row>
          <Col>
            <div className={styles.formSection}>
              <div className={styles.formHeader}>
                <div className={styles.formHeaderIcon}>
                  <i className="bi bi-send" />
                </div>
                <div>
                  <h2 className={styles.formTitle}>{pageContent.form.title}</h2>
                  <p className={styles.formSubtitle}>{pageContent.form.subtitle}</p>
                </div>
              </div>

              <Formik<ContactFormValues>
                validateOnMount={false}
                validateOnChange
                validateOnBlur
                initialValues={{
                  subject: "",
                  name: "",
                  email: "",
                  companyName: "",
                  message: "",
                  companyWebsite: "",
                  phoneNumber: "",
                }}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values }) => (
                  <FormikForm className={styles.formGrid} id="contactForm">
                    <div className={styles.formGroup}>
                      <Form.Label className={styles.formLabel} htmlFor="name">
                        <i className="bi bi-person" />
                        Full Name <span className={styles.required}>*</span>
                      </Form.Label>
                      <Field
                        as="input"
                        type="text"
                        id="name"
                        name="name"
                        className={styles.formInput}
                        placeholder="John Doe"
                        validate={validateRequired}
                      />
                      {errors.name && touched.name && <span className={styles.errorText}>{errors.name}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <Form.Label className={styles.formLabel} htmlFor="email">
                        <i className="bi bi-envelope" />
                        Email Address <span className={styles.required}>*</span>
                      </Form.Label>
                      <Field
                        as="input"
                        id="email"
                        name="email"
                        placeholder="jane@acme.com"
                        type="email"
                        className={styles.formInput}
                        validate={validateEmail}
                      />
                      {errors.email && touched.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <Form.Label className={styles.formLabel} htmlFor="subject">
                        <i className="bi bi-tag" />
                        Subject <span className={styles.required}>*</span>
                      </Form.Label>
                      <Field
                        as="input"
                        type="text"
                        id="subject"
                        name="subject"
                        className={styles.formInput}
                        placeholder="How can we help?"
                        validate={validateRequired}
                      />
                      {errors.subject && touched.subject && (
                        <span className={styles.errorText}>{errors.subject}</span>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <Form.Label className={styles.formLabel} htmlFor="companyName">
                        <i className="bi bi-building" />
                        Company Name
                      </Form.Label>
                      <Field
                        as="input"
                        type="text"
                        id="companyName"
                        name="companyName"
                        className={styles.formInput}
                        placeholder="Your Company"
                        validate={validateRequired}
                      />
                      {errors.companyName && touched.companyName && (
                        <span className={styles.errorText}>{errors.companyName}</span>
                      )}
                    </div>

                    <div className={classNames(styles.formGroup, styles.fullWidth)}>
                      <Form.Label className={styles.formLabel} htmlFor="companyWebsite">
                        <i className="bi bi-globe" />
                        Company Website
                      </Form.Label>
                      <Field
                        as="input"
                        type="url"
                        id="companyWebsite"
                        name="companyWebsite"
                        className={styles.formInput}
                        placeholder="https://example.com"
                        validate={validURL}
                      />
                      {errors.companyWebsite && touched.companyWebsite && (
                        <span className={styles.errorText}>{errors.companyWebsite}</span>
                      )}
                    </div>

                    {/* <div className={styles.formGroup}>
                      <Form.Label className={styles.formLabel} htmlFor="phoneNumber">
                        <i className="bi bi-telephone" />
                        Phone Number
                      </Form.Label>
                      <Field
                        as="input"
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        className={styles.formInput}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div> */}

                    <div className={classNames(styles.formGroup, styles.fullWidth)}>
                      <Form.Label className={styles.formLabel} htmlFor="message">
                        <i className="bi bi-chat-left-text" />
                        Message <span className={styles.required}>*</span>
                      </Form.Label>
                      <Field
                        as="textarea"
                        id="message"
                        name="message"
                        className={styles.formTextarea}
                        placeholder="Tell us about your project or requirements..."
                        validate={validateRequired}
                      />
                      {errors.message && touched.message && (
                        <span className={styles.errorText}>{errors.message}</span>
                      )}
                    </div>

                    {values.name &&
                      values.companyName &&
                      values.companyWebsite &&
                      values.email &&
                      values.message &&
                      values.subject && (
                        <div className={classNames(styles.formGroup, styles.fullWidth)}>
                          <div className={styles.captchaWrap}>
                            <Reaptcha
                              sitekey={process.env.NEXT_PUBLIC_CAPTCHA_API_KEY as string}
                              onVerify={handleCaptchaChange}
                            />
                          </div>
                        </div>
                      )}

                    <div className={classNames(styles.formGroup, styles.fullWidth)}>
                      <div className={styles.formFooter}>
                        <Button type="submit" size={BUTTON_SIZE_ENUM.LARGE}>
                          {loading ? "Sending..." : "Send Message"}
                          <i className="bi bi-send" />
                        </Button>
                        <span className={styles.formNote}>
                          <i className="bi bi-shield-check" />
                          {pageContent.form.secureNote}
                        </span>
                      </div>
                    </div>
                  </FormikForm>
                )}
              </Formik>
            </div>
          </Col>
          <Col>
            <div className={styles.contactSidebar}>
              <div className={styles.welcomeCard}>
                <div className={styles.welcomeContent}>
                  <div className={styles.welcomeIcon}>
                    <i className="bi bi-heart" />
                  </div>

                  <h3 className={styles.welcomeTitle}>{pageContent.welcome.title}</h3>
                  <p className={styles.welcomeText}>{pageContent.welcome.text}</p>

                  <div className={styles.welcomeFeatures}>
                    {pageContent.welcome.features.map((feature) => (
                      <div key={feature} className={styles.welcomeFeature}>
                        <i className="bi bi-check-lg" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.contactMethods}>
                <h3 className={styles.methodsTitle}>
                  <i className="bi bi-people" />
                  {pageContent.methodsTitle}
                </h3>

                {pageContent.methods.map((method) => (
                  <div key={method.name} className={styles.methodItem}>
                    <div className={classNames(styles.methodIcon, method.variantClass)}>
                      <i className={method.icon} />
                    </div>

                    <div className={styles.methodInfo}>
                      <div className={styles.methodName}>{method.name}</div>
                      <div className={styles.methodDetail}>{method.content}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.faqTeaser}>
                <h3 className={styles.faqTitle}>
                  <i className="bi bi-question-circle" />
                  {pageContent.faqTitle}
                </h3>

                {pageContent.faqs.map((faq) => (
                  <div key={faq.question} className={styles.faqItem}>
                    <div className={styles.faqQuestion}>{faq.question}</div>
                    <div className={styles.faqAnswer}>{faq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUsMainView;
