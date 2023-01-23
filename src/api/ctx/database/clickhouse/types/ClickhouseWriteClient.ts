import { ClickhouseClient } from "@/api/ctx/database/clickhouse/types/clickhouseClient";
import { Create } from "@/api/ctx/database/clickhouse/types/create";
import { Update } from "@/api/ctx/database/clickhouse/types/update";

export type ClickhouseWriteClient = {
  create: Create;
  update: Update;
} & ClickhouseClient;