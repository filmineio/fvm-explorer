import { Entity } from "@/enums/Entity";
import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { CHModel } from "@/schema/types/CHModel";

import { QueryPagination } from "@/types/QueryPagination";

export type QueryOrder<M = CHModel<unknown>> = [keyof M, "ASC" | "DESC"];
export type QuerySchema<M = CHModel<unknown>> = {
  fieldName: Entity;
  query: Record<keyof M, CHMFieldQuery>[];
  selection: (keyof M)[];
  order: QueryOrder;
  pagination: QueryPagination;
};
export type SchemaValidation<M = CHModel<unknown>> = {
  validateQueryParams: <T = CHModel<unknown>>(
    entityKind: Entity,
    query: QuerySchema
  ) => void;
};