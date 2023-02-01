import { defaultNetwork } from "../../../../filters/defaultNetwork";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { CHMFiledOperator } from "@/schema/types/CHMFiledOperator";
import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { getAllowedOperators } from "@/schema/validation/getAllowedOperators";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";

import { FilterState, QueryField } from "@/ui/state/types/AppState";

import { FieldQuery } from "@/types/FieldQuery";
import { Maybe } from "@/types/Maybe";

import { capitalize } from "@/utils/capitalize";
import { isEnum } from "@/utils/isEnum";


export const defaultFiltersState: FilterState = {
  advancedFilter: null,
  filterValue: "",
  filteredBy: Entity.Contract,
  network: defaultNetwork(),
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
      network: query.network || defaultNetwork(),
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
  ContractActorAddress = "Actor Address",
  ContractF4Address = "f4 Address",
  ContractEthAddress = "ETH Address",
  ContractActorId = "ActorId",
  ContractDeployedFromAddress = "Deployed From Address",
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

const reduceFilter = (
  p: FieldQuery | FieldQuery[],
  f: string,
  val: CHMFieldQuery
): FieldQuery | FieldQuery[] => {
  if (Array.isArray(p)) {
    return p.map((p) => ({ ...p, [f]: val }));
  }

  return { ...p, [f]: val };
};

export const mapFieldQueryToApiQuery = (
  filters: FilterState["advancedFilter"]
): Maybe<FieldQuery[]> => {
  if (!filters) return;

  return filters
    .map((v) => {
      return Object.entries(v).reduce((p, [f, val]) => {
        switch (f as QueryField) {
          case BlockQueryFields.Height:
            return reduceFilter(p, "height", val);
          case BlockQueryFields.BlockCid:
            return reduceFilter(p, "cid", val);
          case BlockQueryFields.Miner:
            return reduceFilter(p, "miner", val);
          case ContractQueryField.ContractActorAddress:
            return reduceFilter(p, "contractActorAddress", val);
          case ContractQueryField.ContractF4Address:
            return reduceFilter(p, "contractAddress", val);
          case ContractQueryField.ContractEthAddress:
            return reduceFilter(p, "ethAddress", val);
          case ContractQueryField.ContractActorId:
            return reduceFilter(p, "contractId", val);
          case ContractQueryField.ContractDeployedFromAddress:
            return ["ownerAddress", "ownerId"].map((v) =>
              reduceFilter(p, v, val)
            );
          case TransactionQueryFields.Block:
            return reduceFilter(p, "block", val);
          case TransactionQueryFields.Cid:
            return reduceFilter(p, "cid", val);
          case TransactionQueryFields.From:
            return ["from", "robustFrom"].map((v) => reduceFilter(p, v, val));
          case TransactionQueryFields.Height:
            return reduceFilter(p, "height", val);
          case TransactionQueryFields.MessageRctEventsRoot:
            return reduceFilter(p, "messageRctEventsRoot", val);
          case TransactionQueryFields.MessageRctExitCode:
            return reduceFilter(p, "messageRctExitCode", val);
          case TransactionQueryFields.MessageRctGasUsed:
            return reduceFilter(p, "messageRctGasUsed", val);
          case TransactionQueryFields.MessageRctReturn:
            return reduceFilter(p, "messageRctReturn", val);
          case TransactionQueryFields.Method:
            return reduceFilter(p, "method", val);
          case TransactionQueryFields.Nonce:
            return reduceFilter(p, "nonce", val);
          case TransactionQueryFields.To:
            return ["to", "robustTo"].map((v) => reduceFilter(p, v, val));
          case TransactionQueryFields.SubCallOf:
            return reduceFilter(p, "subCallOf", val);
          case TransactionQueryFields.Timestamp:
            return reduceFilter(p, "timestamp", val);
          case TransactionQueryFields.Value:
            return reduceFilter(p, "value", val);
          case TransactionQueryFields.Version:
            return reduceFilter(p, "version", val);
        }

        return p;
      }, {} as FieldQuery | FieldQuery[]);
    })
    .flat(2);
};