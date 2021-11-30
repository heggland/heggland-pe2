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

export const InputSelected = styled.input`
  display: none;
`;

export const InputSelectedText = styled.span`
  color: white;
  background-color: transparent;
  width: 100%;
  height: 45px;
  padding: 0 2rem;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  white-space: nowrap !important;
  overflow: hidden;

  &:hover {
    cursor: default;
  }
`;

export const SelectedButton = styled.div`
  color: white;
  border: 0;
  cursor: pointer;
  outline: none;

  &:hover {
    transition: all 0.2s ease-in;
  }
`;

export const InputLabel = styled.label`
  position: absolute;
  padding-left: 2rem;
  color: white;
  font-size: 1rem;
`;

export const DatePicker = styled.label`
  color: white;
`;

export const DateInput = styled.input`
  background-color: transparent;
  width: 100%;
  height: 45px;
  padding-left: 2rem;
  border: none;
  color: white;

  filter: invert(0);

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export const InputContainer = styled.div`
  color: white;
`;

export const InputIcon = styled.label`
  color: white;
  user-select: none;
  ${({ hover }) =>
    hover &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}
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
  background-color: white;
  border-radius: 5px;
  margin-top: 10px;
  height: fit-content;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  width: 95%;
  padding: 15px;
  left: 50%;
  transform: translateX(-50%);

  ${Breakpoints.sm} {
    left: auto;
    transform: none;
    width: 40%;
  }

  ${Breakpoints.lg} {
    left: auto;
    transform: none;
    width: 20%;
  }

  display: none;
  ${({ show }) =>
    show &&
    css`
      display: block;
    `}
`;

export const Dropdown = styled.div`
  color: black;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
  padding: 0.5rem;

  ${({ hover }) =>
    hover &&
    css`
      &:hover {
        cursor: pointer;
        font-weight: bold;
      }
    `}
`;
