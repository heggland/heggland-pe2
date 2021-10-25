import Layout from "../components/Layout/Layout";
import { DESCRIPTION_HOTELS, TITLE_HOTELS } from "../constants/meta";
import Heading from "../components/Layout/Heading";
import axios from "axios";
import { BASE_URL, HOTELS_PATH } from "../constants/api";

const Hotel = (props) => {
  return (
    <Layout title={TITLE_HOTELS} description={DESCRIPTION_HOTELS}>
      <Heading>Hotels</Heading>
      <main>
        {props.content.map(({ id, name, image, city, description }) => {
          let img;
          if (image[0]) {
            img = (
              <a href={`hotel/${id}`}>
                <img src={BASE_URL + image[0].url} height="200px" />
              </a>
            );
          }

          return (
            <div key={id}>
              <a href={`hotel/${id}`}>
                <Heading size="4">{name}</Heading>
              </a>
              {img}
              <p>{city}</p>
              <small>{description}</small>
            </div>
          );
        })}
      </main>
    </Layout>
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

export default Hotel;
