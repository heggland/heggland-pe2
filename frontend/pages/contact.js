import Layout from "../components/Layout/Layout";
import { DESCRIPTION_CONTACT, TITLE_CONTACT } from "../constants/meta";
import Heading from "../components/Common/Heading";
import ContactForm from "../modules/contact/contactForm/contactForm";
import Col from "../components/Col/Col";
import Row from "../components/Row/Row";
import Container from "../components/Container/Container";

export default function Home() {
  return (
    <Layout title={TITLE_CONTACT} description={DESCRIPTION_CONTACT}>
      <Container>
        <Row justifyContent="center">
          <Col md={4}>
            <Heading>Get in Touch</Heading>
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
