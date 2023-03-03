import { ContractType } from "@/enums/ContractType";

export type ContractTransaction = {
  cid?: string;
  height?: number;
  block?: string;
  message_rct_exit_code?: number;
  message_rct_return?: string;
  message_rct_gas_used?: number;
  sub_call_of?: string;
  from?: string;
  robust_from?: string;
  robust_to?: string;
  eth_address?: string;
  to?: string;
  value?: number;
  gas_limit?: number;
  gas_fee_cap?: string;
  gas_premium?: string;
  method?: number;
  params?: string;
  timestamp?: string;
  nonce?: number;
  contract_type: ContractType;
  version?: number;
};
