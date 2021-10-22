import axios from "axios";
import Link from "next/link";
import { AdminLayout } from "../../../components/Layout/Layout";
import { BASE_URL, HOTELS_PATH, HOTEL_PATH } from "../../../constants/api";
import { DESCRIPTION_HOTEL } from "../../../constants/meta";

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

  let img;
  if (content.image.length != 0) {
    img = <img src={BASE_URL + content.image[0].url} height="200px" />;
  }

  console.log(content);

  return (
    <AdminLayout
      title={content.name + " | Holidaze"}
      description={DESCRIPTION_HOTEL}
    >
      <main>
        <div>
          <input value={content.name} />
        </div>
        <input value={content.description} />
        <div>
          <input value={content.address} />
        </div>
        <div>
          <input value={content.city} />
        </div>
        <div>
          <input value={content.zip_code} />
        </div>
        <div>
          <input value={content.description} />
        </div>
        <div>
          <input value={content.hotel_facilities} />
        </div>
        <div>{img}</div>
      </main>
    </AdminLayout>
  );
};

export async function getServerSidePaths() {
  try {
    const response = await axios.get(BASE_URL + HOTELS_PATH);

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
    const response = await axios.get(BASE_URL + HOTEL_PATH + params.id);
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
