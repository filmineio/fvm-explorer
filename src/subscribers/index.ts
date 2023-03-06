import { Network } from "@/enums/Network";
import { contractChm } from "@/schema/entities/contract.chm";
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


