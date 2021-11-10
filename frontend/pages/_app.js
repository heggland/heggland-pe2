import GlobalStyle from "../components/Global/Global";
import { AuthProvider } from "../context/AuthContext";

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
