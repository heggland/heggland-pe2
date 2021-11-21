import styled from "styled-components";
import * as colors from "../../../constants/colors";

export const Container = styled.div`
  height: 40px;
  font-size: 1.1rem;
  color: black;
  font-weight: 400;
  display: flex;
  background-color: white;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
  width: 200px;
  margin: 0px auto;
  pointer-events: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 2px solid ${colors.blue};

  z-index: 1;

  animation: dropdown 0.5s ease-in-out;
  @keyframes dropdown {
    0% {
      transform: translateY(-5rem);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;
