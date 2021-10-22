import axios from "axios";
import Heading from "../../components/Layout/Heading";
import { AdminLayout } from "../../components/Layout/Layout";
import { BASE_URL, ENQUIRIES_PATH } from "../../constants/api";
import { TITLE_ADMIN_ENQUIRIES } from "../../constants/meta";

const Enquiries = ({ error, content }) => {
  console.log(content);

  if (error) {
    return (
      <AdminLayout title={TITLE_ADMIN_ENQUIRIES}>
        <Heading>User enquiries</Heading>
        {error}
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={TITLE_ADMIN_ENQUIRIES}>
      <Heading>User enquiries</Heading>
      {content.map(({ id, name, message }) => {
        return (
          <div key={id}>
            <p>{name}</p>
            <p>{message}</p>
          </div>
        );
      })}
    </AdminLayout>
  );
};

export async function getServerSideProps() {
  let data = [];

  // fetch token

  try {
    const response = await axios.get(BASE_URL + ENQUIRIES_PATH);

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

export default Enquiries;
