import { transformer } from "@/ui/state/utils/transformer";

export const setDataErrorTransformer = transformer<string>("data", "error");