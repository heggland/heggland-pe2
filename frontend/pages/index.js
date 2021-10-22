import SearchHotels from "../components/Common/SearchHotels";
import Heading from "../components/Layout/Heading";
import Layout from "../components/Layout/Layout";
import { DESCRIPTION_HOME, TITLE_HOME } from "../constants/meta";
export default function Home() {
  return (
    <Layout title={TITLE_HOME} description={DESCRIPTION_HOME}>
      <Heading>Home</Heading>

      <SearchHotels />

      <main></main>
    </Layout>
  );
}
