export type EventHandler<T> = (
  message: T[keyof T],
  topic?: string,
  partition?: number
) => Promise<void>;
