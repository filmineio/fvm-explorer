export const parse = <T>(value: string | undefined, def: T): T => {
  if (!value) return def;
  try {
    return JSON.parse(value) as T;
  } catch (e) {
    return def;
  }
};
