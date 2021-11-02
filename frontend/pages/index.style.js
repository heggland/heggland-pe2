import styled from "styled-components";

export const AboveFold = styled.div`
  height: calc(100vh - 70px);
`;

export const Heading = styled.div`
  & > * {
    height: 650px;
    width: 100%;
  }
`;

export const SearchForm = styled.div`
  background-color: rgb(4 14 39);
  color: white;
  height: 150px;
  display: flex;
  align-items: center;
`;

export const Featured = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  place-content: center;
`;
