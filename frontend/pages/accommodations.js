import Layout from "../components/Layout/Layout";
import {
  TITLE_ACCOMMONDATION,
  DESCRIPTION_ACCOMMONDATION,
} from "../constants/meta";
import Heading from "../components/Common/Heading";
import axios from "axios";
import { BASE_URL, ACCOMMONDATION_PATH } from "../constants/api";
import Card from "../components/Card/Card";
import Col from "../components/Col/Col";
import Row from "../components/Row/Row";
import Container from "../components/Container/Container";

const Accommodation = (props) => {
  return (
    <Layout
      title={TITLE_ACCOMMONDATION}
      description={DESCRIPTION_ACCOMMONDATION}
    >
      <Container>
        <Row justifyContent="center">
          <Heading>Our Accommodation</Heading>
        </Row>
        <Row justifyContent="center">
          <Col xs={8} md={8}>
            <Row>
              {(props.content &&
                props.content.map(({ id, name, image, city }) => {
                  return (
                    <Col md={6} lg={4} xxl={3} key={id}>
                      <a href={`accommodation/${id}`}>
                        <Card name={name} city={city} image={image} key={id} />
                      </a>
                    </Col>
                  );
                })) ||
                "no accommodations"}
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
