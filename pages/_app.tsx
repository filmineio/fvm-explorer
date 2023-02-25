import "../src/ui/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Script from "next/script";
import { GoogleAnalytics } from "nextjs-google-analytics";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import Store from "@/ui/state/Store";

import { uiCtx } from "@/ui/ctx/uiCtx";
import { useAuthApiClient } from "@/ui/external/auth";

dynamic(import("tw-elements" as never), { ssr: false });

const PostHog = () => {
  return (
    <>
      <Script id="post-hog" strategy="afterInteractive">
        {` 
        !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('phc_wWZp0284i99lujqPAyCZzmSZUzV1SUL3smsnWXdejan',{api_host:'https://app.posthog.com'}) 
       `}
      </Script>
    </>
  );
};

function Auth() {
  const { me } = useAuthApiClient();

  useEffect(() => {
    const user = uiCtx.auth().user;
    !!user && me();
  }, []);

  return <></>;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Store>
      <Auth />
      <ToastContainer theme={"dark"} hideProgressBar={true} />
      <GoogleAnalytics trackPageViews />
      {/*<PostHog />*/}
      <NextNProgress nonce="my-nonce" color={"#add442"} showOnShallow={true} />
      <Component {...pageProps} />
    </Store>
  );
}

export default appWithTranslation(MyApp);