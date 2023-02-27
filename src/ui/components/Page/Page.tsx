import { Footer } from "./Footer/Footer";
import { HeaderComponents } from "./Header";
import Head from "next/head";
import React, { FC } from "react";

export type PageProps = {
  title?: string;
  children?: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
};

export const Page: FC<PageProps> = ({
  title = "DevStorage",
  children,
  showHeader,
  showFooter,
}) => {
  const description = 'Filecoin network explorer';
  const link = 'https://explorer.filmine.io';
  const metaImageLink = '';

  return (
    <div
      className={"h-screen w-full"}
      style={{ animation: "fadeInAnimation .4s ease-in" }}
    >
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Alt Labs d.o.o." />
        <meta name="keywords" content="Web3, Explorer, Decentralized, Filecoin, Smart contracts" />
        <meta name="theme-color" content="#000000" />
        <meta name="title" content={title} key="metaTitle" />
        <meta name="description" content={description} key="metaDescription" />
        <link rel="canonical" href={link} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={link} key="metaOGUrl" />
        <meta property="og:title" content={title} key="metaOGTitle" />
        <meta property="og:description" content={description} key="metaOGDescription" />
        <meta property="og:image" content={metaImageLink} key="metaOGImage" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={link} key="metaTwitterUrl" />
        <meta property="twitter:title" content={title} key="metaTwitterTitle" />
        <meta property="twitter:image" content={metaImageLink} key="metaTwitterImage" />
        <meta property="twitter:description" content={description} key="metaTwitterDescription" />
      </Head>

      {showHeader && <HeaderComponents.Header />}
      {children}
      {showFooter && <Footer />}
    </div>
  );
};