import styles from "./teamMembers.module.scss";
import { Col, Container, Row } from "react-bootstrap";

const TEAM_MEMBERS = [
    {
        name: "Grayson Aldermont",
        role: "Chief Executive Officer",
        description:
            "As the visionary behind Dentist Email List, Grayson leads the company with a mission to revolutionize healthcare marketing by delivering verified, high-quality physician contacts. With years of experience in data-driven marketing and business development, he ensures that Dentist Email List stays ahead with cutting-edge solutions.",
    },
    {
        name: "Grayson Aldermont",
        role: "Chief Executive Officer",
        description:
            "As the visionary behind Dentist Email List, Grayson leads the company with a mission to revolutionize healthcare marketing by delivering verified, high-quality physician contacts. With years of experience in data-driven marketing and business development, he ensures that Dentist Email List stays ahead with cutting-edge solutions.",
    },
    {
        name: "Grayson Aldermont",
        role: "Chief Executive Officer",
        description:
            "As the visionary behind Dentist Email List, Grayson leads the company with a mission to revolutionize healthcare marketing by delivering verified, high-quality physician contacts. With years of experience in data-driven marketing and business development, he ensures that Dentist Email List stays ahead with cutting-edge solutions.",
    },
];

const TeamMembers = () => {
    return (
        <section className={styles.teamMembers}>
            <Container>
                <header className={styles.sectionHeader}>
                    <h2>
                        Meet Our <span className="shifting-accent">Leadership Team</span>
                    </h2>
                    <p>
                        At Dentist Email List, we have a dedicated team of data experts, engineers, and
                        marketing professionals ensuring the highest quality service and 95%+ deliverability.
                    </p>
                </header>

                <Row className={styles.cardRow}>
                    {TEAM_MEMBERS.map((member, index) => (
                        <Col key={`${member.name}-${index}`} lg={4} md={6}>
                            <article className={styles.memberCard}>
                                <div className={styles.avatarWrap}>
                                    <div className={styles.avatarRing}>
                                        <div className={styles.avatarCore}>
                                            <span className={styles.avatarHead}></span>
                                            <span className={styles.avatarBody}></span>
                                        </div>
                                        <span className={styles.statusDot}></span>
                                    </div>
                                </div>

                                <span className={styles.roleTag}>{member.role}</span>
                                <h3>{member.name}</h3>

                                <blockquote className={styles.bio}>{member.description}</blockquote>
                            </article>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default TeamMembers;
