import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useHistory } from "react-router";
import { useContext } from "react";

import Heading from "../../components/Layout/Heading";
import Head from "../../components/Layout/Head";
import GetPanelContent from "./GetPanelContent";
import Editbutton from "./tools/EditButtons";
import AuthContext from "../../context/AuthContext";

export default function AdminPage() {
  const [auth] = useContext(AuthContext);

  const history = useHistory();

  if (!auth) {
    history.push("/");
  }

  return (
    <>
      <Head title="Admin" />
      <Heading>Admin</Heading>
      <p>Logged in as: {auth.username}</p>
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Container className="mt-5">
              <Row className="justify-content-center">
                <Editbutton type="new">New Post</Editbutton>
              </Row>
            </Container>
            <Container className="mt-5">
              <Row className="border-bottom">
                <Col xs={5} md={3}>
                  <p className="font-weight-bold">Title</p>
                </Col>
                <Col md={2} className="d-none d-md-block">
                  <p className="font-weight-bold">Author</p>
                </Col>
                <Col md={2} className="d-none d-md-block">
                  <p className="font-weight-bold">Date</p>
                </Col>
                <Col xs={2} md={2}>
                  <Row className="justify-content-center">
                    <p className="font-weight-bold">Status</p>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <Row className="justify-content-center">
                        <p className="font-weight-bold">Edit</p>
                      </Row>
                    </Col>
                    <Col>
                      <Row className="justify-content-center">
                        <p className="font-weight-bold">Delete</p>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
            <Container>
              <GetPanelContent />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
