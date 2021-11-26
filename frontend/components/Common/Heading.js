import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  font-family: "Rubik", sans-serif;
`;

const Heading = ({ size = "1", children }) => {
  const VariableHeading = `h${size}`;

  return (
    <Container>
      <VariableHeading>{children}</VariableHeading>
    </Container>
  );
};

Heading.propTypes = {
  size: PropTypes.number,
  children: PropTypes.string.isRequired,
};

export default Heading;
