import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${({ bg_color }) => bg_color};
  margin-top: ${({ margin }) => margin}px;
  padding-bottom: ${({ padding_bottom }) => padding_bottom}px;
  margin-bottom: ${({ margin }) => margin}px;
  border-bottom: ${({ border_size }) => border_size}px solid
    ${({ border_color }) => border_color};
`;

export const Col = styled.div`
  width: calc(calc(100% / 12) * ${({ size }) => size || 12});
`;

export const Placement = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  text-align: ${({ align }) => align};
`;

export const P = styled.p`
  font-weight: ${({ weight }) => weight};
  padding-left: ${({ padding_left }) => padding_left}px;
`;

export const Span = styled.span`
  font-weight: ${({ weight }) => weight};
  padding-left: ${({ padding_left }) => padding_left}px;
`;

export const Button = styled.button`
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "transparent"};
  color: ${({ color }) => color || "black"};
  padding: ${({ padding }) => padding};
  border: none;

  &:hover {
    cursor: pointer;
  }
`;
