import { getDefaultFilters } from "../../filters/getDefaultFilters";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { isEmpty } from "ramda";

import { AppQuery } from "@/types/AppQuery";

import { getZeroIndexOffset } from "@/utils/getZeroIndexOffset";

export const filtersToResourceQuery = (
  resource: Entity,
  network: Network,
  query: AppQuery<unknown>
) => {
  const dataQuery = getDefaultFilters(resource, network, query.filterValue);

  if (query.advancedFilter && !isEmpty(query.advancedFilter)) {
    dataQuery.query = query.advancedFilter as Record<string, CHMFieldQuery>;
  }

  if (dataQuery.pagination)
    dataQuery.pagination.offset = getZeroIndexOffset(query.page);
  return dataQuery;
};