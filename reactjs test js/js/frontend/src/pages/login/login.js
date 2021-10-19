import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Heading from "../../components/Layout/Heading";
import Head from "../../components/Layout/Head";
import LoginForm from "./loginForm";

const Login = () => {
  return (
    <>
      <Head title="Login" />
      <Heading>Login</Heading>
      <Row className="justify-content-md-center my-5">
        <Col md={6}>
          <LoginForm />
        </Col>
      </Row>
    </>
  );
};

export default Login;
