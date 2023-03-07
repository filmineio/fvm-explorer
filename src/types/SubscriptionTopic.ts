import { EventMap } from "@/types/EventMap";

export type SubscriptionTopic<T extends EventMap> = keyof T;
