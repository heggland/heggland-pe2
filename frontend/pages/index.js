import Heading from "../components/Common/Heading";
import Layout from "../components/Layout/Layout";
import { DESCRIPTION_HOME, TITLE_HOME } from "../constants/meta";
import axios from "axios";
import { BASE_URL, HOTELS_PATH } from "../constants/api";
import Image from "next/image";

import * as Style from "../styles/index.style";

const Home = () => {
  return (
    <Layout title={TITLE_HOME} description={DESCRIPTION_HOME}>
      <Style.Heading>
        {/*         <img
          src="https://media.radissonhotels.net/image/radisson-blu-caledonien-hotel-kristiansand/lobbyview/16256-116540-f66765457_3xl.jpg?impolicy=HomeHero"
          alt="{props.content[0].image[0].alternativeText}"
        /> */}
      </Style.Heading>
      {/*       <Style.SearchForm>
        <Heading size={3}>Where you want to go?</Heading>
      </Style.SearchForm> */}
      <Style.Featured>
        <Heading size={3}>Featured Hotels</Heading>
      </Style.Featured>
    </Layout>
  );
};

/* export async function getStaticProps() {
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
*/
export default Home;
