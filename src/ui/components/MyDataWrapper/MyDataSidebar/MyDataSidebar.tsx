import classNames from "classnames";
import Link from "next/link";
import { MyDataKind } from "@/ui/components/MyDataWrapper/MyDataWrapper/MyDataWrapper";

import styles from './MyDataSidebar.module.scss';
import Folder from "@/ui/components/Common/Icons/Folder";
import DatabaseSearch from "@/ui/components/Common/Icons/DatabaseSearch";
import clsx from "clsx";

export const MyDataSidebar = ({ kind }: { kind: MyDataKind }) => {
  return (
    <div className={styles['my-data-sidebar-wrapper']}>
      <ul>
        <li
          className={classNames(styles['sidebar-item-wrapper'], {
            [styles.active]: kind === MyDataKind.Projects,
          })}
        >
          <Link href="/me/projects">
            <div className={clsx(styles['sidebar-item'], styles.folder)}>
              <Folder />
            </div>
          </Link>
        </li>
        <li
          className={classNames(styles['sidebar-item-wrapper'], {
            [styles.active]: kind === MyDataKind.Queries,
          })}
        >
          <Link href="/me/queries">
            <div className={clsx(styles['sidebar-item'], styles['database-search'])}>
              <DatabaseSearch />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};