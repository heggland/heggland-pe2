import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Head from "./Head";
import Footer from "./Footer";

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

export const AdminLayout = ({ title, description, children }) => {
  const [auth, setAuth] = useContext(AuthContext);

  const router = useRouter();

  if (!auth) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  function logout() {
    setAuth(null);
    router.push("/login");
  }

  return (
    <>
      <>
        <Head title={title} description={description} />
        <div>
          <Link href="/admin">
            <a className="link">Dashboard</a>
          </Link>
          <button onClick={logout}>Logout</button>
        </div>
        {children}
      </>
    </>
  );
};
