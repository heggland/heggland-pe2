import PropTypes from "prop-types";
import Head from "next/head";

const MyHead = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default MyHead;

MyHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};
