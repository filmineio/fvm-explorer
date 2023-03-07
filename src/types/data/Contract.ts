export type Contract = Record<
  | "cid"
  | "contractAddress"
  | "contractId"
  | "contractActorAddress"
  | "contractType"
  | "ethAddress"
  | "ownerAddress"
  | "ownerId"
  | "bytecode"
  | "compiler",
  string
> &
  Partial<Record<"okTransactionCount" | "revertedTransactionCount", number>> &
  Partial<Record<"verified", boolean>>;
