import styled, { css } from "styled-components";
import * as Breakpoints from "../../../components/Global/Breakpoints";

export const Container = styled.div`
  ${Breakpoints.xs} {
    margin: 0 20px;
  }

  ${Breakpoints.md} {
    margin: 50px 20px;
  }
`;

export const BackButton = styled.div`
position fixed;
top: 1rem;
color: white;
width: 2rem;
height: 2.5rem;
display: flex;
align-items: center;
place-content: center;

${Breakpoints.desktopOnly} {
&:hover {
    cursor: pointer;
    background-color: rgb(0 114 231);
  }
}

${Breakpoints.mobileOnly} {
  position: relative;
  color: black;
  & > svg {
    display: none;
  }
  width: fit-content;
  ::after { 
    content: " Go Back";
  }
  &:hover {
    cursor: pointer;
    font-weight: bold;
    text-decoration: underline;
  }
}

`;

export const ButtonGroup = styled.div`
  height: 2rem;
  display: flex;
`;

export const Button = styled.button`
  ${({ bgColor }) =>
    bgColor &&
    css`
      background-color: ${bgColor};
    `}
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}

    ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}

    ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}

  min-width: 100px;
  font-weight: 600;
  max-width: 100%;
  border: 0;

  &:hover {
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 15%) 0px 0px 30px inset;
  }

  ${({ disabledChange }) =>
    disabledChange &&
    css`
      background-color: rgb(233, 234, 235);
      color: rgb(180, 182, 186);
      &:hover {
        cursor: default;
        box-shadow: none;
      }
    `}
`;

export const InformationGroup = styled.div``;

export const ButtonDelete = styled.div`
  color: rgb(246, 77, 10);

  &:hover {
    cursor: pointer;
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
