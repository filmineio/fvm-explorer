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
  /**
   *
   * Resolves the contract information from the contract transaction
   *
   * @param ctx
   * @param contractTx
   * @returns
   */
  export const resolveContract = async (
    ctx: ApiCtx,
    contractTx: ContractTransaction
  ): Promise<ContractTransaction> => {
    switch (contractTx.contract_type) {
      case ContractType.FEVM:
        return resolveEFVMContract(ctx, contractTx);
      case ContractType.WASM:
        return resolveFVMContract(ctx, contractTx);
      default:
        throw new Error("Contract type not supported");
    }
  };

  /**
   *
   * Resolves the EFVM contract information from the contract transaction
   *
   * @param ctx
   * @param contractTx
   * @returns
   */
  export const resolveEFVMContract = async (
    ctx: ApiCtx,
    contractTx: ContractTransaction
  ): Promise<ContractTransaction> => {
    return contractTx;
  };

  /**
   *
   * Resolves the FVM contract information from the contract transaction
   *
   * @param ctx
   * @param contractTx
   * @returns
   */
  export const resolveFVMContract = async (
    ctx: ApiCtx,
    contractTx: ContractTransaction
  ): Promise<ContractTransaction> => {
    return contractTx;
  };
}
