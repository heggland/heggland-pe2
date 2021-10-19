import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Head from "./Head";

const Layout = ({ title, description, children }) => {
  return (
    <>
      <Head title={title} description={description} />
      <div className="wrapper">
        <nav>
          <Link href="/">
            <a className="link">Holidaze</a>
          </Link>
          <Link href="/hotels">
            <a className="link">Hotels</a>
          </Link>
          <Link href="/contact">
            <a className="link">Contact</a>
          </Link>
        </nav>
        <div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;

export const AdminLayout = ({ title, description, children }) => {
  const [, setAuth] = useContext(AuthContext);

  const router = useRouter();

  function logout() {
    setAuth(null);
    router.push("/");
  }

  return (
    <>
      <Head title={title} description={description} />
      <nav>
        <Link href="/">
          <a className="link">Holidaze</a>
        </Link>
        <Link href="/admin">
          <a className="link">Dashboard</a>
        </Link>
        <button onClick={logout}>Logout</button>
      </nav>
    </>
  );
};
