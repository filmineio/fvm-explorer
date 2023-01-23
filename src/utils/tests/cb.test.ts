import { cb } from '../cb';

describe('cb', () => {
  it('should return a function that calls the provided function with the provided arguments', () => {
    const add = (a: number, b: number) => a + b;
    const addCB = cb(add, 2, 3);
    expect(addCB()).toEqual(5);

    const toUppercase = (s: string) => s.toUpperCase();
    const toUppercaseCB = cb(toUppercase, 'hello');
    expect(toUppercaseCB()).toEqual('HELLO');

    const log = (v: string, n: number[], l: boolean) => console.log(v, n, l);
    const logCB = cb(log, 'test', [1, 2, 3], true);
    expect(logCB()).toBeUndefined();
  });

  it('should handle functions with no arguments', () => {
    const noop = () => {};
    const noopCB = cb(noop);
    expect(noopCB()).toBeUndefined();
  });

  it('should handle functions with multiple arguments', () => {
    const add = (a: number, b: number, c: number, d: number) => a + b + c + d;
    const addCB = cb(add, 1, 2, 3, 4);
    expect(addCB()).toEqual(10);
  });

  it('should handle functions with complex argument types', () => {
    const fn = (a: number[], b: { c: string; d: boolean }, e: () => string) => a.join('') + b.c + b.d + e();
    const fnCB = cb(fn, [1, 2, 3], { c: 'test', d: true }, () => 'hello');
    expect(fnCB()).toEqual('123testtruehello');
  });
});
