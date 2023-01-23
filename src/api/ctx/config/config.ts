import clickhouseConfig, { ClickhouseConfig } from "./clickhouse.config";

import authConfig, { AuthConfig } from "@/api/ctx/config/auth.config";


export type APIConfig = {
  clickhouse: {
    wallaby: ClickhouseConfig;
    hyperspace: ClickhouseConfig;
  };
  auth: AuthConfig;
};

export const apiConfig: APIConfig = {
  clickhouse: clickhouseConfig,
  auth: authConfig,
};