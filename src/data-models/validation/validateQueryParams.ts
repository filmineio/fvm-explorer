import { validateOrderBy } from "./validateOrderBy";
import { validatePagination } from "./validatePagination";
import { validateQuery } from "./validateQuery";
import { validateSelection } from "./validateSelection";
import { Entity } from "@/enums/Entity";
import { CHModel } from "@/schema/types/CHModel";
import { QuerySchema } from "@/schema/types/QuerySchema";

export const validateQueryParams = <T = CHModel<unknown>>(
  entityKind: Entity,
  query: QuerySchema
) => {
  validateQuery(query.query, entityKind);
  validateSelection(query.selection, entityKind);
  validatePagination(query.pagination);
  validateOrderBy(query.order, entityKind);
};