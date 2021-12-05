import styled, { css } from "styled-components";
import { md } from "../Global/Breakpoints";
import * as Colors from "../../constants/colors";

export const Card = styled.div`
  background-color: white;
  margin: 10px 10px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 2px 20px rgb(227 233 243);
  padding: 10px 20px;

  &:hover {
    box-shadow: 0 10px 20px rgb(0 0 0 / 10%);
    transform: translateY(-1px);
    transition: 0.3s;
  }

  ${md} {
    margin: 10px 10px;
  }

  ${({ opacity }) =>
    opacity &&
    css`
      opacity: ${Number(opacity)};
    `}
`;

export const Head = styled.div`
  height: 200px;
`;

export const Image = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

export const Content = styled.div`
  min-height: 100px;
  margin: 15px;
  padding-bottom: 15px;
`;

export const Heading = styled.div`
  height: 70px;
  display: flex;
  align-items: center;

  ${Card}:hover & {
    color: ${Colors.blue};
  }
`;

export const Text = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: rgb(122 131 139);
  margin-top: 3px;
  margin-bottom: 8px;
`;
