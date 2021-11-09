import styled, { css } from "styled-components";
import * as breakpoints from "./breakpoints";

export const P = styled.p`
  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${weight};
    `}
  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
`;

export const Span = styled.span`
  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${weight};
    `}
  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
`;

export const Header = styled.header`
  height: 4rem;
  letter-spacing: 0.1rem;
  width: 100%;

  > h1 {
    margin: 0;
  }
`;

export const LinkHover = styled.a`
  &:hover {
    border-bottom: 1px solid rgb(0, 126, 255);
  }
`;

/* export const Button = styled.button`
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
`; */

/* export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}

  ${({ bg_color }) =>
    bg_color &&
    css`
      background-color: ${bg_color};
    `}

  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}

    ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}

    ${({ border_size, border_color }) =>
    border_size &&
    css`
      border-bottom: ${border_size || 1}px solid ${border_color || "black"};
    `}

    ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}

    ${({ textAlignLast }) =>
    textAlignLast &&
    css`
      text-align-last: ${textAlignLast};
    `}

    ${({ hover }) =>
    hover === "table" &&
    css`
      &:hover {
        background-color: rgb(248, 249, 249);
        cursor: default;
      }
    `}
`; */

/* export const Col = styled.div`
  height: fit-content;

  ${(xs) =>
    xs &&
    css`
      ${breakpoints.xs} {
        width: calc(
          calc(100% / 12) * ${({ xs }) => (xs >= 1 && xs <= 12 && xs) || 12}
        );
      }
    `}
  ${({ sm }) =>
    sm &&
    css`
      ${breakpoints.sm} {
        width: calc(
          calc(100% / 12) * ${({ sm }) => (sm >= 1 && sm <= 12 && sm) || 12}
        );
      }
    `}
    ${({ md }) =>
    md &&
    css`
      ${breakpoints.md} {
        width: calc(
          calc(100% / 12) * ${({ md }) => (md >= 1 && md <= 12 && md) || 12}
        );
      }
    `}
    ${({ lg }) =>
    lg &&
    css`
      ${breakpoints.lg} {
        width: calc(
          calc(100% / 12) * ${({ lg }) => (lg >= 1 && lg <= 12 && lg) || 12}
        );
      }
    `}
    ${({ xl }) =>
    xl &&
    css`
      ${breakpoints.xl} {
        width: calc(
          calc(100% / 12) * ${({ xl }) => (xl >= 1 && xl <= 12 && xl) || 12}
        );
      }
    `}
    ${({ xll }) =>
    xll &&
    css`
      ${breakpoints.xll} {
        width: calc(
          calc(100% / 12) * ${({ xll }) => (xll >= 1 && xll <= 12 && xll) || 12}
        );
      }
    `}



    ${({ md }) =>
    md === "auto" &&
    css`
      ${breakpoints.md} {
        width: auto !important;
      }
    `}

  ${({ alignSelf }) =>
    alignSelf &&
    css`
      align-self: ${alignSelf};
    `}
  ${({ bgColor }) =>
    bgColor &&
    css`
      background-color: ${bgColor};
    `}
    ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}

    ${({ box }) =>
    (box === "white-card" &&
      css`
        background-color: white;
        box-shadow: rgb(227 233 243) 0px 2px 20px;
        padding: 10px 20px;
      `) ||
    (box === "white-table" &&
      css`
        background-color: white;
        box-shadow: rgb(227 233 243) 0px 2px 20px;
      `)}
`; */

/* export const Placement = styled.div`
  display: flex;
  flex-direction: column;
  ${({ float }) =>
    float &&
    css`
      float: ${float};
    `}
  ${({ placeContent }) =>
    placeContent &&
    css`
      place-content: ${placeContent};
    `}
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}
`; */

/* export const Note = styled.div`
  background-color: #ffff4a;
  width: 50%;
  box-shadow: 0px 0px 15px 9px rgba(165, 165, 165, 0.4);
  border-top: 30px solid rgb(245 245 8);
`;

export const NoteHeader = styled.div`
  padding-top: 5%;
  padding-left: 10%;
`;

export const NoteBody = styled.div`
  padding-left: 10%;
  padding-bottom: 60px;
  width: fit-content;
`;

export const NoteFooter = styled.div`
  padding-left: 10%;
  padding-bottom: 10%;
  width: fit-content;
`;

export const NoteLink = styled.a`
  margin-bottom: 10%;
  width: fit-content;
  &:hover {
    border-bottom: 1px solid rgb(0, 126, 255);
  }
`; */

/* export const Textarea = styled.textarea`
  width: 100%;
  min-height: 300px;
  max-height: 600px;
  padding: 20px 20px 0px;
  font-size: 13px;
  background-color: rgb(255, 255, 255);
  cursor: text;
  color: rgb(51, 55, 64);
  overflow: auto;
  line-height: 16px;
`; */

/* export const LoginNavigation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const LoginButton = styled.button`
  margin-top: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export const LoginForm = styled.form`
  font-size: 1.1rem;
`; */

/* import { css } from "styled-components";

${(props) =>
  props.hover &&
  css`
    background-color: rgb(243 243 243);
    &:hover {
      background-color: rgb(243 243 243);
      cursor: pointer;
    }
  `} 
  
  
  export const TestCol = styled.div`
  width: calc(calc(100% / 12) * 12});
  ${(xs) =>
    xs &&
    css`
      ${breakpoints.xs} {
        width: calc(
          calc(100% / 12) * ${({ xs }) => (xs >= 1 && xs <= 12 && xs) || 12}
        );
      }
    `}
  ${({ sm }) =>
    sm &&
    css`
      ${breakpoints.sm} {
        width: calc(
          calc(100% / 12) * ${({ sm }) => (sm >= 1 && sm <= 12 && sm) || 12}
        );
      }
    `}
    ${({ md }) =>
    md &&
    css`
      ${breakpoints.md} {
        width: calc(
          calc(100% / 12) * ${({ md }) => (md >= 1 && md <= 12 && md) || 12}
        );
      }
    `}
    ${({ lg }) =>
    lg &&
    css`
      ${breakpoints.lg} {
        width: calc(
          calc(100% / 12) * ${({ lg }) => (lg >= 1 && lg <= 12 && lg) || 12}
        );
      }
    `}
    ${({ xl }) =>
    xl &&
    css`
      ${breakpoints.xl} {
        width: calc(
          calc(100% / 12) * ${({ xl }) => (xl >= 1 && xl <= 12 && xl) || 12}
        );
      }
    `}
    ${({ xll }) =>
    xll &&
    css`
      ${breakpoints.xll} {
        width: calc(
          calc(100% / 12) * ${({ xll }) => (xll >= 1 && xll <= 12 && xll) || 12}
        );
      }
    `}
`;
  
  */
