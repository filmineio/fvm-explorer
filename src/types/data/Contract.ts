export type Contract = Record<
  | "contractAddress"
  | "contractId"
  | "contractActorAddress"
  | "ethAddress"
  | "ownerAddress"
  | "ownerId",
  string
> &
  Partial<Record<"okTransactionCount" | "revertedTransactionCount", number>> &
  Partial<Record<"verified", boolean>>;
