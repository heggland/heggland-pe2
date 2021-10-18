import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Layout/Footer";
import { AuthProvider } from "../../../js-frameworks-module-assignment-3-heggland/client/src/context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer />
    </AuthProvider>
  );
}
export default MyApp;
