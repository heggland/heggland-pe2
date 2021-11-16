import Layout from "../components/Layout/Layout";
import { DESCRIPTION_CONTACT, TITLE_CONTACT } from "../constants/meta";
import Heading from "../components/Common/Heading";
import ContactForm from "../modules/contactForm/contactForm";
import Col from "../components/Col/Col";
import Row from "../components/Row/Row";
import Container from "../components/Container/Container";

export default function Home() {
  return (
    <Layout title={TITLE_CONTACT} description={DESCRIPTION_CONTACT}>
      <Container>
        <Row justifyContent="center">
          <Col xs={8} md={8}>
            <Row>
              <Heading>Get in Touch</Heading>
            </Row>
            <Row>
              <Col>
                <ContactForm />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
