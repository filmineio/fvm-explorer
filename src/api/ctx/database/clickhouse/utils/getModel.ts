import { Entity } from "@/enums/Entity";
import * as models from "@/schema/entities/index";
import { CHModel } from "@/schema/types/CHModel";

export const getModel = <T>(kind: Entity): CHModel<T> => {
  const model = (models as Record<Entity, CHModel<T>>)[kind];
  if (!model) throw "INVALID_MODEL";
  return model;
};