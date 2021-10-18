import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Heading from "../../components/Layout/Heading";
import LoginForm from "./loginForm";
import Head from "../../components/Layout/Head";

export default function LoginPage() {
  return (
    <>
      <Head title="Login" description="Course assignment." />
      <Heading>Login</Heading>
      <Container>
        <Row className="justify-content-md-center">
          <Row className="justify-content-md-center my-5">
            <Col md={6}>
              <LoginForm />
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}
