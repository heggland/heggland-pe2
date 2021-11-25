import styled, { css } from "styled-components";
import * as Breakpoints from "../../components/Global/Breakpoints";
import * as Colors from "../../constants/colors";

export const Card = styled.div`
  background-color: white;
  margin: 10px 0;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 2px 20px rgb(227 233 243);
  padding: 10px 20px;

  &:hover {
    box-shadow: 0 10px 20px rgb(0 0 0 / 10%);
    cursor: pointer;
    & > * > * > :first-child {
      color: ${Colors.blue};
    }
  }

  display: flex;
  flex-direction: column;

  ${Breakpoints.md} {
    display: flex;
  }
  margin-top: 25px;
  margin-bottom: 25px;
`;

export const Group = styled.div`
  display: flex;
`;

export const Image = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  ${Breakpoints.sm} {
    width: 80%;
  }
`;
