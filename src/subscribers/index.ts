import { KafkaEventMap } from "@/subscribers/eventMaps";

import { EventHandler } from "@/types/EventHandler";
import { EventMap } from "@/types/EventMap";
import { Subscriber } from "@/types/Subscriber";
import { SubscriptionTopic } from "@/types/SubscriptionTopic";
import { Contract } from "@/types/chain/Contract";
import { ContractTransaction } from "@/types/chain/ContractTransaction";

import { ApiCtx } from "@/api/ctx/apiCtx";
import { Network } from "@/enums/Network";

export const newSubscriber = <T extends EventMap>(
  topic: SubscriptionTopic<T>,
  handler: EventHandler<T>
): Subscriber<T> => ({
  topic,
  handler,
});

const newContractHandler =
  (ctx: ApiCtx) => async (contractTx: ContractTransaction, network: Network) => {
    try {
      if (!contractTx.message_rct_return) {
        return;
      }

      const contract = Contract.resolveContract(ctx, contractTx);


      // ctx.database.ch.data.chain[network].create()

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
