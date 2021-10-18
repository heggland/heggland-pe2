import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Heading from "../../components/Layout/Heading";

export default function AdminPage() {
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Heading>Hi&nbsp;</Heading>
        </Row>
        <Row className="justify-content-md-center">
          <p>this is the admin page</p>
        </Row>
      </Container>
    </>
  );
}
