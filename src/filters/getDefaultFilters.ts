import { defaultNetwork } from "./defaultNetwork";
import { PAGE_SIZE } from "@/constants/pagination";
import { Entity } from "@/enums/Entity";
import { CHMFieldQuery } from "@/schema/types/CHMQuery";

import { ResourceQuery } from "@/types/AppQuery";

export const getDefaultQuery = (
  kind: Entity,
  searchValue?: string
):
  | Record<string, CHMFieldQuery>
  | Record<string, CHMFieldQuery>[]
  | undefined => {
  if (!searchValue) return;

  switch (kind) {
    case Entity.Transaction:
      return {
        cid: { is: searchValue },
      };
    case Entity.Block:
      return {
        cid: { is: searchValue },
      };
    case Entity.Event:
      return {
        messageCid: { is: searchValue },
      };
    case Entity.Contract:
      return [
        { contractAddress: { is: searchValue } },
        { contractId: { is: searchValue } },
        { contractActorAddress: { is: searchValue } },
        { ethAddress: { is: searchValue } },
      ];
    case Entity.Project:
      return {
        id: { is: searchValue },
      };
    case Entity.ContractMeta:
      return {
        contractAddress: { is: searchValue },
      };
  }
};
const getDefaultOrder = (kind: Entity): [string, "ASC" | "DESC"] => {
  switch (kind) {
    case Entity.Transaction:
      return ["height", "DESC"];
    case Entity.Block:
      return ["height", "DESC"];
    case Entity.Event:
      return ["order", "DESC"];
    case Entity.Contract:
      return ["contractId", "DESC"];
    case Entity.Project:
      return ["id", "DESC"];
    case Entity.ContractMeta:
      return ["contractAddress", "DESC"];
  }
};

export const getDefaultFilters = (
  kind: Entity,
  network = defaultNetwork(),
  searchValue?: string
): ResourceQuery => {
  return {
    network,
    pagination: { limit: PAGE_SIZE, offset: 0 },
    query: getDefaultQuery(kind, searchValue),
    order: getDefaultOrder(kind),
  };
};