import styled, { css } from "styled-components";

export const Header = styled.div`
  & > * {
    height: 500px;
    position: relative;

    ${({ page }) =>
      page === "home" &&
      css`
        height: 800px !important;
      `}
  }
`;
