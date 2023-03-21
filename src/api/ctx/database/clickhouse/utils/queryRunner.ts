import { QuerySchema } from "@/schema/types/QuerySchema";
import { ClickHouseClient } from "@clickhouse/client";

import { generateAlias } from "@/api/ctx/database/clickhouse/utils/alias";
import { prepareQuery } from "@/api/ctx/database/clickhouse/utils/prepareQuery";
import { traverseSelection } from "@/api/ctx/database/clickhouse/utils/traverseSelection";

export const queryRunner =
  (client: ClickHouseClient) =>
  async <T>(schema: QuerySchema): Promise<T[]> => {
    const { selection, fieldAliasMap, query } = prepareQuery(schema);

    const timeMark = generateAlias();
    console.time(`QueryId ${timeMark}`);
    try {
      // console.log(query);
      const res = await client.query({
        query: query,
      });
      const result: any = await res.json();
      console.timeEnd(`QueryId ${timeMark}`);

      return (result?.data || []).map((row: { [x: string]: any }, i: any) =>
        traverseSelection(fieldAliasMap, selection, row)
      ) as T[];
    } catch (e) {
      console.timeEnd(`QueryId ${timeMark}`);
      console.error(e);
      return [];
    }
  };