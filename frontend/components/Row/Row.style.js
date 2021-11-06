import styled, { css } from "styled-components";
import * as breakpoints from "../../styles/breakpoints";

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
    values.hasOwnProperty("padding") &&
    css`
    padding: ${values.padding};
}
`}

${({ values }) =>
    values.hasOwnProperty("textAlignLast") &&
    css`
    text-align-last: ${values.textAlignLast};
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
`;

export default Row;
