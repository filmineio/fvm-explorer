import clickhouseConfig, { ClickhouseConfig } from "./clickhouse.config";

import authConfig, { AuthConfig } from "@/api/ctx/config/auth.config";
import lotusConfig, { LotusConfig } from "@/api/ctx/config/lotus.config";
import web3StorageConfig, {
  Web3StorageConfig,
} from "@/api/ctx/config/web3.config";

export type APIConfig = {
  clickhouse: {
    wallaby: ClickhouseConfig;
    hyperspace: ClickhouseConfig;
    userdata: ClickhouseConfig;
  };
  lotus: {
    wallaby: LotusConfig;
    hyperspace: LotusConfig;
  };
  auth: AuthConfig;
  web3Storage: Web3StorageConfig;
};

export const apiConfig: (env?: typeof process.env) => APIConfig = (
  env = process.env
) => ({
  clickhouse: clickhouseConfig(env),
  auth: authConfig(env),
  lotus: lotusConfig(env),
  web3Storage: web3StorageConfig(env),
});