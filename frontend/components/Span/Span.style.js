import styled, { css } from "styled-components";

const Span = styled.span`
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

export default Span;
