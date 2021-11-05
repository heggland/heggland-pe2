import styled from "styled-components";
import { xs, sm, lg, md } from "../../styles/breakpoints";

export const Card = styled.div`
  background-color: white;
  margin: 10px 0;
  border-radius: 5px;

  &:hover {
    box-shadow: 0 10px 20px rgb(0 0 0 / 4%);
  }

  ${md} {
    margin: 10px 10px;
  }
`;

export const Image = styled.img`
  height: 250px;
  width: 100%;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

export const Content = styled.div`
  min-height: 100px;
  margin: 15px;
  padding-bottom: 15px;
`;

export const Heading = styled.div`
  ${Card}:hover & {
    color: rgb(255 74 82);
  }
`;

export const Text = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: rgb(122 131 139);
  margin-top: 3px;
  margin-bottom: 8px;
`;
