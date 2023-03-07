import { ContractType } from "@/enums/ContractType";

export type ContractTransaction = {
  Block?: string;
  Cid?: string;
  ContractType?: ContractType;
  From?: string;
  GasFeeCap?: string;
  GasLimit?: number;
  GasPremium?: string;
  Height?: number;
  MessageRctExitCode?: number;
  MessageRctGasUsed?: number;
  MessageRctReturn?: string;
  Method?: number;
  Nonce?: number;
  NumberOfEvents?: number;
  Params?: string;
  RobustFrom?: string;
  RobustTo?: string;
  SubCallOf?: string;
  Timestamp?: string;
  To?: string;
  Value?: number;
  Version?: number;
};
