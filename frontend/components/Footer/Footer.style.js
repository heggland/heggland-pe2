import styled from "styled-components";
import * as Breakpoints from "../Global/Breakpoints";
import * as colors from "../../constants/colors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

export const Link = styled.a`
  ${Breakpoints.mobileOnly} {
    & * * :first-child {
      text-align: right;
    }
    & * * :last-child {
      padding-left: 5px;
      text-align: left;
    }
  }
`;

export const SocialMediaIcon = styled(FontAwesomeIcon)`
  color: white;
  margin: 0 10px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  height: 1rem;
`;
