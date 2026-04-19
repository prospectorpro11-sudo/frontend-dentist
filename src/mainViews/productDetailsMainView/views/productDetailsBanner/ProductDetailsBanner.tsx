import { Col, Container, Row } from "react-bootstrap";
import styles from "./productDetailsBanner.module.scss";
import Stats from "@/components/stats/Stats";
import Image from "next/image";

const stats = [
    { icon: 'people', value: '930,285', label: 'Total Contacts', iconClass: 'spIc1', highlight: true },
    { icon: 'email', value: '930,285', label: 'Emails', iconClass: 'spIc2' },
    { icon: 'phone', value: '930,285', label: 'Phones', iconClass: 'spIc3' },
    { icon: 'fax', value: '930,285', label: 'Faxes', iconClass: 'spIc4' },
    { icon: 'license', value: '930,285', label: 'Licenses', iconClass: 'spIc5', last: true },
]

const ProductDetailsBanner = () => {
    return (
        <section className="banner">
            <div className="surface"></div>
            <Container>
                <Row>
                    <Col xs={12} lg={5}></Col>
                    <Col xs={12} lg={3}>
                        <Stats stats={stats} isProductDetails={true} />
                    </Col>
                    <Col xs={12} lg={4}>
                        <Image width={400} height={375} style={{ objectFit: "scale-down" }} src="/product-hero-image.png" alt="Product Hero Image" />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProductDetailsBanner;