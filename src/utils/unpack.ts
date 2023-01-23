import { ChangeEvent } from 'react';

type E = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
export const unpackE = (e: E): string => {
  return e.target.value;
};

export const onChange = (handler: (v: string) => void) => (e: E) =>
  handler(unpackE(e));
