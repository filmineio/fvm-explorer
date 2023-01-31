import { CHMStringOperator } from "@/schema/types/CHMFiledOperator";
import { GraphQLString } from "graphql";

import { transformE } from "@/api/graphql/transformEnum";

export function getStringQuery() {
  return Object.values(transformE(CHMStringOperator)).reduce(
    (p: any, c: any) =>
      Object.assign(p, {
        [c.value]: {
          type: GraphQLString,
        },
      }),
    {}
  ) as Object;
}