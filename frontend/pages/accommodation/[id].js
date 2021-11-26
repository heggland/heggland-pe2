import axios from "axios";
import Details from "../../modules/accommodations/details/details";
import Layout from "../../components/Layout/Layout";
import { BASE_URL, ACCOMMONDATION_PATH } from "../../constants/api";
import { DESCRIPTION_HOTEL } from "../../constants/meta";
import Row from "../../components/Row/Row";
import Col from "../../components/Col/Col";

const Accommondation = ({ content, error }) => {
  if (error) {
    return (
      <>
        <Row justifyContent="center">
          <i>{error}</i>
        </Row>
        <Col height="100%" placeContent="center">
          <Row justifyContent="center">
            <a href="/">
              <u>
                <b>Go back to Holidaze</b>
              </u>
            </a>
          </Row>
        </Col>
      </>
    );
  }
  return (
    <Layout
      title={content.name + " | Holidaze"}
      description={DESCRIPTION_HOTEL}
    >
      <Details accommodation={content} />
    </Layout>
  );
};

export async function getServerSidePaths() {
  try {
    const response = await axios.get(BASE_URL + ACCOMMONDATION_PATH);
    const paths = response.data.map((data) => ({
      params: { id: data.id },
    }));

    return { paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getServerSideProps({ params }) {
  let data = [];

  console.log(params);
  try {
    const response = await axios.get(
      BASE_URL + ACCOMMONDATION_PATH + params.id
    );
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
    },
  };
}

export default Accommondation;
