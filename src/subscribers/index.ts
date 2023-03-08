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
