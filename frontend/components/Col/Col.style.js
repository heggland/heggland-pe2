import styled, { css } from "styled-components";
import * as Breakpoints from "../../styles/breakpoints";

const Col = styled.div`
  height: fit-content;

  ${({ values }) =>
    // xs
    (values.hasOwnProperty("xs") &&
      !isNaN(values.xs) &&
      css`
        ${Breakpoints.xs} {
          width: calc(
            calc(100% / 12) *
              ${({ values }) =>
                (values.xs >= 1 && values.xs <= 12 && values.xs) || 12}
          );
        }
      `) ||
    (values.hasOwnProperty("xs") &&
      isNaN(values.xs) &&
      css`
          width: ${({ values }) => values.xs === "auto" && "auto"};
          ${Breakpoints.xsOnly} {
            display: ${({ values }) =>
              (values.xs === "none" && "none") || "flex"};
          }
        }
      `)}

  ${({ values }) =>
    // sm
    (values.hasOwnProperty("sm") &&
      !isNaN(values.sm) &&
      css`
        ${Breakpoints.sm} {
          width: calc(
            calc(100% / 12) *
              ${({ values }) =>
                (values.sm >= 1 && values.sm <= 12 && values.sm) || 12}
          );
        }
      `) ||
    (values.hasOwnProperty("sm") &&
      isNaN(values.sm) &&
      css`
          width: ${({ values }) => values.sm === "auto" && "auto"};
          ${Breakpoints.smOnly} {
            display: ${({ values }) =>
              (values.sm === "none" && "none") || "flex"};
          }
        }
      `)}

      ${({ values }) =>
    // md
    (values.hasOwnProperty("md") &&
      !isNaN(values.md) &&
      css`
        ${Breakpoints.md} {
          width: calc(
            calc(100% / 12) *
              ${({ values }) =>
                (values.md >= 1 && values.md <= 12 && values.md) || 12}
          );
        }
      `) ||
    (values.hasOwnProperty("md") &&
      isNaN(values.md) &&
      css`
          width: ${({ values }) => values.md === "auto" && "auto"};
          ${Breakpoints.mdOnly} {
            display: ${({ values }) =>
              (values.md === "none" && "none") || "flex"};
          }
        }
      `)}
    
      ${({ values }) =>
    // lg
    (values.hasOwnProperty("lg") &&
      !isNaN(values.lg) &&
      css`
        ${Breakpoints.lg} {
          width: calc(
            calc(100% / 12) *
              ${({ values }) =>
                (values.lg >= 1 && values.lg <= 12 && values.lg) || 12}
          );
        }
      `) ||
    (values.hasOwnProperty("lg") &&
      isNaN(values.xs) &&
      css`
          width: ${({ values }) => values.lg === "auto" && "auto"};
          ${Breakpoints.lgOnly} {
            display: ${({ values }) =>
              (values.lg === "none" && "none") || "flex"};
          }
        }
      `)}

      ${({ values }) =>
    // xl
    (values.hasOwnProperty("xl") &&
      !isNaN(values.xl) &&
      css`
        ${Breakpoints.xl} {
          width: calc(
            calc(100% / 12) *
              ${({ values }) =>
                (values.xl >= 1 && values.xl <= 12 && values.xl) || 12}
          );
        }
      `) ||
    (values.hasOwnProperty("xl") &&
      isNaN(values.xl) &&
      css`
            width: ${({ values }) => values.xl === "auto" && "auto"};
            ${Breakpoints.xlOnly} {
              display: ${({ values }) =>
                (values.xl === "none" && "none") || "flex"};
            }
          }
        `)}

        ${({ values }) =>
    // xxl
    (values.hasOwnProperty("xxl") &&
      !isNaN(values.xxl) &&
      css`
        ${Breakpoints.xxl} {
          width: calc(
            calc(100% / 12) *
              ${({ values }) =>
                (values.xxl >= 1 && values.xxl <= 12 && values.xxl) || 12}
          );
        }
      `) ||
    (values.hasOwnProperty("xxl") &&
      isNaN(values.xxl) &&
      css`
              width: ${({ values }) => values.xxl === "auto" && "auto"};
              ${Breakpoints.xxlOnly} {
                display: ${({ values }) =>
                  (values.xxl === "none" && "none") || "flex"};
              }
            }
          `)}
`;

export default Col;
