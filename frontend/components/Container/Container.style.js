import styled, { css } from "styled-components";
import * as Breakpoints from "../Global/Breakpoints";
import * as Colors from "../../constants/colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${({ values }) =>
    (values.hasOwnProperty("backgroundColor") &&
      values.backgroundColor === "odd" &&
      css`
    background-color: ${Colors.white};
      }
    `) ||
    (values.backgroundColor === "even" &&
      css`
    background-color: ${Colors.sandy};
      }
    `)}

  ${({ values }) =>
    values.hasOwnProperty("placeContent") &&
    isNaN(values.placeContent) &&
    css`
      place-content: ${values.placeContent};
        }
      `}

  ${({ values }) =>
    (values.hasOwnProperty("height") &&
      !isNaN(values.height) &&
      css`
      height: ${values.height}%;
      }
    `) ||
    css`
    height: ${values.height};
    }
  `}

    ${({ values }) =>
    values.hasOwnProperty("float") &&
    isNaN(values.float) &&
    css`
      float: ${values.float};
      }
    `}

    ${({ values }) =>
    values.hasOwnProperty("padding") &&
    isNaN(values.padding) &&
    css`
      padding: ${values.padding};
      }
    `}
`;

export default Container;
