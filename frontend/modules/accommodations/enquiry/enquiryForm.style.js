import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  border-top: 0 !important;
  border-left: 0 !important;
  border-right: 0 !important;
  padding-bottom: 2px;

  & :focus {
    outline: none;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  height: 100px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 2%;

  & :focus {
    outline: none;
  }
`;

export const Error = styled.span`
  color: red;
  font-size: 12px;
  position: absolute;
  display: flex;
}
`;

export const Thanks = styled.div`
  color: green;
  position: absolute;
  left: 0;
  right: 0;
`;

export const Group = styled.div``;

export const Button = styled.button`
  background-color: rgb(45 148 0);
  border: none;
  color: white;
  padding: 10px 25px;
  margin-top: 30px;

  &:hover {
    cursor: pointer;
  }

  ${({ error }) =>
    error &&
    `
    background-color: rgb(255 29 39);
    &:hover {
      cursor: default;
    }
    `}

  ${({ sent }) =>
    sent &&
    `
  &:hover {
    cursor: default;
  }
`}
`;

export const SentButton = styled.div`
  background-color: rgb(45 148 0 / 85%);
  border: none;
  color: white;
  padding: 10px 25px;
  margin-top: 30px;

  &:hover {
    cursor: default;
  }
`;
