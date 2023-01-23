const PRIVATE_KEYS = ["kind", "table"];
export const isModelFieldExposed = <T>(k: keyof T) =>
  !PRIVATE_KEYS.includes(k as string);
