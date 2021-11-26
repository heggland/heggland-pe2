import styled from "styled-components";
import * as Breakpoints from "../../../components/Global/Breakpoints";
import * as Colors from "../../../constants/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(228 230 233);
  margin-bottom: 30px;

  ${Breakpoints.md} {
    & > * {
      padding: 1% 0 0 0;
    }
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;

export const Text = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 24px;
  color: rgb(122 131 139);
  margin-bottom: 0px;
  margin-top: 1px;
`;

export const CloseModal = styled.div`
  color: rgb(255 74 82);
  position: absolute;
  top: 3%;
  right: 5%;

  &: hover {
    cursor: pointer;
  }
`;

export const OrderButton = styled.button`
  background-color: rgb(45 148 0 / 85%);
  border: none;
  color: white;
  padding: 10px 25px;
  margin-top: 30px;
  width: fit-content;
  font-size: 1.5rem;

  &:hover {
    cursor: pointer;
  }
`;
