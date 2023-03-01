import { KafkaEventMap } from "@/subscribers/eventMaps";

import { EventHandler } from "@/types/EventHandler";
import { EventMap } from "@/types/EventMap";
import { Subscriber } from "@/types/Subscriber";
import { SubscriptionTopic } from "@/types/SubscriptionTopic";

export const newSubscriber = <T extends EventMap>(
  topic: SubscriptionTopic<T>,
  handler: EventHandler<T>
): Subscriber<T> => ({
  topic,
  handler,
});

const newContractHandler = async (message: {}) => {
  console.log("New contract: ", message);
};

export const newContractKafkaSubscriber = newSubscriber<KafkaEventMap>(
  "new_contract",
  newContractHandler as EventHandler<KafkaEventMap>
);
