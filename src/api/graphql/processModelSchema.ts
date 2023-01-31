import { Entity } from "@/enums/Entity";
import { CHMField } from "@/schema/types/CHMField";
import { CHModel } from "@/schema/types/CHModel";
import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import GraphQLJSON from "graphql-type-json";

import { getInQuery } from "@/api/graphql/getInQuery";
import { getIsNotQuery } from "@/api/graphql/getIsNotQuery";
import { getNullishQuery } from "@/api/graphql/getNullishQuery";
import { getNumberQuery } from "@/api/graphql/getNumberQuery";
import { getStringQuery } from "@/api/graphql/getStringQuery";
import { mapKindToInput } from "@/api/graphql/mapKindToInput";
import { transformE } from "@/api/graphql/transformEnum";

export const generatedEnums: Record<string, GraphQLEnumType> = {};
export const generatedInputEnums: Record<string, GraphQLInputObjectType> = {};
export const outT: Partial<Record<Entity, GraphQLObjectType>> = {};
export const inT: Partial<Record<Entity, GraphQLInputObjectType>> = {};

export function getFieldQuery(f: CHMField) {
  switch (f.kind) {
    case "bool":
      return {
        ...getNullishQuery(),
        ...getIsNotQuery(f),
      };
    case "string":
      return {
        ...getStringQuery(),
        ...getNullishQuery(),
        ...getIsNotQuery(f),
        ...getInQuery(f),
      };
    case "number": {
      return {
        ...getNumberQuery(),
        ...getNullishQuery(),
        ...getIsNotQuery(f),
        ...getInQuery(f),
      };
    }

    case "enum": {
      if (generatedInputEnums[`${f.name}Input`])
        return generatedInputEnums[`${f.name}Input`];

      const fields = new GraphQLInputObjectType({
        name: `${f.name}Input`,
        fields: () =>
          ({
            ...getNullishQuery(),
            ...getIsNotQuery(f),
            ...getInQuery(f),
          } as any),
      });

      generatedInputEnums[`${f.name}Input`] = fields;
      return fields;
    }
    default:
      return null;
  }
}

export function processModelOutT(m: CHModel<unknown>): GraphQLObjectType {
  if (outT[m.kind]) return outT[m.kind] as GraphQLObjectType;

  outT[m.kind] = new GraphQLObjectType({
    name: m.kind,
    fields: () =>
      Object.entries(m).reduce(
        (prev, [k, v]) =>
          typeof v === "string"
            ? prev
            : Object.assign(prev, { [k]: { type: processField(v) } }),
        {}
      ) as any,
  });

  return outT[m.kind] as GraphQLObjectType;
}

export function processModelInT(m: CHModel<unknown>): GraphQLInputObjectType {
  if (inT[m.kind]) return inT[m.kind] as GraphQLInputObjectType;

  inT[m.kind] = new GraphQLInputObjectType({
    name: `${m.kind}Query`,
    fields: () =>
      Object.entries(m).reduce(
        (prev, [k, v]) =>
          typeof v === "string"
            ? prev
            : mapKindToInput(v)
            ? Object.assign(prev, { [k]: { type: mapKindToInput(v) } })
            : prev,
        {}
      ) as any,
  });

  return inT[m.kind] as GraphQLInputObjectType;
}

export function processField(f: CHMField) {
  switch (f.kind) {
    case "bool":
      return GraphQLBoolean;
    case "string":
      return GraphQLString;
    case "number":
      return GraphQLFloat;
    case "enum": {
      if (generatedEnums[f.name]) return generatedEnums[f.name];
      const g = new GraphQLEnumType({
        name: f.name,
        values: transformE(f.value),
      });
      generatedEnums[f.name] = g;
      return g;
    }
    case "map":
      return processModelOutT(f.value);
    default:
      return GraphQLJSON;
  }
}