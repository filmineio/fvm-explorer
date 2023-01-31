import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { MagicUserMetadata } from "magic-sdk";

import { DataResult } from "@/types/DataResult";
import { FieldQuery } from "@/types/FieldQuery";
import { Maybe } from "@/types/Maybe";

export type User = Maybe<MagicUserMetadata>;

export type Data = Record<"results", DataResult> &
  Record<"receivedServerData", Maybe<number>> &
  Record<"loading", boolean> &
  Record<"error", string>;

export type AdvancedFiltersState<M = unknown> = Maybe<FieldQuery<M>[]>;

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