import { Network } from "@/enums/Network";
import { KafkaConfig, logLevel } from "kafkajs";

const kafkaHyperspaceConfig: (env?: typeof process.env) => KafkaConfig = (
  env = process.env
) => ({
  brokers: [env.HYPERSPACE_KAFKA_CONNECTION_STRING as string],
  logLevel: logLevel.INFO,
});


const kafkaMainnetConfig: (env?: typeof process.env) => KafkaConfig = (
  env = process.env
) => ({
  brokers: [env.MAINNET_KAFKA_CONNECTION_STRING as string],
  logLevel: logLevel.INFO,
});

export default (env = process.env) => ({
  [Network.Mainnet]: kafkaMainnetConfig(env),
  [Network.HyperSpace]: kafkaHyperspaceConfig(env),
});
