import axios from "axios";
import Link from "next/link";
import EditAccommodationForm from "../../../../modules/admin/EditAccommodationForm/EditAccommodationForm";
import { AdminLayout } from "../../../../components/Layout/Layout";
import {
  BASE_URL,
  ACCOMMONDATION_PATH,
  ACCOMMONDATION_STATE_PATH,
} from "../../../../constants/api";
import { DESCRIPTION_HOTEL } from "../../../../constants/meta";

const Hotel = ({ content, error }) => {
  if (error) {
    return (
      <>
        <Link href="/admin/edit">
          <a className="link">Go back</a>
        </Link>
        {error}
      </>
    );
  }

  return (
    <AdminLayout
      title={content.name + " | Holidaze"}
      description={DESCRIPTION_HOTEL}
    >
      <EditAccommodationForm
        id={content.id}
        name={content.name}
        description={content.description}
        address={content.address}
        city={content.city}
        zip_code={content.zip_code}
        accommodation_facilities={content.accommodation_facilities}
        image={content.image}
        state={content.published_at}
        updated_at={content.updated_at}
        featured={content.featured}
      />
    </AdminLayout>
  );
};

export async function getServerSidePaths() {
  try {
    const response = await axios.get(BASE_URL + HOTELS_PATH + HOTEL_STATE_PATH);

    const paths = response.data.map((data) => ({
      params: { id: data.id },
    }));

    return { paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getServerSideProps({ params }) {
  let data = [];

  try {
    const response = await axios.get(
      BASE_URL + ACCOMMONDATION_PATH + params.id + ACCOMMONDATION_STATE_PATH
    );
    data = response.data;
  } catch (error) {
    return {
      props: {
        error: error.toString(),
      },
    };
  }

  return {
    props: {
      content: data,
    },
  };
}

export default Hotel;
