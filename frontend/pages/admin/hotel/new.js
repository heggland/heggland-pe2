import { AdminLayout } from "../../../components/Layout/Layout";
import EditHotelForm from "../../../modules/admin/hotel/EditHotelForm";

const New = () => {
  return (
    <AdminLayout title={"Create new hotel" + " | Holidaze"}>
      <EditHotelForm />
    </AdminLayout>
  );
};

export default New;
