import { ContractTransaction } from "./ContractTransaction";
import { ContractType } from "@/enums/ContractType";

import { ApiCtx } from "@/api/ctx/apiCtx";

export type Contract = Record<
  | "cid"
  | "contract_id"
  | "contract_address"
  | "contract_actor_address"
  | "owner_id"
  | "owner_address"
  | "compiler"
  | "eth_address"
  | "bytecode",
  string | undefined
> &
  Record<"contract_type", ContractType>;

export namespace Contract {
  export const resolveEFVM = async (
    ctx: ApiCtx,
    contractTx: ContractTransaction
  ): Promise<ContractTransaction> => {
    return contractTx;
  };

  export const resolveFVM = async (
    ctx: ApiCtx,
    contractTx: ContractTransaction
  ): Promise<ContractTransaction> => {
    return contractTx;
  };
}
