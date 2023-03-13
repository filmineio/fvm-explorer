import { Network } from "@/enums/Network";
import { Kafka as KafkaClient } from "kafkajs";
import { APIConfig } from "../config/config";

export type Kafka = {
  [Network.HyperSpace]: KafkaClient;
  [Network.Mainnet]: KafkaClient;
};

export const initKafka = (config: APIConfig["kafka"]): Kafka => ({
  [Network.Mainnet]: new KafkaClient(config.mainnet),
  [Network.HyperSpace]: new KafkaClient(config.hyperspace),
});
