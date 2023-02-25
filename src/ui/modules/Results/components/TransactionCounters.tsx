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
    <div className="flex mt-10">
      <div className="w-full xs:w-1/2 lg:w-7/12 pr-3">
        <p className="text-14 text-label font-medium mb-2.5">
          successful txns
        </p>
        <p className="text-14 text-white">
          {loading ? <Spinner inline /> : error ? "--" : ok}
        </p>
      </div>

      <div className="w-full xs:w-1/2 lg:w-5/12 mt-0">
        <p className="text-14 text-label font-medium mb-2.5">
          failed txns
        </p>
        <p className="text-14 text-white">
          {loading ? <Spinner inline /> : error ? "--" : reverted}
        </p>
      </div>
    </div>
  );
};