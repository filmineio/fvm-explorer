import { transformer } from "@/ui/state/utils/transformer";

import { DataResult } from "@/types/DataResult";

export const setDataResultsTransformer = transformer<DataResult>(
  "data",
  "results"
);