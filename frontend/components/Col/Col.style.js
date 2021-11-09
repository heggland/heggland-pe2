import styled, { css } from "styled-components";
import * as Breakpoints from "../../styles/breakpoints";

// fetch the media query breakpoint
const handleBreakpoint = (values) => {
  switch (values) {
    case "xs":
      return Breakpoints.xs;
    case "sm":
      return Breakpoints.sm;
    case "md":
      return Breakpoints.md;
    case "lg":
      return Breakpoints.lg;
    case "xl":
      return Breakpoints.xl;
    case "xxl":
      return Breakpoints.xxl;
    default:
      return Breakpoints.xs;
  }
};

// create media css
function CreateCSS(values) {
  let styles = "";

  for (let key in values) {
    if (values.hasOwnProperty(key)) {
      if (!isNaN(values[key])) {
        const keyValue =
          values[key] >= 1 || values.key <= 12 ? values[key].toString() : "12";

        styles += css`
          ${handleBreakpoint(key)} {
            width: calc(calc(100% / 12) * ${keyValue});
          }
        `;
      } else {
        if (values[key] === "auto") {
          styles += css`
        ${handleBreakpoint(key)} {
          width: auto;);
        }
      `;
        } else if (values[key] === "none") {
          styles += css`
          ${handleBreakpoint(key)} {
            display: none;);
          }
        `;
        }
      }
    }
  }

  // remove , from width
  styles = styles.replace(/,/g, "");
  return styles;
}

const Col = styled.div`
  height: fit-content;

  ${({ values }) => values && CreateCSS(values)}
`;

export default Col;
