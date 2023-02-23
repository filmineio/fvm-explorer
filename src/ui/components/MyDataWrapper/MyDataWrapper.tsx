import { PropsWithChildren } from "react";

import { MyDataHeader } from "@/ui/components/MyDataWrapper/MyDataHeader";
import { MyDataSidebar } from "@/ui/components/MyDataWrapper/MyDataSidebar";

import { Maybe } from "@/types/Maybe";

export enum MyDataKind {
  Projects,
  Queries,
}

export const MyDataWrapper = ({
  kind,
  activeEntity,
  children,
}: PropsWithChildren<{ kind: MyDataKind; activeEntity?: Maybe<string> }>) => {
  return (
    <>
      <MyDataHeader kind={kind} activeEntity={activeEntity} />
      <main>
        <div className="sm:flex flex-wrap">
          <MyDataSidebar kind={kind} />
          <div className="container mx-auto px-4 2xls:px-20">
            <div>{children}</div>
          </div>
        </div>
      </main>
    </>
  );
};