import { transformer } from "@/ui/state/utils/transformer";

export const setDataLoadingTransformer = transformer<boolean>(
  "data",
  "loading"
);