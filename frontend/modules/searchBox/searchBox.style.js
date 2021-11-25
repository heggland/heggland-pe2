import styled, { css } from "styled-components";
import * as colors from "../../constants/colors";
import * as Breakpoints from "../../components/Global/Breakpoints";

export const SearchBox = styled.div`
  position: relative;
  margin-top: -25px;
  ${Breakpoints.xsOnly} {
    position: absolute;
    transform: translate(0, 70%);
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translate(0, 50%);
    & > * > * > * > * {
      border: 3px solid ${colors.orange};
    }
  }
`;

export const Container = styled.div`
  background-color: white;
  color: black;
  box-shadow: 0px 0px 5px 5px rgba(0 0 0 / 10%);
  border: 3px solid ${colors.orange}};
  border-radius: 5px;

  ${({ width }) =>
    width &&
    css`
      width: calc(calc(100% / 12) * ${width});
    `}
 

  /*
  ${Breakpoints.sm} {
    width: 95%;
    position: absolute;
    top: 50%;
    transform: translate(0, 50%);
  }

  ${Breakpoints.md} {
    position: absolute;
    top: 25%;
    transform: translate(0, 25%);
  } */
 



  // border around last input field
  & > * > * > * {
    &:last-child {
    border-right: none;
    }
  } 

  ${Breakpoints.xsOnly} {
    width: 99%;
    position: absolute;
    top: 50%;
    transform: translate(0, 50%);
    & > *  > * > * > * {
    border: 3px solid ${colors.orange}};
  }
  }
}
`;

export const TextInput = styled.input`
  width: 100%;
  height: 45px;
  padding: 0 2rem;
  border: none;
  outline: none;
    
  ${Breakpoints.sm} {
  border-right: 3px solid ${colors.orange}};
}
  ::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }

`;

export const DateInput = styled.input`
  width: 100%;
  height: 45px;
  padding-left: 2rem;
  border-top: none;
  border-left: none;
  border-bottom: none;
  border: none;

  ${Breakpoints.sm} {
  border-right: 3px solid ${colors.orange}};
  }
  outline: none;
  padding: 0 2rem;

  ::-webkit-calendar-picker-indicator {
    ${Breakpoints.sm} {
    opacity: 0;
    }
    //position: absolute;
    //width: 60%;
    padding: 0;
    margin: 0;
}

  // TODO: future implementation: the whole date input column should bring up the datepicker
  &:hover { 
    ::-webkit-calendar-picker-indicator {
      opacity: 1;
    }
  }
}


}

`;

export const InputLabel = styled.label`
  position: absolute;
`;

export const Button = styled.button`
  width: 100%;
  height: 45px;
  background-color: ${colors.blue}};
  color: white;
  border: 0;
  cursor: pointer;
  ${Breakpoints.xs} {
    width: 100%;
  }
`;

export const ErrorDate = styled.div`
  position: absolute;
  bottom: 75px;
  color: red;
  padding: 10px;
  font-size: 0.7rem;

  ${Breakpoints.sm} {
    position: absolute;
    color: red;
    padding: 10px;
    font-size: 0.5rem;
  }
`;

export const ErrorSearch = styled.div`
  position: relative;
  top: -5px;
  color: red;
  padding: 10px;
  font-size: 0.5rem;

  ${Breakpoints.sm} {
    position: absolute;
    color: red;
    padding: 10px;
    font-size: 0.7rem;
  }
`;
