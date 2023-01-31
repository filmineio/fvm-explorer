import { GraphQLInputObjectType } from "graphql";

import { getFieldQuery } from "@/api/graphql/processModelSchema";

export const stringQueryInput = new GraphQLInputObjectType({
  name: "stringQueryInput",
  fields: () => getFieldQuery({ kind: "string" }) as any,
});