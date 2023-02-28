import { ReactElement } from "react";

import {
  MyDataKind,
  MyDataWrapper,
} from "@/ui/components/MyDataWrapper/MyDataWrapper/MyDataWrapper";
import { Page } from "@/ui/components/Page/Page";
import { META_PAGE_TITLE_DASHBOARD } from "@/constants/global";

export default function Editor(): ReactElement {
  return (
    <Page title={META_PAGE_TITLE_DASHBOARD}>
      <MyDataWrapper kind={MyDataKind.Queries}>
        <div
          className={
            "w-full min-h-calc flex  justify-center items-center gap-24 text-white"
          }
        >
          <h1>Editor</h1>
        </div>
      </MyDataWrapper>
    </Page>
  );
}