import { EventHandler } from "@/types/EventHandler";
import { SubscriptionTopic } from "@/types/SubscriptionTopic";
import { EventMap } from "@/types/EventMap";

export type Subscriber<T extends EventMap> = {
  topic: SubscriptionTopic<T>;
  handler: EventHandler<T>;
};
