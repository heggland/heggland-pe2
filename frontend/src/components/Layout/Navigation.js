import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import AuthContext from "../../context/AuthContext";

const Navigation = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push("/");
  }

  return (
    <>
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
              <Nav.Link>
                {auth.user_display_name.charAt(0).toUpperCase() +
                  auth.user_display_name.slice(1)}
              </Nav.Link>
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
    </>
  );
};

export default Navigation;
