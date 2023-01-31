import { GraphQLInputObjectType } from "graphql";

import { getFieldQuery } from "@/api/graphql/processModelSchema";

export const boolQueryInput = new GraphQLInputObjectType({
  name: "boolQueryInput",
  fields: () => getFieldQuery({ kind: "bool" }) as any,
});