import styled, { css } from "styled-components";

export const Row = styled.div`
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

    ${({ hover }) =>
    hover === "table" &&
    css`
      &:hover {
        background-color: rgb(248, 249, 249);
        cursor: default;
      }
    `}
`;

export const Col = styled.div`
  width: calc(calc(100% / 12) * ${({ size }) => size || 12});
  height: fit-content;

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
`;

export const Placement = styled.div`
  display: flex;
  flex-direction: column;
  ${({ float }) =>
    float &&
    css`
      float: ${float};
    `}
`;

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

export const LoginButton = styled.button`
  padding: 0 30px;

  &:hover {
    cursor: pointer;
  }
`;

export const Note = styled.div`
  background-color: #ffff4a;
  width: 50%;
  box-shadow: 0px 0px 15px 9px rgba(165, 165, 165, 0.4);
  border-top: 10px solid rgb(245 245 8);
`;

export const NoteHeader = styled.div`
  padding-top: 5%;
  padding-left: 10%;
`;

export const NoteBody = styled.div`
  padding-left: 10%;
  padding-bottom: 10%;
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
`;

export const LinkHover = styled.a`
  &:hover {
    border-bottom: 1px solid rgb(0, 126, 255);
  }
`;

export const Textarea = styled.textarea`
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
`;

export const LoginForm = styled.form`
  font-size: 1.1rem;
`;

export const Header = styled.header`
  height: 4rem;
  letter-spacing: 0.1rem;
  width: 100%;

  > h1 {
    margin: 0;
  }
`;

/* import { css } from "styled-components";

${(props) =>
  props.hover &&
  css`
    background-color: rgb(243 243 243);
    &:hover {
      background-color: rgb(243 243 243);
      cursor: pointer;
    }
  `} */
