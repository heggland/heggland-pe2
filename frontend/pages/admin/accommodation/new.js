import { AdminLayout } from "../../../components/Layout/Layout";
import EditAccommodationForm from "../../../modules/admin/EditAccommodationForm/EditAccommodationForm";

const New = () => {
  return (
    <AdminLayout title={"Create a new accommodation" + " | Holidaze"}>
      <EditAccommodationForm />
    </AdminLayout>
  );
};

export default New;
