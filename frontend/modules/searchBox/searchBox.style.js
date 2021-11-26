import styled, { css } from "styled-components";
import * as colors from "../../constants/colors";
import * as Breakpoints from "../../components/Global/Breakpoints";

export const Container = styled.div`
  background-color: transparent;
  color: black;
  border-radius: 5px;

  ${({ width }) =>
    width &&
    css`
      width: calc(calc(100% / 12) * ${width});
    `}

}
`;

export const Title = styled.label`
  color: white;
  font-size: 1.5rem;
  align-self: center;
  padding: 0.5rem;
`;

export const Form = styled.form`
  & > * > * {
    &:first-child,
    &:nth-child(3),
    &:nth-child(5) {
      border: 1px solid ${colors.grey};
    }
  }
`;

export const TextInput = styled.input`
  background-color: transparent;
  width: 100%;
  height: 45px;
  padding: 0 2rem;
  border: none;
  outline: none;

  color: ${colors.white};

  &::placeholder {
    color: ${colors.lightGrey};
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`;

export const InputLabel = styled.label`
  position: absolute;
  padding-left: 2rem;
  color: white;
  font-size: 1rem;
`;

export const DateInput = styled.input`
  background-color: transparent;
  width: 100%;
  height: 45px;
  padding-left: 2rem;
  border: none;

  color: white;

  &:::-webkit-calendar-picker-indicator {
    filter: invert(100%);
  }

  ${Breakpoints.sm} {
  outline: none;
  padding: 0 2rem;

  &::-webkit-calendar-picker-indicator {
    padding: 0;
    margin: 0;
    filter: invert(100%);
    
    ${Breakpoints.sm} {
      opacity: 0;
    }

}


  &:hover { 
    &::-webkit-calendar-picker-indicator {
      opacity: 1;
    }
  }

  

`;

export const InputContainer = styled.div`
  color: white;
`;

export const InputIcon = styled.label`
  color: white;
`;

export const Button = styled.button`
  width: 100%;
  height: 45px;
  background-color: ${colors.red}};
  color: white;
  border: 0;
  cursor: pointer;
  ${Breakpoints.xs} {
    width: 100%;
  }

  &:hover {
    transition: all 0.2s ease-in;
    background-color: ${colors.turquoise};
  }

`;

// error

export const ErrorDate = styled.div`
  position: relative;
  font-size: 0.7rem;

  ${Breakpoints.sm} {
    color: red;
    font-size: 0.5rem;
  }
`;

export const ErrorSearch = styled.div`
  position: relative;
  top: -5px;
  color: red;
  font-size: 0.5rem;

  ${Breakpoints.sm} {
    color: red;
    font-size: 0.7rem;
  }
`;
