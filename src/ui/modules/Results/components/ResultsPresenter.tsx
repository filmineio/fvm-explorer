import { PAGE_SIZE } from "@/constants/pagination";

import { SearchFeedback } from "@/ui/components/SearchFeedback";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { Results } from "@/ui/modules/Results/Results";

import { DataResult } from "@/types/DataResult";


export const ResultsPresenter = ({
  error,
  results,
  loading,
  page,
  paginate,
}: {
  error: string;
  loading: boolean;
  results: DataResult;
  paginate: (page?: number) => void;
  page: number;
}) => {
  if (error) return <SearchFeedback kind={results.kind} error />;
  if (loading)
    return (
      <div className="text-lightgray">
        <Spinner />
      </div>
    );
  if (results.total === 0) return <SearchFeedback kind={results.kind} />;

  return (
    <Results
      paginate={paginate}
      page={page}
      pageSize={PAGE_SIZE}
      data={results}
    />
  );
};