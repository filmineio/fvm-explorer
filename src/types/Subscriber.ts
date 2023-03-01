import { EventHandler } from "@/types/EventHandler";
import { Topic } from "src/temp/types/Topic";

export type Subscriber<T> = {
  topic: Topic<T>;
  handler: EventHandler<T>;
};
