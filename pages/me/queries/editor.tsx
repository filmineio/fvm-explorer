import { ReactElement } from "react";

import {
  MyDataKind,
  MyDataWrapper,
} from "@/ui/components/MyDataWrapper/MyDataWrapper";

export default function Editor(): ReactElement {
  return (
    <MyDataWrapper kind={MyDataKind.Queries}>
      <div
        className={
          "w-full min-h-calc flex  justify-center items-center gap-24 text-white"
        }
      >
        <h1>Editor</h1>
      </div>
    </MyDataWrapper>
  );
}