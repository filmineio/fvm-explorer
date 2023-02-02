import { Entity } from "@/enums/Entity";
import { CHMFiledOperator } from "@/schema/types/CHMFiledOperator";
import { getAllowedOperators } from "@/schema/validation/getAllowedOperators";

import {
  BlockQueryFields,
  ContractQueryField,
  TransactionQueryFields,
} from "@/ui/modules/Filters/state/state";

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