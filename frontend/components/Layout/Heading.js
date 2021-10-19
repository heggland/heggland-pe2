import PropTypes from "prop-types";

const Heading = ({ size = "1", children }) => {
  const VariableHeading = `h${size}`;

  return <VariableHeading>{children}</VariableHeading>;
};

Heading.propTypes = {
  size: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default Heading;
