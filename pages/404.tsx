import Link from "next/link";
import { ReactElement } from "react";

import { Page } from "@/ui/components/Page/Page";

import PageNotFoundIcon from "@/ui/components/Common/Icons/PageNotFoundIcon";

export default function Error404Route(): ReactElement {
  return (
    <Page showHeader showFooter>
      <div className="w-full min-h-fit-vertically flex justify-center">
        <div className="flex flex-col justify-center mb-10%">
          <PageNotFoundIcon/>
          <span className="mt-16 font-space text-white text-center text-28 font-bold">
            Page not found
          </span>
          <Link href={"/"}>
            <span className="mt-7.5 text-blue-400 text-center text-16 leading-none cursor-pointer">
              Back to Homepage
            </span>
          </Link>
        </div>
      </div>
    </Page>
  );
}
