import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html,
body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    
    overflow: ${(props) => props.hidden === true && "hidden"};
}

body > :first-child {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.wrapper {
  flex: 1 0 auto;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
`;

export default GlobalStyle;
