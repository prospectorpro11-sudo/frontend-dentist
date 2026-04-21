import { Col, Container } from "react-bootstrap";
import styles from "../aboutMainView.module.scss";

const AboutBanner = () => {
    return (
        <section className="banner">
            <div className="surface" />
            <Container>
                <Col xs={12} lg={8} className="mx-auto">
                    <h1 className={styles.bannerTitle}>We Build <span className="shifting-accent">Precision Dental Data</span> <br />for Modern Marketers</h1>
                    <p className={styles.bannerDescription}>Since 2020, we&apos;ve been the trusted source for verified dentist contact databases — powering outreach for 5,000+ marketers, agencies, and dental SaaS companies worldwide.</p>
                </Col>
            </Container>
        </section>
    );
};

export default AboutBanner;