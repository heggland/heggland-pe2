import styled, { css } from "styled-components";

const Button = styled.div`
  ${({ values }) =>
    values.hasOwnProperty("backgroundColor") &&
    css`
    background-color: ${values.backgroundColor};
}
`}
  ${({ values }) =>
    (values.hasOwnProperty("border") &&
      css`
border: ${values.border && values.border};
} 
`) ||
    css`
      border: none;
    `} }

${({ values }) =>
  values.hasOwnProperty("color") &&
  css`
color: ${values.color && values.color};
} 
`}

${({ values }) =>
  values.hasOwnProperty("margin") &&
  css`
    margin-top: ${margin}px;
    margin-bottom: ${margin}px;
} 
`}

${({ values }) =>
  values.hasOwnProperty("padding") &&
  css`
    padding: ${values.padding};
} 
`}

${({ values }) =>
  values.hasOwnProperty("width") &&
  css`
    width: ${values.width}%;
}
`}

&:hover {
    cursor: pointer;
  }
`;

export default Button;
