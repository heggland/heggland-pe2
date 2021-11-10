import Heading from "../components/Common/Heading";
import Layout from "../components/Layout/Layout";
import { DESCRIPTION_HOME, TITLE_HOME } from "../constants/meta";
import axios from "axios";
import { BASE_URL, HOTELS_PATH } from "../constants/api";
import Image from "next/image";

import styled from "styled-components";

export const Header = styled.div`
  & > * {
    height: 60vh;
    width: 100%;
  }
`;

const SearchForm = styled.div`
  background-color: rgb(4 14 39);
  color: white;
  height: 150px;
  display: flex;
  align-items: center;
`;

const Featured = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  place-content: center;
`;

const Home = () => {
  return (
    <Layout title={TITLE_HOME} description={DESCRIPTION_HOME}>
      <Header>
        {/*         <img
          src="https://media.radissonhotels.net/image/radisson-blu-caledonien-hotel-kristiansand/lobbyview/16256-116540-f66765457_3xl.jpg?impolicy=HomeHero"
          alt="{props.content[0].image[0].alternativeText}"
        /> */}
      </Header>
      {/*       <SearchForm>
        <Heading size={3}>Where you want to go?</Heading>
      </SearchForm> */}
      <Featured>
        <Heading size={3}>Featured Hotels</Heading>
      </Featured>
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
