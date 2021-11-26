import styled from "styled-components";
import * as Breakpoints from "../Global/Breakpoints";
import * as colors from "../../constants/colors";

// unauthorized/visitors path
export const Footer = styled.footer`
  background-color: ${colors.grey};
  color: white;

  ${Breakpoints.mobileOnly} {
    display: flex;
    text-align: center;
  }

  ${Breakpoints.sm} {
    // left
  }
`;
