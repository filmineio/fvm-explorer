import { Subscriber } from "@/types/Subscriber";
import { SubscriptionTopic } from "@/types/SubscriptionTopic";

export type Subscribers<T> = {
  [key in SubscriptionTopic<T>]: Subscriber<T>[];
};
