import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${({ bg_color }) => bg_color};
  margin-top: ${({ margin }) => margin}px;
  padding-bottom: ${({ padding_bottom }) => padding_bottom}px;
  margin-bottom: ${({ margin }) => margin}px;
  border-bottom: ${({ border_size }) => border_size}px solid
    ${({ border_color }) => border_color};
  justify-content: ${({ justifyContent }) => justifyContent};
`;

export const Col = styled.div`
  width: calc(calc(100% / 12) * ${({ size }) => size || 12});
`;

export const Placement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justifyContent }) => justifyContent};
  text-align: ${({ align }) => align};
  place-content: ${({ place }) => place};
  height: ${({ height }) => height}%;
  width: ${({ width }) => width}%;
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  align-items: ${({ alignItems }) => alignItems};
  z-index: ${({ zIndex }) => zIndex};
`;

export const P = styled.p`
  font-weight: ${({ weight }) => weight};
  padding-left: ${({ padding_left }) => padding_left}px;
`;

export const Span = styled.span`
  font-weight: ${({ weight }) => weight};
  padding-left: ${({ padding_left }) => padding_left}px;
`;

export const Button = styled.button`
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "transparent"};
  color: ${({ color }) => color || "black"};
  padding: ${({ padding }) => padding};
  border: none;
  width: ${({ width }) => width || "auto"});

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
