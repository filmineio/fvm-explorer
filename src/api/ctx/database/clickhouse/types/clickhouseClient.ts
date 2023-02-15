import { QuerySchema } from "@/schema/types/QuerySchema";
import { ResultSet } from "@clickhouse/client";

export type ClickhouseClient = {
  query: <T>(schema: QuerySchema) => Promise<(T & Record<"total", number>)[]>;
  raw: (query: string) => Promise<ResultSet>;
};
