import { CHMFieldQuery } from "@/schema/types/CHMQuery";

import {
  BlockQueryFields,
  ContractQueryField,
  TransactionQueryFields,
} from "@/ui/modules/Filters/state/state";

import { FilterState, QueryField } from "@/ui/state/types/AppState";

import { FieldQuery } from "@/types/FieldQuery";
import { Maybe } from "@/types/Maybe";


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