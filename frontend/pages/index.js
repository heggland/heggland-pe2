import Heading from "../components/Common/Heading";
import Layout from "../components/Layout/Layout";
import { DESCRIPTION_HOME, TITLE_HOME } from "../constants/meta";
import axios from "axios";
import { ACCOMMONDATION_PATH, BASE_URL } from "../constants/api";
import Image from "next/image";

import styled from "styled-components";
import Card from "../components/Card/Card";
import Col from "../components/Col/Col";
import Row from "../components/Row/Row";
import Container from "../components/Container/Container";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
`;

const Home = (props) => {
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
      <Container>
        <Row justifyContent="center">
          <Col xs={8} md={8}>
            <Row>
              <Heading size={1}>Featured Accommodations</Heading>
            </Row>
            <Row>
              {(props.content.length >= 1 &&
                props.content.map(({ id, name, image, city }) => {
                  return (
                    <Col md={6} lg={4} xxl={3} key={id}>
                      <a href={`accommodation/${id}`}>
                        <Card name={name} city={city} image={image} key={id} />
                      </a>
                    </Col>
                  );
                })) ||
                "no featured accommodations"}
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps() {
  let data = [];

  try {
    const response = await axios.get(BASE_URL + ACCOMMONDATION_PATH);
    data = response.data.filter((item) => item.featured === true);
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
