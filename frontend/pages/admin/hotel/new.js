import { AdminLayout } from "../../../components/Layout/Layout";
import EditHotelForm from "../../../components/Common/EditHotelForm";

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
