export const isEnum = <T, R>(e: T, value: R): boolean =>
  Object.values(e).includes(value);
