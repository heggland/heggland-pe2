import axios from "axios";
import Link from "next/link";
import EnquiryForm from "../../components/Enquiry/EnquiryForm";
import Heading from "../../components/Layout/Heading";
import Layout from "../../components/Layout/Layout";
import { BASE_URL, HOTELS_PATH, HOTEL_PATH } from "../../constants/api";
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

  let img;
  if (content.image.length != 0) {
    img = <img src={BASE_URL + content.image[0].url} height="200px" />;
  }

  return (
    <Layout
      title={content.name + " | Holidaze"}
      description={DESCRIPTION_HOTEL}
    >
      <main>
        <Heading>{content.name}</Heading>
        {img}
        <p>{content.city}</p>
        <p>{content.address}</p>
        <p>{content.zip_code}</p>
        <p>{content.description}</p>

        <EnquiryForm hotelId={content.id} />
      </main>
    </Layout>
  );
};

export async function getServerSidePaths() {
  try {
    const response = await axios.get(BASE_URL + HOTELS_PATH);

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
    const response = await axios.get(BASE_URL + HOTEL_PATH + params.id);
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
