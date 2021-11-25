import Layout from "../components/Layout/Layout";
import { DESCRIPTION_CONTACT, TITLE_CONTACT } from "../constants/meta";
import Heading from "../components/Common/Heading";
import ContactForm from "../modules/contactForm/contactForm";
import Col from "../components/Col/Col";
import Row from "../components/Row/Row";
import Container from "../components/Container/Container";
import Header from "../components/Header/Header";

export default function Home() {
  return (
    <Layout title={TITLE_CONTACT} description={DESCRIPTION_CONTACT}>
      <Header />
      <Container padding="50px 0" backgroundColor="even">
        <Row justifyContent="center">
          <Col xs={8} md={8} backgroundColor="white">
            <Row padding="0 0 0 30px">
              <Heading>Contact us</Heading>
            </Row>
            <Row>
              <Col xs={12}>
                <Row>
                  <Col xs={12} sm={5} padding="30px">
                    <ContactForm />
                  </Col>
                  <Col xs="none" sm={1} />
                  <Col xs={12} sm={6}>
                    <Heading size={4}>Visit address:</Heading>
                    <address>
                      <p>4600 Kristiansand</p>
                      <p>Strandgata 13</p>
                      <p>Norway</p>
                      <p>+00 12 34 56 78 </p>
                    </address>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
