import { Contract } from "@/types/data/Contract";

export type Project = Record<"name" | "id", string> &
  Record<"contracts", Contract[]>;