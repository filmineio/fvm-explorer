import { Network } from "@/enums/Network";

export type EventHandler<T> = (
  message: T[keyof T],
  network: Network,
  topic?: string,
  partition?: number
) => Promise<void>;
