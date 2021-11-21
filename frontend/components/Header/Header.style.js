import styled, { css } from "styled-components";

export const Header = styled.div`
  & > * {
    height: 50vh;
    width: 100%;
    object-fit: cover;
    /*     background-image: url("https://www.worldbeachguide.com/photos/large/bystranda-kristiansand.webp");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%; */

    ${({ page }) =>
      page === "home" &&
      css`
        height: 80vh !important;
      `}
  }
`;
