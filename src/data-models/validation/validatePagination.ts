import { QueryPagination } from "@/types/QueryPagination";

export const validatePagination = (pagination: QueryPagination) => {
  let validLimit =
    typeof pagination?.limit === "number" &&
    pagination.limit > 0 &&
    pagination.limit <= 1000;
  let validOffset =
    typeof pagination?.limit === "number" &&
    pagination.limit >= 0 &&
    pagination.limit < Number.MAX_SAFE_INTEGER;

  if (!validLimit || !validOffset) throw "INVALID_PAGINATION";
};