import { Footer } from "./Footer/Footer";
import { HeaderComponents } from "./Header";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { FC } from "react";

export type PageProps = {
  title?: string;
  children?: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
};

export const Page: FC<PageProps> = ({
  title = "Filmine Explorer",
  children,
  showHeader,
  showFooter,
}) => {
  const router = useRouter();

  return (
    <div
      className={"h-screen w-full"}
      style={{ animation: "fadeInAnimation .4s ease-in" }}
    >
      <Head>
        <meta charSet="UTF-8" />
        <title>{title}</title>
      </Head>

      {showHeader && <HeaderComponents.Header />}
      {children}
      {showFooter && <Footer />}
    </div>
  );
};