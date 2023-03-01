import { Subscriber } from "src/temp/types/Subscriber";
import { Topic } from "src/temp/types/Topic";

export type Subscribers<T> = {
  [key in Topic<T>]: Subscriber<T>[];
};
