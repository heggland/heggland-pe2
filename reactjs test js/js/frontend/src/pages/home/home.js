import Heading from "../../components/Layout/Heading";
import Head from "../../components/Layout/Head";
import HotelList from "../hotelList/hotelList";

const Home = () => {
  return (
    <>
      <Head title="Home" />
      <Heading>Home</Heading>

      <HotelList />
    </>
  );
};

export default Home;
