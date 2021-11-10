import styled, { css } from "styled-components";

const Paragraph = styled.p`
  ${({ values }) =>
    values.hasOwnProperty("weight") &&
    css`
    font-weight: ${values.weight};
}
`}
  ${({ values }) =>
    values.hasOwnProperty("padding") &&
    css`
  padding: ${values.padding};
} 
`}
`;

export default Paragraph;
