import { EventMap } from "@/types/EventMap";
import { ContractTransaction } from "@/types/chain/ContractTransaction";

export interface KafkaEventMap extends EventMap {
  new_contract: ContractTransaction;
}
