import { DESCRIPTION_ADMIN, TITLE_ADMIN } from "../constants/meta";

import Heading from "../components/Layout/Heading";
import { AdminLayout } from "../components/Layout/Layout";
import AuthContext from "../context/AuthContext";

import { useContext } from "react";

export default function Home() {
  const [auth] = useContext(AuthContext);
  let name;
  if (typeof window !== "undefined") {
    console.log(auth.username);
    name = auth.username;
  }

  return (
    <AdminLayout title={TITLE_ADMIN} description={DESCRIPTION_ADMIN}>
      <Heading>Admin</Heading>
    </AdminLayout>
  );
}
