import { InsertParams } from "@clickhouse/client/dist/client";

import { ClickhouseClient } from "@/api/ctx/database/clickhouse/types/clickhouseClient";
import { Create } from "@/api/ctx/database/clickhouse/types/create";
import { Update } from "@/api/ctx/database/clickhouse/types/update";

export type ClickhouseWriteClient = {
  create: Create;
  update: Update;
  insert: <T>(params: InsertParams<T>) => Promise<void>;
} & ClickhouseClient;
