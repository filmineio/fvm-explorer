import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"true"}
        />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
        <link rel="icon" sizes="16x16 32x32 64x64" href="/images/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="196x196" href="/images/favicon/favicon-192.png" />
        <link rel="icon" type="image/png" sizes="160x160" href="/images/favicon/favicon-160.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon/favicon-96.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon/favicon-64.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16.png" />
        <link rel="apple-touch-icon" href="/images/favicon/favicon-57.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/images/favicon/favicon-114.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/images/favicon/favicon-72.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/images/favicon/favicon-144.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/images/favicon/favicon-60.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/images/favicon/favicon-120.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/images/favicon/favicon-76.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/images/favicon/favicon-152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/favicon-180.png" />
        <meta name="msapplication-TileColor" content="#596184" />
        <meta name="msapplication-TileImage" content="/images/favicon/favicon-144.png" />
        <meta name="msapplication-config" content="/images/favicon/browserconfig.xml" />
      </Head>
      <body className={"h-full box-border"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
