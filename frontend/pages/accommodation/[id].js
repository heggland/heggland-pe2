import axios from "axios";
import Link from "next/link";
import Details from "../../modules/accommodations/details/details";
import Layout from "../../components/Layout/Layout";
import { BASE_URL, ACCOMMONDATION_PATH } from "../../constants/api";
import { DESCRIPTION_HOTEL } from "../../constants/meta";

const Hotel = ({ content, error }) => {
  if (error) {
    return (
      <>
        <Link href="/">
          <a className="link">Go back to Holidaze</a>
        </Link>
        {error}
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

export default Hotel;
