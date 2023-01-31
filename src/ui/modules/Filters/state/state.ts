import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { CHMFiledOperator } from "@/schema/types/CHMFiledOperator";
import { getAllowedOperators } from "@/schema/validation/getAllowedOperators";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";

import { FilterState } from "@/ui/state/types/AppState";

import { capitalize } from "@/utils/capitalize";
import { isEnum } from "@/utils/isEnum";

export const defaultFiltersState: FilterState = {
  advancedFilter: null,
  filterValue: "",
  filteredBy: Entity.Contract,
  network: Network.Wallaby,
  page: 1,
};

export const getInitialFilterState = (
  query: NextParsedUrlQuery
): FilterState => {
  if (isEnum(Entity, query.filteredBy)) {
    return {
      ...defaultFiltersState,
      filterValue: query.filterValue || "",
      filteredBy: query.filteredBy,
      network: query.network || Network.Wallaby,
    } as FilterState;
  }

  return defaultFiltersState;
};

export const getFilterLabel = (value: Entity) => {
  return `${capitalize(value)}s`;
};

export const AVAILABLE_FILTERS = [
  Entity.Project,
  Entity.Contract,
  Entity.Block,
  Entity.Transaction,
];

export const AVAILABLE_NETWORKS = [Network.Wallaby, Network.HyperSpace];

export const availableFilters = AVAILABLE_FILTERS.map((value) => ({
  value,
  label: getFilterLabel(value),
}));
export const availableNetworks = AVAILABLE_NETWORKS.map((value) => ({
  value,
  label: capitalize(value),
}));

export enum ContractQueryField {
  ContractAddress = "Contract Address",
  ContractF4Address = "Contract f4 Address",
  ContractEthAddress = "Contract ETH Address",
  ContractActorId = "Contract ActorId",
  ContractDeployedFromAddress = "Contract Deployed From Address",
}

export enum BlockQueryFields {
  Height = "Height",
  BlockCid = "BlockCid",
  Miner = "Miner",
}

export enum TransactionQueryFields {
  Block = "Block",
  Cid = "Cid",
  From = "From",
  Height = "Height",
  MessageRctEventsRoot = "Receipt Events Root",
  MessageRctExitCode = "Receipt Exit Code",
  MessageRctGasUsed = "Receipt Gas Used",
  MessageRctReturn = "Receipt Return",
  Method = "Method",
  Nonce = "Nonce",
  To = "To",
  SubCallOf = "Sub Call Of",
  Timestamp = "Timestamp",
  Value = "Value",
  Version = "Version",
}

export const getModelQueryFields = (kind: Entity) => {
  switch (kind) {
    case Entity.Block:
      return Object.values(BlockQueryFields);
    case Entity.Contract:
      return Object.values(ContractQueryField);
    case Entity.Transaction:
      return Object.values(TransactionQueryFields);
    default:
      return [];
  }
};

export const getQueryFieldOperators = ([entity, field]:
  | [Entity.Block, BlockQueryFields]
  | [Entity.Contract, ContractQueryField]
  | [Entity.Transaction, TransactionQueryFields]): CHMFiledOperator[] => {
  switch (entity) {
    case Entity.Block:
      switch (field) {
        case BlockQueryFields.Height:
          return getAllowedOperators("number");
        default:
          return getAllowedOperators("string");
      }
    case Entity.Contract:
      return getAllowedOperators("string");
    case Entity.Transaction:
      switch (field) {
        case TransactionQueryFields.Height:
        case TransactionQueryFields.MessageRctGasUsed:
        case TransactionQueryFields.MessageRctExitCode:
        case TransactionQueryFields.Version:
        case TransactionQueryFields.Method:
        case TransactionQueryFields.Nonce:
          return getAllowedOperators("number");
        default:
          return getAllowedOperators("string");
      }
  }
  return [];
};