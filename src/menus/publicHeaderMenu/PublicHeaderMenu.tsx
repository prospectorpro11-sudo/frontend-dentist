import Image from "next/image";
import { BiSolidUser } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
import styles from "./publicHeaderMenu.module.scss";
import { Col, Container, Row } from "react-bootstrap";

const PublicHeaderMenu = () => {
  const headerMenu = [
    { label: "Home", link: "/" },
    { label: "Feature", link: "/" },
    { label: "Pricing", link: "/" },
    { label: "Blog", link: "/" },
  ]
  return (
    <div className={styles.wrapper}>
      <Container>
        <Row className="align-items-center">
          <Col lg={3}>
            <a href="/">
              <Image
                src="/logo.png"
                alt="Dentist Email List"
                width={200}
                height={40}
                priority
                style={{ objectFit: "scale-down" }}
              />
            </a>
          </Col>
          <Col lg={6}>
            <ul className={styles.headerMenu}>
              {headerMenu.map((item, index) => (
                <li key={index}>
                  <a href={item.link}>{item.label}</a>
                </li>
              ))}
            </ul>
          </Col>
          <Col className="d-flex align-items-cneter justify-content-end gap-2">
            <div className={styles.userMenu}>
              <BiSolidUser size={22} />
              <div>Franklin..</div>
              <FaCaretDown size={20} />
            </div>
            <button className={styles.headerButton}>Build Dentist List</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PublicHeaderMenu;