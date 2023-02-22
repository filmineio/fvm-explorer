import { ProjectContract } from "@/types/data/ProjectContract";

export type Project = Record<"name" | "id" | "owner", string> &
  Record<"contracts", ProjectContract[]>;
