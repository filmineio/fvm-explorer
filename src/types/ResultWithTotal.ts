import { Network } from "@/enums/Network";

export type ResultWithTotal<T> = {
  total: number;
  rows: T[];
  network: Network;
};