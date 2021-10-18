import type { NextPage } from "next";
import Head from "../components/Layout/Head";
import Heading from "../components/Layout/Heading";

const Home: NextPage = () => {
  return (
    <>
      <Head title="Holidaze" />
      <main>
        <Heading>Home</Heading>
      </main>
    </>
  );
};

export default Home;
