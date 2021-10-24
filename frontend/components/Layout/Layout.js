import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Head from "./Head";
import Footer from "./Footer";

import * as Style from "./Layout.style";
import { Col } from "../Common/Styles/Common";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight as Caret,
  faSignOutAlt as SignOut,
} from "@fortawesome/free-solid-svg-icons";
import Heading from "./Heading";

const Layout = ({ title, description, children }) => {
  return (
    <>
      <Head title={title} description={description} />
      <div className="wrapper">
        <nav>
          <Link href="/">
            <a className="link">Holidaze</a>
          </Link>
          <Link href="/hotel">
            <a className="link">Hotel</a>
          </Link>
          <Link href="/contact">
            <a className="link">Contact</a>
          </Link>
        </nav>
        <div>
          <div>{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;

export const AdminLayout = ({
  title,
  description = "no description",
  children,
}) => {
  const [auth, setAuth] = useContext(AuthContext);

  const router = useRouter();

  if (!auth) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
      return <></>;
    }
  }

  function logout() {
    setAuth(null);
    router.push("/login");
  }

  return (
    <>
      <Head title={title} description={description} />

      <Style.AdminHeading />

      <Col size={11}>
        <Style.AdminContainer>
          <Style.SideContainer>
            <Link href="/admin">
              <Style.AdminNavHead>Dashboard</Style.AdminNavHead>
            </Link>
            <Style.AdminNav>
              <Link href="/admin/hotels">
                <Style.AdminLink>Hotels</Style.AdminLink>
              </Link>
              <Link href="/admin/enquiries">
                <Style.AdminLink>Enquiries</Style.AdminLink>
              </Link>
              <Link href="/admin/messages">
                <Style.AdminLink>Messages</Style.AdminLink>
              </Link>
            </Style.AdminNav>
            <Style.Logout>
              <Style.LogoutButton onClick={logout}>
                <FontAwesomeIcon icon={SignOut} />
                &nbsp;&nbsp; Logout
              </Style.LogoutButton>
            </Style.Logout>
          </Style.SideContainer>
          <Style.AdminChildren>{children}</Style.AdminChildren>
        </Style.AdminContainer>
      </Col>
    </>
  );
};
