import { Network } from "@/enums/Network";
import { KafkaConfig, logLevel } from "kafkajs";

const kafkaHyperspaceConfig: (env?: typeof process.env) => KafkaConfig = (
  env = process.env
) => ({
  clientId: env.KAFKA_CLIENT_ID as string,
  brokers: [env.KAFKA_CONNECTION_STRING as string],
  logLevel: logLevel.INFO,
});

export default (env = process.env) => ({
  [Network.HyperSpace]: kafkaHyperspaceConfig(env),
  [Network.Wallaby]: undefined,
});
