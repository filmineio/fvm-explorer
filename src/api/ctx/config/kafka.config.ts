import { KafkaConfig, logLevel } from "kafkajs";

const kafkaConfig: (env?: typeof process.env) => KafkaConfig = (
  env = process.env
) => ({
  clientId: "fvm-explorer",
  brokers: [env.KAFKA_CONNECTION_STRING as string],
  logLevel: logLevel.INFO,
});

export default (env = process.env) => kafkaConfig(env);
