import axios from "axios";
import { useEffect } from "react";
import Heading from "../../components/Layout/Heading";
import { AdminLayout } from "../../components/Layout/Layout";
import { BASE_URL, HOTELS_PATH, HOTEL_STATE_PATH } from "../../constants/api";
import { TITLE_ADMIN_HOTELS } from "../../constants/meta";
import useAxios from "../../hooks/useAxios";

const Hotels = ({ content }) => {
  const http = useAxios();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(
          BASE_URL + HOTELS_PATH + HOTEL_STATE_PATH
        );
        console.log(response);
      } catch (error) {
        setError(error.toString());
      }
    }
    fetchData();
  }, []);

  return (
    <AdminLayout title={TITLE_ADMIN_HOTELS}>
      <Heading>Manage hotels</Heading>
      <main>
        <a href={`hotel/new`}>
          <button>create new hotel</button>
        </a>
        {content.map(({ id, name, city, address, published_at }) => {
          return (
            <div key={id}>
              <p>{name}</p>
              <p>{id}</p>
              <p>{address}</p>
              <p>{city}</p>
              <p>{(published_at && "Published") || "Draft"}</p>
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
    const response = await axios.get(BASE_URL + HOTELS_PATH + HOTEL_STATE_PATH);

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
