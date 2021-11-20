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
import Error from "../modules/error/error";
import SearchBox from "../modules/searchBox/searchBox";

/*
const Featured = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
`;
*/

const AboveFold = styled.div`
  height: 90vh;
`;

const Index = ({ content, error }) => {
  const featuredContent = content.filter((item) => item.featured === true);

  return (
    <Layout title={TITLE_HOME} description={DESCRIPTION_HOME}>
      <AboveFold>
        {/* USE HEADER FROM API or locally */}

        <Header
          imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Los_Angeles_with_Mount_Baldy.jpg/1920px-Los_Angeles_with_Mount_Baldy.jpg"
          imgAlt="https://ia.wikipedia.org/wiki/Los_Angeles#/media/File:Los_Angeles_with_Mount_Baldy.jpg"
        />
        <Row justifyContent="center">
          <Col xs={11} sm={8}>
            <SearchBox
              accomondations={content && content.length >= 1 && content}
            />
          </Col>
        </Row>
      </AboveFold>
      <Container>
        <Row justifyContent="center">
          <Col xs={12} md={8}>
            <Row>
              <Heading size={1}>Featured Accommodations</Heading>
            </Row>
            <Row>
              {(featuredContent &&
                featuredContent.length >= 1 &&
                featuredContent.map(({ id, name, image, city }) => {
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

export default Index;
