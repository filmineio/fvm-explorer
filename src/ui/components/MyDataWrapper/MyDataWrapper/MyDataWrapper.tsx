import { PropsWithChildren } from "react";

import { MyDataHeader } from "@/ui/components/MyDataWrapper/MyDataHeader";
import { MyDataSidebar } from "@/ui/components/MyDataWrapper/MyDataSidebar/MyDataSidebar";

import { Maybe } from "@/types/Maybe";

import styles from './MyDataWrapper.module.scss';

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
      <main>
        <div className={styles['my-data-wrapper']}>
          <MyDataHeader kind={kind} activeEntity={activeEntity} />
          <div className={styles['my-data-inner']}>
            <MyDataSidebar kind={kind} />
            <div className={styles['my-data-content']}>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};