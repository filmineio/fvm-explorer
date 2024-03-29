import { Network } from "@/enums/Network";

export type ClickhouseConfig = {
  host: string;
  username: string;
  database: string;
  password: string;
};

const clickhouseMainnetConfig: (
  env?: typeof process.env
) => ClickhouseConfig = (env = process.env) => ({
  host: env.MAINNET_CLICKHOUSE_HOST as string,
  username: env.MAINNET_CLICKHOUSE_USER as string,
  password: env.MAINNET_CLICKHOUSE_PASSWORD as string,
  database: env.MAINNET_CLICKHOUSE_DATABASE as string,
});

const clickhouseHyperspaceConfig: (
  env?: typeof process.env
) => ClickhouseConfig = (env = process.env) => ({
  host: env.HYPERSPACE_CLICKHOUSE_HOST as string,
  username: env.HYPERSPACE_CLICKHOUSE_USER as string,
  password: env.HYPERSPACE_CLICKHOUSE_PASSWORD as string,
  database: env.HYPERSPACE_CLICKHOUSE_DATABASE as string,
});

const userdataConfig: (env?: typeof process.env) => ClickhouseConfig = (
  env = process.env
) => ({
  host: env.USERDATA_CLICKHOUSE_HOST as string,
  username: env.USERDATA_CLICKHOUSE_USER as string,
  password: env.USERDATA_CLICKHOUSE_PASSWORD as string,
  database: env.USERDATA_CLICKHOUSE_DATABASE as string,
});

export default (env = process.env) => ({
  [Network.Mainnet]: clickhouseMainnetConfig(env),
  [Network.HyperSpace]: clickhouseHyperspaceConfig(env),
  userdata: userdataConfig(env),
});