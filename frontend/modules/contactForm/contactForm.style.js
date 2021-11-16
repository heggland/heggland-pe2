import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
`;

export const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 25px;
`;

export const InputField = styled.input`
  width: 100%;
  border: 1px solid rgb(229 230 233);
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  font-size: 14px;
  &:focus {
    outline: 0;
    box-shadow: none;
  }
`;

export const InputTextArea = styled.input`
  width: 100%;
  height: 160px;
  border: 1px solid rgb(229 230 233);
  padding-top: 5px;
  padding-left: 15px;
  font-size: 14px;
  resize: vertical;

  &:focus {
    outline: 0;
    box-shadow: none;
  }
`;

export const Error = styled.span`
  color: red;
  font-size: 12px;
  position: absolute;
  display: flex;
`;

export const Thanks = styled.div`
  color: green;
  position: relative;
`;

export const Button = styled.button`
  background-color: rgb(45 148 0);s
  border: none;
  color: white;
  padding: 10px 25px;
  margin-top: 30px;
  width: fit-content;

  &:hover {
    cursor: pointer;
  }
`;

export const SentButton = styled.div`
  background-color: rgb(45 148 0 / 85%);
  border: none;
  color: white;
  padding: 10px 25px;
  margin-top: 30px;
  width: fit-content;

  &:hover {
    cursor: default;
  }
`;
