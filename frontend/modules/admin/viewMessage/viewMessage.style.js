import styled from "styled-components";

export const Header = styled.div`
  line-height: 20px;
  font-size: 1rem;
`;

export const CloseModal = styled.div`
  color: rgb(255 74 82);
  text-align: center;

  &: hover {
    cursor: pointer;
  }
`;

export const Span = styled.span`
  text-decoration: underline;
  &: hover {
    cursor: pointer;
  }
`;

export const Date = styled.span`
  font-weight: 200;
  font-style: italic;
  padding-bottom: 1rem;
`;
