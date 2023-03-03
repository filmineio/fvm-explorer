import { KafkaEventMap } from "@/subscribers/eventMaps";

import { EventHandler } from "@/types/EventHandler";
import { EventMap } from "@/types/EventMap";
import { Subscriber } from "@/types/Subscriber";
import { SubscriptionTopic } from "@/types/SubscriptionTopic";
import { Contract } from "@/types/chain/Contract";
import { ContractTransaction } from "@/types/chain/ContractTransaction";

import { ApiCtx } from "@/api/ctx/apiCtx";

export const newSubscriber = <T extends EventMap>(
  topic: SubscriptionTopic<T>,
  handler: EventHandler<T>
): Subscriber<T> => ({
  topic,
  handler,
});

const newContractHandler =
  (ctx: ApiCtx) => async (contractTx: ContractTransaction) => {
    console.log("New contract: ", contractTx);

    if (!contractTx.message_rct_return) {
      return;
    }

    Contract.resolveEFVM(ctx, contractTx);
  };

export const newContractKafkaSubscriber = (ctx: ApiCtx) =>
  newSubscriber<KafkaEventMap>(
    "new_contract",
    newContractHandler(ctx) as EventHandler<KafkaEventMap>
  );
