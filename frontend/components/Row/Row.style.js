import styled, { css } from "styled-components";
import * as Breakpoints from "../Global/Breakpoints";

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${({ values }) =>
    values.hasOwnProperty("width") &&
    css`
      width: ${values.width};
    }
  `}

  ${({ values }) =>
    values.hasOwnProperty("height") &&
    css`
    height: ${values.height};
  }
`}

${({ values }) =>
    values.hasOwnProperty("flexDirection") &&
    css`
    display: flex;
    flex-direction: ${values.flexDirection};
    }
`}

  ${({ values }) =>
    values.hasOwnProperty("backgroundColor") &&
    css`
    background-color: ${values.backgroundColor};
  }
`}

${({ values }) =>
    values.hasOwnProperty("justifyContent") &&
    css`
    justify-content: ${values.justifyContent};
}
`}

${({ values }) =>
    values.hasOwnProperty("margin") &&
    css`
    margin: ${values.margin};
}
`}

${({ values }) =>
    values.hasOwnProperty("padding") &&
    css`
    padding: ${values.padding};
}
`}

${({ values }) =>
    values.hasOwnProperty("alignItems") &&
    css`
    align-items: ${values.alignItems};
}
`}

${({ values }) =>
    values.hasOwnProperty("alignItemsSm") &&
    css`
    ${Breakpoints.sm} {
    align-items: ${values.alignItemsSm};
    }
}
`}

${({ values }) =>
    values.hasOwnProperty("textAlignLast") &&
    css`
    text-align-last: ${values.textAlignLast};
}
`}

${({ values }) =>
    values.hasOwnProperty("textAlign") &&
    css`
    text-align: ${values.textAlign};
}
`}

${({ values }) =>
    values.hasOwnProperty("borderSize") &&
    css`
    border-bottom: ${values.borderSize || 1}px solid;
}
`}

${({ values }) =>
    values.hasOwnProperty("borderColor") &&
    css`
    border-color: ${values.borderColor || "black"};
}
`}


${({ values }) =>
    values.hasOwnProperty("hover") &&
    css`
    &:hover {
      background-color: ${values.hover}};
      cursor: default;
    }
}
`}

${({ values }) =>
    values.hasOwnProperty("cursor") &&
    css`
    &:hover {
      cursor: ${values.cursor};
    }
}
`}

${({ values }) =>
    // direction
    values.hasOwnProperty("direction") &&
    css`
    ${Breakpoints.xsOnly} {
      flex-direction: ${({ values }) =>
        (values.direction === "column-mobile" && "column") ||
        (values.direction === "row-mobile" && "row")}; };
    }
}
`}

${({ values }) =>
    // xs
    values.hasOwnProperty("xs") &&
    isNaN(values.xs) &&
    css`
      width: ${({ values }) => values.xs === "auto" && "auto"};
      ${Breakpoints.xsOnly} {
        display: ${({ values }) => (values.xs === "none" && "none") || "flex"};
      }
    }
  `}

${({ values }) =>
    // sm
    values.hasOwnProperty("sm") &&
    isNaN(values.sm) &&
    css`
      width: ${({ values }) => values.sm === "auto" && "auto"};
      ${Breakpoints.smOnly} {
        display: ${({ values }) => (values.sm === "none" && "none") || "flex"};
      }
    }
  `}

  ${({ values }) =>
    // md
    values.hasOwnProperty("md") &&
    isNaN(values.md) &&
    css`
      width: ${({ values }) => values.md === "auto" && "auto"};
      ${Breakpoints.mdOnly} {
        display: ${({ values }) => (values.md === "none" && "none") || "flex"};
      }
    }
  `}

  ${({ values }) =>
    // lg
    values.hasOwnProperty("lg") &&
    isNaN(values.xs) &&
    css`
      width: ${({ values }) => values.lg === "auto" && "auto"};
      ${Breakpoints.lgOnly} {
        display: ${({ values }) => (values.lg === "none" && "none") || "flex"};
      }
    }
  `}

  ${({ values }) =>
    // xl
    values.hasOwnProperty("xl") &&
    isNaN(values.xl) &&
    css`
        width: ${({ values }) => values.xl === "auto" && "auto"};
        ${Breakpoints.xlOnly} {
          display: ${({ values }) =>
            (values.xl === "none" && "none") || "flex"};
        }
      }
    `}

    ${({ values }) =>
    // xxl
    values.hasOwnProperty("xxl") &&
    isNaN(values.xxl) &&
    css`
          width: ${({ values }) => values.xxl === "auto" && "auto"};
          ${Breakpoints.xxlOnly} {
            display: ${({ values }) =>
              (values.xxl === "none" && "none") || "flex"};
          }
        }
      `}
`;

export default Row;
