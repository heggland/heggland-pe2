import styled, { css } from "styled-components";
import * as Breakpoints from "../Global/Breakpoints";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${({ values }) =>
    values.hasOwnProperty("placeContent") &&
    isNaN(values.placeContent) &&
    css`
      place-content: ${values.placeContent};
        }
      `}

  ${({ values }) =>
    values.hasOwnProperty("height") &&
    !isNaN(values.height) &&
    css`
      height: ${values.height}%;
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
