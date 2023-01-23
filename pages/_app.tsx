import "../src/ui/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { GoogleAnalytics } from "nextjs-google-analytics";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";

import Store from "@/ui/state/Store";

dynamic(import("tw-elements"), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Store>
      <ToastContainer theme={"dark"} hideProgressBar={true} />
      <GoogleAnalytics trackPageViews />
      <NextNProgress nonce="my-nonce" color={"#add442"} showOnShallow={true} />
      <Component {...pageProps} />
    </Store>
  );
}

export default appWithTranslation(MyApp);