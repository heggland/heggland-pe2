import PropTypes from "prop-types";

const Heading = ({ size = "1", align, children }) => {
  const VariableHeading = `h${size}`;

  return <VariableHeading className={align}>{children}</VariableHeading>;
};

Heading.propTypes = {
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Heading;
