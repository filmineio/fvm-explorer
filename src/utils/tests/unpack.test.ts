import { onChange, unpackE } from '../unpack';
import { ChangeEvent } from 'react';

describe('unpackE', () => {
  test('returns the value from a ChangeEvent', () => {
    const e = {
      target: {
        value: 'React',
      },
    } as ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >;

    expect(unpackE(e)).toBe('React');
  });
});

describe('onChange', () => {
  test('returns a function', () => {
    const handler = (v: string) => {};
    expect(onChange(handler)).toBeInstanceOf(Function);
  });

  test('returns a function that calls the provided handler', () => {
    const mockHandler = jest.fn();
    const e = {
      target: {
        value: 'React',
      },
    } as ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >;

    const handler = onChange(mockHandler);
    handler(e);

    expect(mockHandler).toBeCalledWith('React');
  });
});
