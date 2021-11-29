import styled, { css } from "styled-components";

export const ButtonContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  overflow: hidden;
  height: 100%;
`;

export const CloseModal = styled.div`
  color: rgb(255 74 82);
  justify-content: right;
  display: flex;

  &: hover {
    cursor: pointer;
  }
`;

export const Form = styled.form``;

export const Input = styled.input`
  font-size: 1.2rem;
  width: 90%;
  border: 0 !important;

  &:focus {
    outline: none;
  }

  ${({ error }) =>
    error &&
    `
  background-color: white;
  `}

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`;

export const Header = styled.div`
  font-size: 1.2rem;
  line-height: 20px;
  font-size: 1rem;
  font-weight: bold;
  padding: 15px 0;
  box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
  padding-bottom: 5px;
  position: fixed;
  left: 0;
  right: 0;
`;

export const Result = styled.div`
  margin-top: 50px;
  padding: 10px;
  padding-bottom: 50px;
  overflow: auto;
  height: 100%;
  font-size: 1.2rem;

  display: flex;
  justify-content: center;

  & ::-webkit-scrollbar {
    width: 10px;
  }

  & ::-webkit-scrollbar-track {
    background: rgb(240, 240, 240);
  }

  & ::-webkit-scrollbar-thumb {
    background: rgb(135, 135, 135);
    border-radius: 10px;
  }

  & ::-webkit-scrollbar-thumb:hover {
    background: rgb(84, 84, 84);
  }

  // items found in search
  & > * > * > * {
    margin: 10px 0;
    border-radius: 5px;
    background-color: white;
    box-shadow: rgb(227 233 243) 0px 2px 20px;
    padding: 5px 10px;


    &: hover {
      box-shadow: rgb(227 233 243) 0px 4px 40px;
    }
    }
  }
`;

export const ResultImage = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;
