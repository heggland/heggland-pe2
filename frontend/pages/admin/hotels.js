import axios from "axios";
import Heading from "../../components/Layout/Heading";
import { AdminLayout } from "../../components/Layout/Layout";
import { BASE_URL, HOTELS_PATH } from "../../constants/api";
import { TITLE_ADMIN_HOTELS } from "../../constants/meta";

const Hotels = ({ content }) => {
  return (
    <AdminLayout title={TITLE_ADMIN_HOTELS}>
      <Heading>Manage hotels</Heading>
      <main>
        <a href={`hotel/new`}>
          <button>create new hotel</button>
        </a>
        {content.map(({ id, name, city, address }) => {
          return (
            <div key={id}>
              <p>{name}</p>
              <p>{id}</p>
              <p>{address}</p>
              <p>{city}</p>
              <a href={`hotel/edit/${id}`}>
                <button>edit</button>
              </a>
            </div>
          );
        })}
      </main>
    </AdminLayout>
  );
};

export async function getServerSideProps() {
  let data = [];

  try {
    const response = await axios.get(BASE_URL + HOTELS_PATH);

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
      length: data.length,
    },
  };
}

export default Hotels;
