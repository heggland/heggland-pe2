import Layout from "../components/Layout/Layout";
import { DESCRIPTION_CONTACT, TITLE_CONTACT } from "../constants/meta";
import Heading from "../components/Common/Heading";
import ContactForm from "../modules/contact/contactForm/contactForm";
import * as Style from "./contact.style";
import { Row, Col } from "../styles/common";

export default function Home() {
  return (
    <Layout title={TITLE_CONTACT} description={DESCRIPTION_CONTACT}>
      <Style.Container>
        <Row justifyContent="center">
          <Col md={4}>
            <Heading>Get in Touch</Heading>
            <ContactForm />
          </Col>
        </Row>
      </Style.Container>
    </Layout>
  );
}
