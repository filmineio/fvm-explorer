import { QueryPagination } from "@/types/QueryPagination";

export const addPagination = (query: string, pagination?: QueryPagination) => {
  if (!pagination) return query;

  return (
    query + ` limit ${pagination.limit ?? 50} offset ${pagination.offset ?? 0}`
  );
};
