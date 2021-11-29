import styled, { css } from "styled-components";
import * as Breakpoints from "../../../components/Global/Breakpoints";
import * as Colors from "../../../constants/colors";

export const Container = styled.div`
  ${Breakpoints.xs} {
    margin: 0;
  }

  ${Breakpoints.md} {
    margin: 50px 20px;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;

  ${Breakpoints.mobileOnly} {
    flex-direction: column;
    & > :first-child {
      margin-top: 20px;
      margin-bottom: 20px;
    }
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

&:hover {
    cursor: pointer;
    background-color: rgb(0 114 231);
  }

${Breakpoints.mobileOnly} {
display: none;
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

export const Select = styled.select`
  &:focus {
    border: 2px solid ${Colors.blue};
    outline: 0;
    box-shadow: none;
  }
`;

export const Input = styled.input`
  padding-left: 5px;
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
  max-height: 600px;
  min-width: 100%;
  resize: vertical;

  &:focus {
    border: 2px solid ${Colors.blue};
    outline: 0;
    box-shadow: none;
  }
`;

export const StateInfo = styled.div`
  background-color: rgb(230, 248, 212);
  color: ${Colors.green};
  border: 1px solid rgb(170, 214, 124);

  ${({ state }) =>
    state === "draft" &&
    css`
      color: rgb(0, 126, 255);
      background-color: rgb(230, 240, 251);
      border: 1px solid rgb(165, 213, 255);
    `}
`;

export const Box = styled.div`
  background-color: white;
  padding: 22px 20px;
  border-radius: 2 px;
  box-shadow: rgb(227 223 243) 0px 2px 5px;
  height: 100%;

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

    ${Breakpoints.xs} {
    padding: 20px;
    border: 0;
  }
`;

export const CheckBox = styled.input``;

export const ImageContainer = styled.div`
  height: 300px;
`;

export const Image = styled.img`
  height: 250px;
  width: 250px;
`;

export const ErrorContainer = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid red;
`;
