import styled, { css } from "styled-components";

export const Header = styled.div`
  & > * {
    height: 300px;
    position: relative;

    ${({ page }) =>
      (page === "home" &&
        css`
          height: 700px;
        `) ||
      (page === "contact" &&
        css`
          height: 100%;
        `)}
  }
`;
