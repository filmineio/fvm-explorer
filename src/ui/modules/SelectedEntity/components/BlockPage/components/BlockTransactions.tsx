import { PAGE_SIZE } from "@/constants/pagination";
import { Network } from "@/enums/Network";

import { Pagination } from "@/ui/components/Pagination/Pagination";
import { SearchFeedback } from "@/ui/components/SearchFeedback";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { BlockTransactionRow } from "@/ui/modules/SelectedEntity/components/BlockPage/components/BlockTransactionRow";

import { Transaction } from "@/types/data/Transaction";


export const BlockTransactions = ({
  transactions,
  paginate,
  network,
  page,
  total,
  loading,
}: {
  transactions: Transaction[];
  paginate: (page: number) => void;
  network: Network;
  page: number;
  total: number;
  loading: boolean;
}) => {
  return (
    <div className=" py-2.5 mt-8 relative">
      <p className="text-white mt-0 lg:mt-7 font-bold leading-5 text-2xl">
        Block transactions
      </p>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-2 inline-block min-w-full ">
            <div className="overflow-hidden">
              <table className="min-w-full text-center border-0 border-separate border-spacing-y-3.5	">
                <thead>
                  <tr className="bg-body border-0  ">
                    <th
                      scope="col"
                      className=" w-1/6 rounded-l-lg text-left border-0 text-xs font-bold text-white px-6 py-4"
                    >
                      TRANSACTION HASH
                    </th>
                    <th
                      scope="col"
                      className="w-1/6 border-0 text-left text-xs font-bold text-white px-6 py-4"
                    >
                      METHOD
                    </th>
                    <th
                      scope="col"
                      className="w-1/6 border-0 text-left text-xs font-bold text-white px-6 py-4"
                    >
                      STATUS
                    </th>
                    <th
                      scope="col"
                      className="w-1/6 border-0 text-left text-xs font-bold text-white px-6 py-4"
                    >
                      GAS COST
                    </th>
                    <th
                      scope="col"
                      className="w-1/6  border-0 text-left rounded-r-lg text-xs font-bold text-white px-6 py-4"
                    >
                      VALUE
                    </th>
                  </tr>
                </thead>
                {loading ? (
                  <tbody className={"transform translate-y-4 text-label"}>
                    <tr>
                      <td colSpan={6} className={"pb-6"}>
                        <Spinner />
                      </td>
                    </tr>
                  </tbody>
                ) : total === 0 ? (
                  <tbody className={"transform translate-y-4"}>
                    <tr>
                      <td colSpan={5} className={"pb-6"}>
                        <SearchFeedback />
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {transactions.map((transaction) => (
                      <BlockTransactionRow
                        key={transaction.cid}
                        transaction={transaction}
                        network={network}
                      />
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        paginate={paginate}
        page={page}
        pageSize={PAGE_SIZE}
        total={total}
      />
    </div>
  );
};