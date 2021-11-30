import styled, { css } from "styled-components";
import * as Colors from "../../constants/colors";
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

    ${Breakpoints.mobileOnly} {
      width: 100%;
    }

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
      border: 1px solid ${Colors.grey};
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

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  color: ${Colors.white};

  &::placeholder {
    color: ${Colors.lightGrey};
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`;

export const InputSelected = styled.div`
  color: white;
  background-color: transparent;
  width: 100%;
  height: 45px;
  padding: 0 2rem;
  border: none;
  outline: none;
  display: flex;
  align-items: center;

  &:hover {
    cursor: default;
  }
`;

export const SelectedButton = styled.button`
  background-color: ${Colors.white}};
  border: 0;
  cursor: pointer;
  outline: none;

  
  &:hover {
    transition: all 0.2s ease-in;
    background-color: ${Colors.turquoise};
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

  &::-webkit-calendar-picker-indicator {
    opacity: 1;
    filter: invert(1);
  }

  &:focus{
    outline: none;
  }

  ${Breakpoints.sm} {
  outline: none;
  padding: 0 2rem;

  &::-webkit-calendar-picker-indicator {
    padding: 0;
    margin: 0;
    filter: invert(100%);
    opacity: 0;

    &:hover {
      cursor: pointer;
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
  background-color: ${Colors.red}};
  color: white;
  border: 0;
  cursor: pointer;
  ${Breakpoints.xs} {
    width: 100%;
  }

  &:hover {
    transition: all 0.2s ease-in;
    background-color: ${Colors.turquoise};
  }

`;

export const ErrorDate = styled.div`
  position: absolute;
  z-index: 1;
  top: -5px;
  font-size: 0.7rem;

  ${Breakpoints.sm} {
    color: red;
    font-size: 0.5rem;
  }
`;

export const Suggestions = styled.div`
  position: absolute;
  z-index: 1;
  background-color: black;

  color: white;
`;

export const Dropdown = styled.div`
  color: white;
`;
