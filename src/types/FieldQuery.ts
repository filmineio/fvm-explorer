import { CHMFieldQuery } from "@/schema/types/CHMQuery";

export type FieldQuery<M = unknown> = Record<keyof M, CHMFieldQuery>;