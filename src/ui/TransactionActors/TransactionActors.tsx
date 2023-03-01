import { Transaction } from "@/types/data/Transaction";
import CopyText from "@/ui/components/CopyText/CopyText";

export const TransactionActors = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  return (
    <div className="flex mt-5 flex-wrap items-center gap-2">
      <button className="relative">
        <CopyText text={transaction.robustFrom || transaction.from}>
          <span className="bg-body py-2 px-3 rounded-4 text-yellow-500 font-bold text-14 leading-5 overflow-hidden truncate max-w-[250px]">{transaction.robustFrom || transaction.from}</span>
        </CopyText>
      </button>
      <button className="px-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </button>

      <button className="relative ml-12">
        <CopyText text={transaction.robustTo || transaction.to}>
          <span className="bg-body py-2 px-3 rounded-4 text-yellow-500 font-bold text-14 leading-5 overflow-hidden truncate max-w-[250px]">{transaction.robustTo || transaction.to}</span>
        </CopyText>
      </button>
    </div>
  );
};