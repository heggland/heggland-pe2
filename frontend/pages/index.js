import Heading from "../components/Common/Heading";
import Layout from "../components/Layout/Layout";
import { DESCRIPTION_HOME, TITLE_HOME } from "../constants/meta";
import axios from "axios";
import { ACCOMMONDATION_PATH, BASE_URL } from "../constants/api";

import Card from "../components/Card/Card";
import Col from "../components/Col/Col";
import Row from "../components/Row/Row";
import Container from "../components/Container/Container";
import Header from "../components/Header/Header";
import Error from "../modules/error/error";
import SearchBox from "../modules/searchBox/searchBox";

import Services from "../modules/services/services";
import About from "../modules/about/about";

const Index = ({ content, error }) => {
  let featured;
  let searchContent = content;
  if (content) {
    // filter out featured accomondations
    featured = content.filter((item) => item.featured === true);
    // sorting accomondations by id
    featured = featured.sort((a, b) => {
      return (a.id > b.id && -1) || (a.id < b.id && 1) || 0;
    });

    // filter out cities to be used in SearchBox.
    let cities = content.map((item) => {
      return item.city;
    });
    // remove duplicate in the array
    cities = [...new Set(cities)];

    const cityObject = [];
    cities.forEach((city) => {
      cityObject.push({
        name: city,
        city: city,
        id: city,
      });
    });

    // cities first then the accomondations
    searchContent = cityObject.concat(searchContent);
  }

  return (
    <Layout title={TITLE_HOME} description={DESCRIPTION_HOME}>
      <Header page="home" />
      <SearchBox
        content={searchContent && searchContent.length >= 1 && searchContent}
        width={7}
      />
      <Container placeContent="center" backgroundColor="odd" padding="100px 0">
        <About />
      </Container>
      <Container placeContent="center" backgroundColor="even" padding="100px 0">
        <Row justifyContent="center">
          <Col xs={11} sm={12} md={8}>
            <Row>
              <Heading size={2}>Recommended establishments</Heading>
            </Row>
            <Row>
              {(featured &&
                featured.length >= 1 &&
                featured.map(({ id, name, image, city }) => {
                  return (
                    <Col xs={12} md={6} lg={4} xxl={3} key={id}>
                      <a href={`accommodation/${id}`}>
                        <Card name={name} city={city} image={image} key={id} />
                      </a>
                    </Col>
                  );
                })) ||
                (!error && <span>No featured establishments</span>) || (
                  <Error string={error} path="accomondation" />
                )}
            </Row>
          </Col>
        </Row>
      </Container>
      <Container placeContent="center" backgroundColor="odd" padding="100px 0">
        <Row justifyContent="center">
          <Col xs={11} sm={12} md={8}>
            <Services />
          </Col>
        </Row>
      </Container>
      <Container placeContent="center" backgroundColor="even" padding="100px 0">
        <Row justifyContent="center">
          <Col xs={11} sm={12} md={8}>
            <Heading size={2}>We are trusted by thousands of travelers</Heading>
            <p>
              <i>
                Suspendisse posuere neque non odio blandit, et facilisis est
                venenatis. - Nullam commodo .
              </i>
            </p>
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
