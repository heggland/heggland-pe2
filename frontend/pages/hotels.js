import Layout from "../components/Layout/Layout";
import { DESCRIPTION_HOTELS, TITLE_HOTELS } from "../constants/meta";
import Heading from "../components/Layout/Heading";

const Hotels = () => {
  return (
    <Layout title={TITLE_HOTELS} description={DESCRIPTION_HOTELS}>
      <Heading>Hotels</Heading>
      <main></main>

      <footer></footer>
    </Layout>
  );
};

export default Hotels;
