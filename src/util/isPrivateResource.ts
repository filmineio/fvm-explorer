import { Entity } from "@/enums/Entity";

export const isPrivateResource = (en: Entity) => {
  return [Entity.UserMeta, Entity.ContractMeta].includes(en);
};