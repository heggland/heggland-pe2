import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";

const Head = ({ title, description = "project exam 2" }) => {
  return (
    <MetaTags>
      <title>{title}</title>
      <meta name="description" content={description} />
    </MetaTags>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};
