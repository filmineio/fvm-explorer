import { CHMNumberOperator } from "@/schema/types/CHMFiledOperator";
import { GraphQLFloat } from "graphql";

import { transformE } from "@/api/graphql/transformEnum";

export function getNumberQuery() {
  return Object.values(transformE(CHMNumberOperator)).reduce(
    (p: any, c: any) => {
      return Object.assign(p, {
        [c.value]: {
          type: GraphQLFloat,
        },
      });
    },
    {}
  ) as Object;
}