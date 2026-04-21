
import classNames from "classnames";
import { Col, Container, Row } from "react-bootstrap";

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

const ContactUsMainView = () => {
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

              <form className={styles.formGrid} id="contactForm">
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <i className="bi bi-person" />
                    Full Name <span className={styles.required}>*</span>
                  </label>
                  <input type="text" className={styles.formInput} placeholder="John Doe" required />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <i className="bi bi-envelope" />
                    Email Address <span className={styles.required}>*</span>
                  </label>
                  <input type="email" className={styles.formInput} placeholder="jane@acme.com" required />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <i className="bi bi-tag" />
                    Subject <span className={styles.required}>*</span>
                  </label>
                  <input type="text" className={styles.formInput} placeholder="How can we help?" required />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <i className="bi bi-building" />
                    Company Name
                  </label>
                  <input type="text" className={styles.formInput} placeholder="Your Company" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <i className="bi bi-globe" />
                    Company Website
                  </label>
                  <input type="url" className={styles.formInput} placeholder="https://example.com" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <i className="bi bi-telephone" />
                    Phone Number
                  </label>
                  <input type="tel" className={styles.formInput} placeholder="+1 (555) 000-0000" />
                </div>

                <div className={classNames(styles.formGroup, styles.fullWidth)}>
                  <label className={styles.formLabel}>
                    <i className="bi bi-chat-left-text" />
                    Message <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    className={styles.formTextarea}
                    placeholder="Tell us about your project or requirements..."
                    required
                  />
                </div>

                <div className={classNames(styles.formGroup, styles.fullWidth)}>
                  <div className={styles.submitWrapper}>
                    <button type="submit" className={styles.submitBtn}>
                      Send Message
                      <i className="bi bi-send" />
                    </button>
                    <span className={styles.formNote}>
                      <i className="bi bi-shield-check" />
                      {pageContent.form.secureNote}
                    </span>
                  </div>
                </div>
              </form>
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
