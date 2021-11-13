import styled from "styled-components";

export const Form = styled.form``;

export const Input = styled.input`
  width: 100%;
  border-top: 0 !important;
  border-left: 0 !important;
  border-right: 0 !important;

  & :focus {
    outline: none;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  border-top: 0 !important;
  border-left: 0 !important;
  border-right: 0 !important;
  resize: none;
  height: 100px;
  overflow: hidden;

  & :focus {
    outline: none;
  }
`;

export const Error = styled.span`
  color: red;
`;
export const Success = styled.span`
  color: green;
`;

export const Group = styled.div``;
