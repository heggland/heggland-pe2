import { DESCRIPTION_ADMIN, TITLE_ADMIN } from "../constants/meta";
import Heading from "../components/Layout/Heading";
import { AdminLayout } from "../components/Layout/Layout";

export default function Home() {
  return (
    <AdminLayout title={TITLE_ADMIN} description={DESCRIPTION_ADMIN}>
      <Heading>Admin</Heading>
    </AdminLayout>
  );
}
