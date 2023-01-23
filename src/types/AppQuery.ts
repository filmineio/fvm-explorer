import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { QueryOrder } from "@/schema/types/QuerySchema";

import { QueryPagination } from "@/types/QueryPagination";

export type AppQuery<T = unknown> = Partial<{
  filterValue: string;
  filteredBy: Entity;
  page: number;
  advancedFilter: T;
  network: Network;
  pagination?: QueryPagination;
  order?: QueryOrder;
}>;

export type ResourceQuery<T = unknown> = {
  network: Network;
  selection?: string[];
  query?: Record<string, CHMFieldQuery> | Record<string, CHMFieldQuery>[];
  pagination?: QueryPagination;
  order?: QueryOrder;
};