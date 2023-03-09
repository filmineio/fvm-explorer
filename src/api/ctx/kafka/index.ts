import { Network } from "@/enums/Network";
import { Kafka as KafkaClient } from "kafkajs";
import { APIConfig } from "../config/config";

export type Kafka = {
  [Network.HyperSpace]: KafkaClient;
  [Network.Wallaby]?: KafkaClient;
};

export const initKafka = (config: APIConfig["kafka"]): Kafka => ({
  [Network.HyperSpace]: new KafkaClient(config.hyperspace),
});
