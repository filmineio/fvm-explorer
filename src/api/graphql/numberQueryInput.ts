import { GraphQLInputObjectType } from "graphql";

import { getFieldQuery } from "@/api/graphql/processModelSchema";

export const numberQueryInput = new GraphQLInputObjectType({
  name: "numberQueryInput",
  fields: () => getFieldQuery({ kind: "number" }) as any,
});