import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Head from "../Common/Head";
import Footer from "../Footer/Footer";

import Image from "next/image";
// placeholder logo.
import logo from "../../public/logo.svg";

import * as Style from "./Layout.style";
import Col from "../Col/Col";
import Row from "../Row/Row";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt as SignOut,
  faBars as MobileMenu,
  faMinus as MobileMenuOpen,
} from "@fortawesome/free-solid-svg-icons";

const Layout = ({ title, description, children }) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleClick = () =>
    setMobileMenu((mobileMenu === false && "flex") || false);

  // console.log("TODO CHANGE: ", logo);

  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <Head title={title} description={description} />

      <Style.Container>
        <Row justifyContent="center" padding="0 10px">
          <Col xs={12} md={9}>
            <Style.Navigation>
              <Col xs={6} sm={2} md={2} lg={2.5}>
                <Style.NavTitle>
                  <Style.LinkContainer
                    active={(pathname === "/" && true) || false}
                  >
                    <a href="/">
                      <Image
                        priority="eager"
                        height={100}
                        width={150}
                        alt="logo"
                        src={logo}
                      />
                    </a>
                  </Style.LinkContainer>
                </Style.NavTitle>
              </Col>
              <Col xs={6} sm="none" height="100%">
                <Row justifyContent="right" height="100%">
                  <Style.MobileButton onClick={handleClick}>
                    {(mobileMenu === false && (
                      <FontAwesomeIcon icon={MobileMenu} color="black" />
                    )) || (
                      <FontAwesomeIcon icon={MobileMenuOpen} color="black" />
                    )}
                  </Style.MobileButton>
                </Row>
              </Col>

              <Col xs={12} sm={10} md={8} lg={8} xl={10}>
                <Style.NavPages show={mobileMenu}>
                  <Style.LinkContainer
                    active={
                      (pathname.includes("accommodations") && true) || false
                    }
                  >
                    <Link href="/accommodations">Accommodation</Link>
                  </Style.LinkContainer>
                  <Style.LinkContainer
                    active={(pathname.includes("contact") && true) || false}
                  >
                    <Link href="/contact">Contact</Link>
                  </Style.LinkContainer>
                </Style.NavPages>
              </Col>
            </Style.Navigation>
          </Col>
        </Row>
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
