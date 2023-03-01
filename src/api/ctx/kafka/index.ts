import { KafkaConfig } from "kafkajs";
import { Kafka } from "kafkajs";

export const initKafka = (config: KafkaConfig) => new Kafka(config);
