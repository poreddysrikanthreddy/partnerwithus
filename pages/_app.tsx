import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import "../styles/custom.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/spinner.css";
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
     <NextNProgress 
        color="#29D"
        options={{ showSpinner: false }}
      /> 
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
