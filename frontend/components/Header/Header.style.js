import styled, { css } from "styled-components";

export const Header = styled.div`
  & > * {
    height: 50vh;
    width: 100%;
    position: relative;

    ${({ page }) =>
      page === "home" &&
      css`
        height: 100vh !important;
      `}
  }
`;
