import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { MagicUserMetadata } from "magic-sdk";

import { DataResult } from "@/types/DataResult";
import { Maybe } from "@/types/Maybe";

export type User = Maybe<MagicUserMetadata>;

export type Data = Record<"results", DataResult> &
  Record<"receivedServerData", Maybe<number>> &
  Record<"loading", boolean> &
  Record<"error", string>;

export type FilterState = {
  filteredBy: Entity;
  filterValue: string;
  advancedFilter: Maybe<Record<string, CHMFieldQuery>>;
  network: Network;
  page: number;
};

export type AppState = {
  user: User;
  data: Data;
  filters: FilterState;
};