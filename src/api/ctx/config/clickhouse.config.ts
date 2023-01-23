import { Network } from "@/enums/Network";

export type ClickhouseConfig = {
  host: string;
  username: string;
  database: string;
  password: string;
};

const clickhouseWallabyConfig: ClickhouseConfig = {
  host: process.env.WALLABY_CLICKHOUSE_HOST as string,
  username: process.env.WALLABY_CLICKHOUSE_USER as string,
  password: process.env.WALLABY_CLICKHOUSE_PASSWORD as string,
  database: process.env.WALLABY_CLICKHOUSE_DATABASE as string,
};

const clickhouseHyperspaceConfig: ClickhouseConfig = {
  host: process.env.HYPERSPACE_CLICKHOUSE_HOST as string,
  username: process.env.HYPERSPACE_CLICKHOUSE_USER as string,
  password: process.env.HYPERSPACE_CLICKHOUSE_PASSWORD as string,
  database: process.env.HYPERSPACE_CLICKHOUSE_DATABASE as string,
};

const userdataConfig: ClickhouseConfig = {
  host: process.env.USERDATA_CLICKHOUSE_HOST as string,
  username: process.env.USERDATA_CLICKHOUSE_USER as string,
  password: process.env.USERDATA_CLICKHOUSE_PASSWORD as string,
  database: process.env.USERDATA_CLICKHOUSE_DATABASE as string,
};

export default {
  [Network.Wallaby]: clickhouseWallabyConfig,
  [Network.HyperSpace]: clickhouseHyperspaceConfig,
  userdata: userdataConfig,
};