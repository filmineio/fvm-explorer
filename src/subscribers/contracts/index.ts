import { Network } from "@/enums/Network";
import { contractChm } from "@/schema/entities/contract.chm";
import { KafkaEventMap } from "@/subscribers/eventMaps";
import { newSubscriber } from "@/subscribers/index";

import { EventHandler } from "@/types/EventHandler";
import { Contract } from "@/types/chain/Contract";
import { ContractTransaction } from "@/types/chain/ContractTransaction";

import { ApiCtx } from "@/api/ctx/apiCtx";

const newContractHandler =
  (ctx: ApiCtx) =>
  async (contractTx: ContractTransaction, network: Network) => {
    try {
      if (!contractTx.MessageRctReturn) {
        return;
      }

      const contract = await Contract.resolveContract(ctx, network, contractTx);

      await ctx.database.ch.data.chain[network].create(
        contractChm,
        {
          cid: contract.Cid,
          contractAddress: contract.ContractAddress,
          contractId: contract.ContractId,
          contractActorAddress: contract.ContractActorAddress,
          contractType: contract.ContractType,
          ethAddress: contract.EthAddress,
          ownerId: contract.OwnerId,
          ownerAddress: contract.OwnerAddress,
          bytecode: contract.Bytecode,
          compiler: contract.Compiler,
        },
        ["contractId", contract.ContractId as string]
      );
    } catch (e) {
      // TODO: Add proper logger
      console.error(e);
    }
  };

export const newContractKafkaSubscriber = (ctx: ApiCtx) =>
  newSubscriber<KafkaEventMap>(
    "new_contract",
    newContractHandler(ctx) as EventHandler<KafkaEventMap>
  );
