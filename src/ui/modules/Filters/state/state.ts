import { defaultNetwork } from "../../../../filters/defaultNetwork";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";

import { FilterState } from "@/ui/state/types/AppState";

import { capitalize } from "@/utils/capitalize";

export const defaultFiltersState: FilterState = {
  advancedFilter: null,
  filterValue: "",
  filteredBy: Entity.Contract,
  network: defaultNetwork(),
  page: 1,
};

export const getFilterLabel = (value: Entity) => {
  return `${capitalize(value)}s`;
};

export const AVAILABLE_FILTERS = [
  Entity.Contract,
  Entity.Block,
  Entity.Transaction,
];

export const AVAILABLE_NETWORKS = [Network.HyperSpace];

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