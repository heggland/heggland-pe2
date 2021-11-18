import Heading from "../components/Common/Heading";
import Layout from "../components/Layout/Layout";
import { DESCRIPTION_HOME, TITLE_HOME } from "../constants/meta";
import axios from "axios";
import { ACCOMMONDATION_PATH, BASE_URL } from "../constants/api";

import styled from "styled-components";
import Card from "../components/Card/Card";
import Col from "../components/Col/Col";
import Row from "../components/Row/Row";
import Container from "../components/Container/Container";
import Header from "../components/Header/Header";
import Error from "../modules/error/Error";

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

const Index = ({ content, error }) => {
  console.log(content);
  console.log(error);
  return (
    <Layout title={TITLE_HOME} description={DESCRIPTION_HOME}>
      {/* USE HEADER FROM API or locally */}
      <Header
        imgUrl="https://media.radissonhotels.net/image/radisson-blu-caledonien-hotel-kristiansand/lobbyview/16256-116540-f66765457_3xl.jpg?impolicy=HomeHero"
        imgAlt="{props.content[0].image[0].alternativeText}"
      />
      {/*       <SearchForm>
        <Heading size={3}>Where you want to go?</Heading>
      </SearchForm> */}
      <Container>
        <Row justifyContent="center">
          <Col xs={12} md={8}>
            <Row>
              <Heading size={1}>Featured Accommodations</Heading>
            </Row>
            <Row>
              {(content &&
                content.length >= 1 &&
                content.map(({ id, name, image, city }) => {
                  return (
                    <Col md={6} lg={4} xxl={3} key={id}>
                      <a href={`accommodation/${id}`}>
                        <Card name={name} city={city} image={image} key={id} />
                      </a>
                    </Col>
                  );
                })) ||
                (!error && <span>No featured accommodations</span>) || (
                  <Error string={error} path="accomondation" />
                )}
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

export default Index;
