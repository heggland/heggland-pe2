import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Head from "../Common/Head";
import Footer from "../Footer/Footer";

import * as Style from "./Layout.style";
import { Row } from "../../styles/common";

import Col from "../Col/Col";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt as SignOut,
  faBars as MobileMenu,
} from "@fortawesome/free-solid-svg-icons";
import SearchAccommodation from "../Common/SearchAccommodation";

const Layout = ({ title, description, children }) => {
  const [mobileMenu, setMobileMenu] = useState("none");

  const handleClick = () =>
    setMobileMenu((mobileMenu === "none" && "flex") || "none");
  return (
    <>
      <Head title={title} description={description} />

      <Style.Container>
        <Style.Navigation>
          <Col xs={6} md="auto">
            <Style.NavTitle>
              <Link href="/">Holidaze</Link>
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
            <Link href="/accommodation">Accommodation</Link>
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

      <Style.AdminHeading></Style.AdminHeading>

      <Style.AdminContainer>
        <Style.SideContainer>
          <Style.AdminNavHead>
            <Link href="/admin">Admin</Link>
          </Style.AdminNavHead>
          <Style.AdminNav>
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
