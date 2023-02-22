import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";

import { Transaction } from "@/types/data/Transaction";

export const TransactionActors = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  return (
    <div className="xs:flex mt-3 flex-wrap justify-center sm:justify-start items-center">
      <button className="bg-secect mb-2 py-2 px-3 rounded-base text-analogous font-bold font-space text-sm	tracking-wider	leading-5 relative">
        <CopyWrapper data={transaction.robustFrom || transaction.from}>
          {transaction.robustFrom || transaction.from}
        </CopyWrapper>
      </button>
      <button className="p-2 mb-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="w-6 h-6 transform translate-y-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </button>

      <button className="bg-secect mb-2  py-2 px-3 rounded-base text-yellow font-bold font-space text-sm	tracking-wider	leading-5 relative">
        <CopyWrapper data={transaction.robustTo || transaction.to}>
          {transaction.robustTo || transaction.to}
        </CopyWrapper>
      </button>
    </div>
  );
};