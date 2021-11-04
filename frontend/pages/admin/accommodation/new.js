import { AdminLayout } from "../../../components/Layout/Layout";
import EditHotelForm from "../../../modules/admin/accommodation/EditAccommodationForm";

const New = () => {
  return (
    <AdminLayout title={"Create a new accommodation" + " | Holidaze"}>
      <EditHotelForm />
    </AdminLayout>
  );
};

export default New;
