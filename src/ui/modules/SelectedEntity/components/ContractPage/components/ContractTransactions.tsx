import { PAGE_SIZE } from "@/constants/pagination";
import { Network } from "@/enums/Network";

import { Pagination } from "@/ui/components/Pagination/Pagination";
import { SearchFeedback } from "@/ui/components/SearchFeedback";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { ContractTransactionRow } from "@/ui/modules/SelectedEntity/components/ContractPage/components/ContractTransactionRow";

import { Contract } from "@/types/data/Contract";
import { Transaction } from "@/types/data/Transaction";

export const ContractTransactions = ({
  contract,
  transactions,
  paginate,
  network,
  page,
  total,
  loading,
}: {
  contract: Contract;
  transactions: Transaction[];
  paginate: (page: number) => void;
  network: Network;
  page: number;
  total: number;
  loading: boolean;
}) => {
  return (
    <div className="flex flex-col">
      <div className="w-full overflow-auto">
        <table className="text-center border-0 border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-body border-0">
              <th
                scope="col"
                className="w-1/6 rounded-4004 border-0 text-left font-14 leading-4 font-bold text-white px-6 py-4"
              >
                TRANSACTION HASH
              </th>
              <th
                scope="col"
                className="w-1/6 border-0 text-left font-14 leading-4 font-bold text-white px-6 py-4"
              >
                METHOD
              </th>
              <th
                scope="col"
                className="w-1/6 border-0 text-left font-14 leading-4 font-bold text-white px-6 py-4"
              >
                EPOCH
              </th>
              <th
                scope="col"
                className="w-1/6 border-0 text-left font-14 leading-4 font-bold text-white px-6 py-4"
              >
                STATUS
              </th>
              <th
                scope="col"
                className="w-1/6 border-0 text-left font-14 leading-4 font-bold text-white px-6 py-4"
              >
                GAS COST
              </th>
              <th
                scope="col"
                className="w-1/6 rounded-0440 border-0 text-left font-14 leading-4 font-bold text-white px-6 py-4"
              >
                VALUE
              </th>
            </tr>
          </thead>
          {loading ? (
            <tbody className={"before:block text-label"}>
              <tr>
                <td colSpan={6} className={"pb-6"}>
                  <Spinner />
                </td>
              </tr>
            </tbody>
          ) : total === 0 ? (
            <tbody className={"before:block"}>
              <tr>
                <td colSpan={6} className={"pb-6"}>
                  <SearchFeedback />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className={"before:block"}>
              {transactions.map((transaction) => (
                <ContractTransactionRow
                  key={transaction.cid}
                  transaction={transaction}
                  network={network}
                  contract={contract}
                />
              ))}
            </tbody>
          )}
        </table>
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