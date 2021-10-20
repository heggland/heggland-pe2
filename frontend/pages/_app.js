import { createGlobalStyle } from "styled-components";
import { AuthProvider } from "../context/AuthContext";

const GlobalStyle = createGlobalStyle`
html,
body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
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

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
};

export default MyApp;
