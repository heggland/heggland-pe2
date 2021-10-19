import { useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push("/");
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Holidaze</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="float-right"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto fixed">
            <LinkContainer to="/hotels">
              <Nav.Link>Hotels</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
            {(auth && (
              <>
                <LinkContainer to="/admin">
                  <Nav.Link>Admin</Nav.Link>
                </LinkContainer>
                <LinkContainer to="#">
                  <Nav.Link onClick={logout}>Log out</Nav.Link>
                </LinkContainer>
              </>
            )) || (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
