import Layout from "../components/Layout/Layout";
import {
  TITLE_ACCOMMONDATION,
  DESCRIPTION_ACCOMMONDATION,
} from "../constants/meta";
import Heading from "../components/Common/Heading";
import axios from "axios";
import { BASE_URL, ACCOMMONDATION_PATH } from "../constants/api";
import Card from "../components/Card/Card";
import * as Style from "./accommodation.style";

const Accommodation = (props) => {
  return (
    <Layout
      title={TITLE_ACCOMMONDATION}
      description={DESCRIPTION_ACCOMMONDATION}
    >
      <Style.Container>
        <Heading>Our Accommodation</Heading>
        {(props.content.length !== 0 &&
          props.content.map(({ id, name, image, city }) => {
            return (
              <a href={`accommodation/${id}`} key={id}>
                <Card name={name} city={city} image={image} key={id} />
              </a>
            );
          })) ||
          "no accommodations"}
      </Style.Container>
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
