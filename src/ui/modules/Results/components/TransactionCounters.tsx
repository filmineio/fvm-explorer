import { Spinner } from "@/ui/components/Spinner/Spinner";

export const TransactionCounters = ({
  ok,
  reverted,
  loading,
  error,
}: {
  ok: number;
  reverted: number;
  loading: boolean;
  error: boolean;
}) => {
  return (
    <div className="flex mt-4">
      <div className="w-full xs:w-1/2 lg:w-7/12 pr-3">
        <div className="bg-yellow p-2 rounded-lg">
          <h4 className="text-lg font-bold text-black	tracking-widest	font-mono1">
            {loading ? <Spinner inline /> : error ? "--" : ok}
          </h4>
          <p className="text-gray-text text-sm font-normal font-sans1	">
            successful txns
          </p>
        </div>
      </div>

      <div className="w-full xs:w-1/2 lg:w-5/12 mt-0">
        <div className="bg-black p-2 rounded-lg">
          <h4 className="text-lg font-bold text-white	tracking-widest	font-mono1">
            {loading ? <Spinner inline /> : error ? "--" : reverted}
          </h4>
          <p className="text-gray-text text-sm font-normal font-sans1">
            failed txns
          </p>
        </div>
      </div>
    </div>
  );
};