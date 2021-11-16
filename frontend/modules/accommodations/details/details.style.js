import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(228 230 233);
  margin-bottom: 30px;
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
  background-color: grey;
  border: none;
  color: white;
  padding: 10px 25px;
  margin-top: 30px;
  width: fit-content;

  &:hover {
    cursor: pointer;
  }
`;
