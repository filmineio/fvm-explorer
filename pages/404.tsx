import Link from "next/link";
import { ReactElement } from "react";

import { Page } from "@/ui/components/Page/Page";

export default function Error404Route(): ReactElement {
  return (
    <Page showHeader showFooter>
      <div
        className={"w-full min-h-calc flex  justify-center items-center gap-24"}
      >
        <div className={"flex flex-col gap-8"}>
          <h1 className={"text-white text-3xl font-semibold"}>
            Error 404 - Page Not Found
          </h1>
          <Link href={"/"}>
            <span className={"text-white text-blue-400 cursor-pointer"}>
              Back to Homepage
            </span>
          </Link>
        </div>
        <img src="/images/404illustration2.svg" alt="" />
      </div>
    </Page>
  );
}