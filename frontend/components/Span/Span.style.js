import styled, { css } from "styled-components";
import * as Breakpoints from "../Global/Breakpoints";

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
      padding: 0;
      ${Breakpoints.sm} {
      
        padding: ${values.padding};
      } 
  }
`}
`;

export default Span;
