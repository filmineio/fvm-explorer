import { ReactElement } from "react";

import {
  MyDataKind,
  MyDataWrapper,
} from "@/ui/components/MyDataWrapper/MyDataWrapper";

export default function Queries(): ReactElement {
  return (
    <MyDataWrapper kind={MyDataKind.Queries}>
      <div
        className={
          "w-full min-h-calc flex  justify-center items-center gap-24 text-white"
        }
      >
        <h1>Queries</h1>
      </div>
    </MyDataWrapper>
  );
}