import SearchHotels from "../components/Common/SearchHotels";
import Heading from "../components/Layout/Heading";
import Layout from "../components/Layout/Layout";
import { DESCRIPTION_HOME, TITLE_HOME } from "../constants/meta";
import axios from "axios";
import { BASE_URL, HOTELS_PATH } from "../constants/api";

const Home = (props) => {
  console.log(props.content[0].image[0].url);
  return (
    <Layout title={TITLE_HOME} description={DESCRIPTION_HOME}>
      <img src={BASE_URL + props.content[0].image[0].url} />
      <Heading>Home</Heading>
      <SearchHotels />
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

export default Home;
