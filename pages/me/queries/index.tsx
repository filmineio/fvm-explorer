import { ReactElement, useEffect, useState } from "react";

import {
  MyDataKind,
  MyDataWrapper,
} from "@/ui/components/MyDataWrapper/MyDataWrapper/MyDataWrapper";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { GraphQLEditor } from "@/ui/modules/GraphQl/GraphQLEditor";

import { cb } from "@/utils/cb";


export default function Queries(): ReactElement {
  const [loaded, setLoaded] = useState(false);

  useEffect(cb(setLoaded, true), []);

  if (!loaded)
    return (
      <MyDataWrapper kind={MyDataKind.Queries}>
        <div className=" all px-0 max-w-[90%] pl-[2%] justify-self-center mx-auto pt-20 pb-10 min-h-calc text-gray-text">
          <Spinner />
        </div>
      </MyDataWrapper>
    );

  return (
    <MyDataWrapper kind={MyDataKind.Queries}>
      <div className="max-w-1xl mx-auto p-10 relative">
        <div className={"text-2xl text-white mb-4"}>My Queries</div>
        <GraphQLEditor />
      </div>
    </MyDataWrapper>
  );
}