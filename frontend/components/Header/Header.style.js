import styled, { css } from "styled-components";
import * as Breakpoints from "../Global/Breakpoints";

export const Header = styled.div`
  & > * {
    height: 300px;
    position: relative;

    ${({ page }) =>
      (page === "home" &&
        css`
          ${Breakpoints.sm} {
            height: 600px;
          }

          ${Breakpoints.md} {
            height: 600px;
          }

          ${Breakpoints.lg} {
            height: 700px;
          }
        `) ||
      (page === "contact" &&
        css`
          height: 100vh;
        `)}
  }
`;
