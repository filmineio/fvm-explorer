import { TabHeader } from "@/ui/components/TabHeader/TabHeader";

import { Transaction } from "@/types/data/Transaction";

export const TransactionPageTabHeaders = ({
  activeTab,
  transaction,
  toggle,
}: {
  toggle: (value: ((prevState: number) => number) | number) => void;
  activeTab: number;
  transaction: Transaction;
}) => {
  return (
    <ul className="nav nav-tabs flex justify-end  md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4 md:-mt-0 -mt-8">
      <TabHeader
        tabIndex={0}
        activeTab={activeTab}
        toggle={toggle}
        label={"Overview"}
      />
      <TabHeader
        tabIndex={1}
        activeTab={activeTab}
        toggle={toggle}
        label={"Internal Transactions"}
      />
      {transaction.messageRctEventsRoot && (
        <TabHeader
          tabIndex={2}
          activeTab={activeTab}
          toggle={toggle}
          label={"Events"}
        />
      )}
    </ul>
  );
};