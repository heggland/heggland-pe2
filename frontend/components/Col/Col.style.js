import styled, { css } from "styled-components";
import * as breakpoints from "../../styles/breakpoints";

const Style = styled.div`
  height: fit-content;

  ${({ width }) =>
    width.hasOwnProperty("xs") &&
    css`
      ${breakpoints.xs} {
        width: calc(
          calc(100% / 12) *
            ${({ width }) =>
              (width.xs >= 1 && width.xs <= 12 && width.xs) || 12}
        );
        width: ${({ width }) => width.xs === "auto" && "auto"};
      }
    `}

  ${(width) =>
    width.hasOwnProperty("sm") &&
    css`
      ${breakpoints.sm} {
        width: calc(
          calc(100% / 12) *
            ${({ width }) =>
              (width.sm >= 1 && width.sm <= 12 && width.sm) || 12}
        );
        width: ${({ width }) => width.sm === "auto" && "auto"};
      }
    `}

    ${({ width }) =>
    width.hasOwnProperty("md") &&
    css`
      ${breakpoints.md} {
        width: calc(
          calc(100% / 12) *
            ${({ width }) =>
              (width.md >= 1 && width.md <= 12 && width.md) || 12}
        );
        width: ${({ width }) => width.md === "auto" && "auto"};
      }
    `}
    
    ${({ width }) =>
    width.hasOwnProperty("lg") &&
    css`
      ${breakpoints.lg} {
        width: calc(
          calc(100% / 12) *
            ${({ width }) =>
              (width.lg >= 1 && width.lg <= 12 && width.lg) || 12}
        );
        width: ${({ width }) => width.lg === "auto" && "auto"};
      }
    `}

    ${({ width }) =>
    width.hasOwnProperty("xl") &&
    css`
      ${breakpoints.xl} {
        width: calc(
          calc(100% / 12) *
            ${({ width }) =>
              (width.xl >= 1 && width.xl <= 12 && width.xl) || 12}
        );
        width: ${({ width }) => width.xl === "auto" && "auto"};
      }
    `}

    ${({ width }) =>
    width.hasOwnProperty("xxl") &&
    css`
      ${breakpoints.xxl} {
        width: calc(
          calc(100% / 12) *
            ${({ width }) =>
              (width.xxl >= 1 && width.xxl <= 12 && width.xxl) || 12}
        );
        width: ${({ width }) => width.xxl === "auto" && "auto"};
      }
    `}
`;

export default Style;
