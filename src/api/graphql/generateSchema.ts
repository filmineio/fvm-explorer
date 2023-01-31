import * as models from "@/schema/entities/index";
import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

import { boolQueryInput } from "@/api/graphql/boolQueryInput";
import { numberQueryInput } from "@/api/graphql/numberQueryInput";
import {
  generatedEnums,
  generatedInputEnums,
  inT,
  outT,
  processModelInT,
  processModelOutT,
} from "@/api/graphql/processModelSchema";
import { resolveAll } from "@/api/graphql/resolveAll";
import { stringQueryInput } from "@/api/graphql/stringQueryInput";

import { isPrivateResource } from "@/utils/isPrivateResource";

export const schemaAutoGenTypes: (GraphQLEnumType | GraphQLInputObjectType)[] =
  [
    ...Object.values(generatedEnums),
    ...Object.values(generatedInputEnums),
    boolQueryInput,
    stringQueryInput,
    numberQueryInput,
  ];

export const schemaObjectTypes = [
  ...Object.values(models).map(processModelOutT),
  ...Object.values(models).map(processModelInT),
];

const ResultLimitsInput = new GraphQLInputObjectType({
  name: "resultLimits",
  description: "Pagination (limit/offset)",
  fields: () => ({
    limit: {
      type: GraphQLInt,
      defaultValue: 50,
    },
    offset: {
      type: GraphQLInt,
      defaultValue: 0,
    },
  }),
});

const ResultOrderInput = new GraphQLInputObjectType({
  name: "resultsOrder",
  description: "Order (orderBy/orderDirection)",
  fields: () => ({
    orderBy: {
      type: new GraphQLNonNull(GraphQLString),
    },
    orderDirection: {
      type: GraphQLString,
      defaultValue: "ASC",
    },
  }),
});

const schemaQueries = Object.values(models).reduce((p, c) => {
  if (isPrivateResource(c.kind)) return p;

  return Object.assign(p, {
    [c.kind]: {
      description: `Query ${c.kind}`,
      type: new GraphQLList(outT[c.kind] as any),
      args: {
        query: {
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(inT[c.kind] as any))
          ),
        },
        network: {
          type: new GraphQLNonNull(GraphQLString),
        },
        pagination: {
          type: ResultLimitsInput,
        },
        order: {
          type: new GraphQLNonNull(ResultOrderInput),
        },
      },
      resolve: resolveAll,
    },
  });
}, {});

export const querySchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => schemaQueries,
  }),
});