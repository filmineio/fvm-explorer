import { ContractTransaction } from "./ContractTransaction";
import { ContractType } from "@/enums/ContractType";
import { Network } from "@/enums/Network";
import { Actor } from "@filecoin-shipyard/lotus-client-rpc";
import { newIDAddress } from "@glif/filecoin-address";
import { decode } from "cbor";

import { ApiCtx } from "@/api/ctx/apiCtx";

export type Contract = Record<
  | "Cid"
  | "ContractId"
  | "ContractAddress"
  | "ContractActorAddress"
  | "OwnerId"
  | "OwnerAddress"
  | "Compiler"
  | "EthAddress"
  | "Bytecode",
  string | undefined
> &
  Record<"ContractType", ContractType>;

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
    network: Network,
    contractTx: ContractTransaction
  ): Promise<Contract> => {
    switch (contractTx.ContractType as ContractType) {
      case ContractType.FEVM:
        return resolveEFVMContract(ctx, network, contractTx);
      case ContractType.WASM:
        return resolveFVMContract(ctx, network, contractTx);
      default:
        throw new Error("Unknown contract type");
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
    network: Network,
    contractTx: ContractTransaction
  ): Promise<Contract> => {
    const contractReciept = decode(
      Buffer.from(contractTx.MessageRctReturn as string, "base64")
    );
    const contractActorId = newIDAddress(contractReciept[0]).toString();
    const contractActorAddress = newIDAddress(contractReciept[1]).toString();
    const contractActorEthAddress = `0x${contractReciept[2].toString("hex")}`;
    const actor = (await ctx.lotus[network].stateGetActor(
      contractActorId,
      []
    )) as Actor & { Address: string };

    return {
      Cid: contractTx.Cid,
      Compiler: "unknown",
      ContractType: ContractType.FEVM,
      OwnerId: contractTx.From,
      OwnerAddress: contractTx.RobustFrom,
      Bytecode: contractTx.Params,
      ContractId: contractActorId,
      ContractAddress: actor.Address,
      ContractActorAddress: contractActorAddress,
      EthAddress: contractActorEthAddress,
    } as Contract;
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
    network: Network,
    contractTx: ContractTransaction
  ): Promise<Contract> => {
    throw new Error("Not implemented");
  };
}
