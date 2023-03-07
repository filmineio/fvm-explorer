import { ContractType } from "@/enums/ContractType";

export type Contract = Record<
  | "Cid"
  | "ContractId"
  | "ContractAddress"
  | "ContractActorAddress"
  | "OwnerId"
  | "OwnerAddress"
  | "Compiler"
  | "EthAddress"
  | "Bytecode",
  string | undefined
> &
  Record<"ContractType", ContractType>;
