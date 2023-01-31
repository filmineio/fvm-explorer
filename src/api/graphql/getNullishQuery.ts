import { CHMBaseOperator } from "@/schema/types/CHMFiledOperator";
import { GraphQLBoolean } from "graphql";

export function getNullishQuery() {
  return {
    [CHMBaseOperator.IsNull]: {
      type: GraphQLBoolean,
    },
  };
}