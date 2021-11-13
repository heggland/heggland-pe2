import styled from "styled-components";

export const Container = styled.div`
  overflow: hidden;
  height: 100%;
`;

export const Header = styled.div`
  line-height: 20px;
  font-size: 1rem;
  font-weight: bold;
  height: 30px;
  border-bottom: 1px solid grey;
`;

export const CloseModal = styled.div`
  color: rgb(255 74 82);

  &: hover {
    cursor: pointer;
  }
`;

export const Form = styled.form``;

export const Input = styled.input`
  width: 90%;
  border: 0 !important;

  & :focus {
    outline: none;
  }
`;

export const Result = styled.div`
  padding: 10px;
  margin-bottom: 30px;
  overflow: scroll;
  overflow-x: hidden;
  height: 100%;

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
`;
