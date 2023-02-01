import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { MagicUserMetadata } from "magic-sdk";

import {
  BlockQueryFields,
  ContractQueryField,
  TransactionQueryFields,
} from "@/ui/modules/Filters/state/state";

import { DataResult } from "@/types/DataResult";
import { Maybe } from "@/types/Maybe";

export type User = Maybe<MagicUserMetadata>;

export type Data = Record<"results", DataResult> &
  Record<"receivedServerData", Maybe<number>> &
  Record<"loading", boolean> &
  Record<"error", string>;

export type QueryField =
  | BlockQueryFields
  | ContractQueryField
  | TransactionQueryFields;

export type QueryGroup = Record<QueryField, CHMFieldQuery>;
export type AdvancedFiltersState<M = unknown> = Maybe<QueryGroup[]>;

export type FilterState = {
  filteredBy: Entity;
  filterValue: string;
  advancedFilter: AdvancedFiltersState;
  network: Network;
  page: number;
};

export type AppState = {
  user: User;
  data: Data;
  filters: FilterState;
};