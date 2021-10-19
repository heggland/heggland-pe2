import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Heading from "../../components/Layout/Heading";
import Head from "../../components/Layout/Head";
import ContactForm from "./contactForm";

const Contact = () => {
  return (
    <>
      <Head title="Contact" />
      <Heading>Contact</Heading>
      <Row className="justify-content-md-center my-5">
        <Col md={6}>
          <ContactForm />
        </Col>
      </Row>
    </>
  );
};

export default Contact;
