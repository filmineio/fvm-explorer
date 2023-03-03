import { EventHandler } from "@/types/EventHandler";
import { SubscriptionTopic } from "@/types/SubscriptionTopic";

export type Subscriber<T> = {
  topic: SubscriptionTopic<T>;
  handler: EventHandler<T>;
};
