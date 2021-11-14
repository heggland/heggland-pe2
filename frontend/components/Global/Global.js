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
    overflow: hidden;
}

body > #__next {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: fixed; 
  overflow-y:scroll;

  & ::-webkit-scrollbar {
    width: 10px;
  }

  & ::-webkit-scrollbar-track {
    background: rgb(240, 240, 240);
  }

  & ::-webkit-scrollbar-thumb {
    background: rgb(135, 135, 135);
    border-radius: 10px;
  }

  & ::-webkit-scrollbar-thumb:hover {
    background: rgb(84, 84, 84);
  }
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
