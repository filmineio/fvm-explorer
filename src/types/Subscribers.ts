import { Subscriber } from "@/types/Subscriber";
import { SubscriptionTopic } from "@/types/SubscriptionTopic";
import { EventMap } from "@/types/EventMap";

export type Subscribers<T extends EventMap> = {
  [key in SubscriptionTopic<T>]: Subscriber<T>[];
};
