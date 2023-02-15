import { createClient } from "@clickhouse/client";

import { ClickhouseConfig } from "@/api/ctx/config/clickhouse.config";
import {
  create,
  update,
} from "@/api/ctx/database/clickhouse/client/helpers/methods";
import { ClickhouseWriteClient } from "@/api/ctx/database/clickhouse/types/ClickhouseWriteClient";
import { ClickhouseClient } from "@/api/ctx/database/clickhouse/types/clickhouseClient";
import { queryRunner } from "@/api/ctx/database/clickhouse/utils/queryRunner";

export const getReadClient = (config: ClickhouseConfig): ClickhouseClient => {
  const client = createClient({
    host: config.host,
    username: config.username,
    password: config.password,
    database: config.database,
  });

  return {
    raw: (query: string) => client.query({ query }),
    query: queryRunner(client),
  };
};

export const getWriteClient = (
  config: ClickhouseConfig
): ClickhouseWriteClient => {
  const client = createClient({
    host: config.host,
    username: config.username,
    password: config.password,
    database: config.database,
  });

  const extendedClient: ClickhouseWriteClient = {
    raw: (query: string) => client.query({ query }),
    query: queryRunner(client),
    insert: (p) => client.insert(p),
  } as ClickhouseWriteClient;

  console.log("extendedClient", extendedClient.insert);

  extendedClient.create = create(extendedClient);
  extendedClient.update = update(extendedClient);

  return extendedClient;
};
