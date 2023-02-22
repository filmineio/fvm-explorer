export type Project = Record<"name" | "id" | "owner", string> &
  Record<"contracts", string[]>;
