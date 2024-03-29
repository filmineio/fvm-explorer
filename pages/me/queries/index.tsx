import { ReactElement, useEffect, useState } from "react";

import {
  MyDataKind,
  MyDataWrapper,
} from "@/ui/components/MyDataWrapper/MyDataWrapper/MyDataWrapper";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { GraphQLEditor } from "@/ui/modules/GraphQl/GraphQLEditor";

import { cb } from "@/utils/cb";
import { Page } from "@/ui/components/Page/Page";
import { META_PAGE_TITLE_DASHBOARD } from "@/constants/global";


export default function Queries(): ReactElement {
  const [loaded, setLoaded] = useState(false);

  useEffect(cb(setLoaded, true), []);

  const pageContent = () => {
    return (!loaded) ? (
      <div className=" all px-0 max-w-[90%] pl-[2%] justify-self-center mx-auto pt-20 pb-10 min-h-calc text-gray-text">
        <Spinner />
      </div>
    ) : (
      <div className="max-w-1xl mx-auto p-10 relative">
        <h3 className="text-24 text-white mb-4 font-space">My queries</h3>
        <GraphQLEditor />
      </div>
    )
  }

  return (
    <Page title={META_PAGE_TITLE_DASHBOARD}>
      <MyDataWrapper kind={MyDataKind.Queries}>
        {pageContent()}
      </MyDataWrapper>
    </Page>
  );
}