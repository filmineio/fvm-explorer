import { CHMFiledOperator } from "@/schema/types/CHMFiledOperator";

import { mapOperatorToSQL } from "@/api/ctx/database/clickhouse/utils/mapOperatorToSQL";

import { capitalize } from "@/utils/capitalize";

export const queryToSQL = (
  queries: {
    root: string;
    query: Record<string, Record<string, CHMFiledOperator>>;
  }[]
): string => {
  const filters = queries.map(({ root, query }) => {
    const filterString = Object.entries(query)
      .map(([field, filter]) => {
        return `${capitalize(field)} ${mapOperatorToSQL(filter)}`;
      })
      .join(" and ");

    return `(${filterString})`;
  });

  return filters.join(" or ");
};