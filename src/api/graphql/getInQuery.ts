import { CHMField } from "@/schema/types/CHMField";
import { CHMBaseOperator } from "@/schema/types/CHMFiledOperator";
import { CHMInQuery } from "@/schema/types/CHMQuery";
import { GraphQLList } from "graphql";

import { processField } from "@/api/graphql/processModelSchema";

export function getInQuery(f: CHMField): CHMInQuery {
  return {
    [CHMBaseOperator.In]: {
      type: new GraphQLList(processField(f)),
    },
    [CHMBaseOperator.NotIn]: {
      type: new GraphQLList(processField(f)),
    },
  };
}