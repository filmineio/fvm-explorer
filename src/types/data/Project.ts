import { Contract } from "@/types/data/Contract";

export type Project = Record<"name" | "id" | "owner", string> &
  Record<"contracts", string[]>;
