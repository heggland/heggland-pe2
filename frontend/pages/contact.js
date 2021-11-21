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
      <Header
        imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Los_Angeles_with_Mount_Baldy.jpg/1920px-Los_Angeles_with_Mount_Baldy.jpg"
        imgAlt="https://ia.wikipedia.org/wiki/Los_Angeles#/media/File:Los_Angeles_with_Mount_Baldy.jpg"
      />
      <Container>
        <Row justifyContent="center">
          <Col xs={8} md={8}>
            <Row>
              <Heading>Get in Touch</Heading>
            </Row>
            <Row>
              <Col xs={12}>
                <Row>
                  <Col xs={12} sm={5}>
                    <ContactForm />
                  </Col>
                  <Col xs="none" sm={1} />
                  <Col xs={12} sm={6}>
                    <address>
                      4610 kristiansand
                      <br />
                      Norway
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
