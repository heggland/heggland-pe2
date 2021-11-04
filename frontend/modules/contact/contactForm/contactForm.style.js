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

  &:focus {
    outline: 0;
    box-shadow: none;
  }
`;

export const Error = styled.span`
  color: red;
`;
export const Success = styled.span`
  color: green;
`;
