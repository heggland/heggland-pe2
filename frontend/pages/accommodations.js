import Layout from "../components/Layout/Layout";
import {
  TITLE_ACCOMMONDATION,
  DESCRIPTION_ACCOMMONDATION,
} from "../constants/meta";
import Heading from "../components/Common/Heading";
import axios from "axios";
import { BASE_URL, ACCOMMONDATION_PATH } from "../constants/api";

import Error from "../modules/error/error";

import Card from "../components/Card/Card";
import Col from "../components/Col/Col";
import Row from "../components/Row/Row";
import Container from "../components/Container/Container";
import Header from "../components/Header/Header";
import SearchBox from "../modules/searchBox/searchBox";

const Accommodation = ({ content, error }) => {
  // sort content by name
  content = content.sort((a, b) => {
    return (a.name < b.name && -1) || (a.name > b.name && 1) || 0;
  });

  return (
    <Layout
      title={TITLE_ACCOMMONDATION}
      description={DESCRIPTION_ACCOMMONDATION}
    >
      <Header />
      <Container padding="0 0 50px 0">
        <Row justifyContent="center">
          <Col xs={11} md={8}>
            <Row>
              <Heading>Our Accommodations</Heading>
            </Row>
            <Row>
              {(content &&
                content.length >= 1 &&
                content.map(({ id, name, image, city }) => {
                  return (
                    <Col xs={12} md={6} lg={4} xxl={3} key={id}>
                      <a href={`accommodation/${id}`}>
                        <Card name={name} city={city} image={image} key={id} />
                      </a>
                    </Col>
                  );
                })) ||
                (!error && <span>No accommodations</span>) || (
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

export default Accommodation;
