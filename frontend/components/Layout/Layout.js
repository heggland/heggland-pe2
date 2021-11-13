import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Head from "../Common/Head";
import Footer from "../Footer/Footer";

import Image from "next/image";
// placeholder logo.
import logo from "../../public/logo.png";

import * as Style from "./Layout.style";
import Col from "../Col/Col";
import Row from "../Row/Row";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt as SignOut,
  faBars as MobileMenu,
} from "@fortawesome/free-solid-svg-icons";
import SearchAccommodation from "../Search/SearchAccommodation";
import GlobalStyle from "../Global/Global";

const Layout = ({ title, description, children }) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleClick = () =>
    setMobileMenu((mobileMenu === false && "flex") || false);

  console.log("TODO CHANGE: ", logo);
  return (
    <>
      <Head title={title} description={description} />

      <Style.Container>
        <Style.Navigation>
          <Col xs={6} sm="auto">
            <Style.NavTitle>
              <a href="/">
                <Image height="100" width="120" src={logo} />
              </a>
            </Style.NavTitle>
          </Col>
          <Col xs={6}>
            <Row justifyContent="right">
              <Style.SearchButton>
                <SearchAccommodation type="nav" />
              </Style.SearchButton>
              <Style.MobileButton onClick={handleClick}>
                <FontAwesomeIcon icon={MobileMenu} transform="grow-4" />
              </Style.MobileButton>
            </Row>
          </Col>
          <Style.NavPages show={mobileMenu}>
            <Link href="/accommodations">Accommodation</Link>
            <Link href="/contact">Contact</Link>
          </Style.NavPages>
        </Style.Navigation>
        <Style.Children>{children}</Style.Children>
      </Style.Container>
      <Footer />
    </>
  );
};

export default Layout;

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const AdminLayout = ({
  title,
  description = "no description",
  children,
}) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleClick = () => {
    setMobileMenu((mobileMenu === false && "flex") || false);
  };

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
      {mobileMenu === "flex" && <GlobalStyle hidden={true} />};
      <Style.AdminContainer>
        <Style.AdminMobileButton onClick={handleClick}>
          <FontAwesomeIcon icon={MobileMenu} transform="grow-4" />
        </Style.AdminMobileButton>
        <Style.SideContainer show={mobileMenu}>
          <Style.AdminNavHead>
            <Link href="/admin">Admin</Link>
          </Style.AdminNavHead>
          <Style.AdminNav show={mobileMenu}>
            <Link href="/admin/accommodation">
              <Style.AdminLink>Accommodation</Style.AdminLink>
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
    </>
  );
};

AdminLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
};
