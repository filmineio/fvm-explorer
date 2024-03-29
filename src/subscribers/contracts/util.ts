import { ContractType } from "@/enums/ContractType";
import { Network } from "@/enums/Network";
import { Actor } from "@filecoin-shipyard/lotus-client-rpc";
import { CoinType, newIDAddress } from "@glif/filecoin-address";
import { decode } from "cbor";

import { Contract } from "@/types/chain/Contract";
import { ContractTransaction } from "@/types/chain/ContractTransaction";

import { ApiCtx } from "@/api/ctx/apiCtx";

import { getNetworkPrefix } from "@/utils/getAddressNetworkPrefix";
import { setAddressNetworkPrefix } from "@/utils/setAddressNetworkPrefix";

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
  const networkPrefix = getNetworkPrefix(network) as CoinType;
  const contractReciept = decode(
    Buffer.from(contractTx.MessageRctReturn as string, "base64")
  );
  const contractActorId = newIDAddress(
    contractReciept[0],
    networkPrefix
  ).toString();
  console.log("contractActorId", contractActorId);
  const contractActorAddress = newIDAddress(
    contractReciept[1],
    networkPrefix
  ).toString();
  console.log("contractActorAddress", contractActorAddress);
  const contractActorEthAddress = `0x${contractReciept[2].toString("hex")}`;
  console.log("contractActorEthAddress", contractActorEthAddress);

  const actor = (await ctx.lotus[network].stateGetActor(
    contractActorId,
    []
  )) as Actor & { Address: string };

  const actorAddress = setAddressNetworkPrefix(actor.Address, networkPrefix);

  return {
    Cid: contractTx.Cid,
    Compiler: "unknown",
    ContractType: ContractType.FEVM,
    OwnerId: contractTx.From,
    OwnerAddress: contractTx.RobustFrom,
    Bytecode: contractTx.Params,
    ContractId: contractActorId,
    ContractAddress: actorAddress,
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
