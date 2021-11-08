import styled, { css } from "styled-components";

export const Button = styled.button`
  ${({ backgroundColor }) =>
    (backgroundColor &&
      css`
        background-color: ${backgroundColor};
      `) ||
    css`
      background-color: transparent;
    `}
  ${({ border }) =>
    (border &&
      css`
        border: ${border};
      `) ||
    css`
      border: none;
    `}
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin}px;
      margin-bottom: ${margin}px;
    `}
${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
  ${({ width }) =>
    width &&
    css`
      width: ${width}%;
    `}

  &:hover {
    cursor: pointer;
  }
`;
