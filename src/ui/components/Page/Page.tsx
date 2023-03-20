import { Footer } from "./Footer/Footer";
import { HeaderComponents } from "./Header";
import Head from "next/head";
import React, { FC } from "react";
import { META_IMAGE_URL, META_PAGE_DESCRIPTION, META_PAGE_TITLE, META_PAGE_URL } from "@/constants/global";

export type PageProps = {
  title?: string;
  children?: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
};

export const Page: FC<PageProps> = ({
  title = META_PAGE_TITLE,
  children,
  showHeader,
  showFooter,
}) => {
  const description = META_PAGE_DESCRIPTION;
  const url = META_PAGE_URL;
  const metaImageLink = META_IMAGE_URL;

  return (
    <div
      className="min-h-screen w-full flex flex-col"
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
        <link rel="canonical" href={url} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} key="metaOGUrl" />
        <meta property="og:title" content={title} key="metaOGTitle" />
        <meta property="og:description" content={description} key="metaOGDescription" />
        <meta property="og:image" content={metaImageLink} key="metaOGImage" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} key="metaTwitterUrl" />
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