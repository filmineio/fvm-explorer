import { Entity } from "@/enums/Entity";
import { CHModel } from "@/schema/types/CHModel";

import { Event } from "@/types/data/Event";

export const eventChm: CHModel<Event> = {
  kind: Entity.Event,
  table: "events",
  emitter: { kind: "number" },
  entries: { kind: "string" },
  eventsRoot: { kind: "string" },
  messageCid: { kind: "string" },
  order: { kind: "number" },
};