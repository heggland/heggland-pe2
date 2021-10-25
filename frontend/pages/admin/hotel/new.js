import { AdminLayout } from "../../../components/Layout/Layout";
import EditHotelForm from "../../../modules/admin/hotel/EditHotelForm";

const New = () => {
  return (
    <AdminLayout title={"Create new hotel" + " | Holidaze"}>
      <main>
        <EditHotelForm />
      </main>
    </AdminLayout>
  );
};

export default New;
