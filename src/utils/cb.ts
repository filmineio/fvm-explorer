export const cb = <T extends any[], V>(fn: (...args: T) => V, ...args: T): (() => V) => {
  return () => fn(...args);
};
