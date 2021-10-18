import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
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
        <Link href="/login">
          <a className="link">Login</a>
        </Link>
      </nav>
      <div className="col-10">
        <div className="container">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
