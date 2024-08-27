import { describe, expect, test } from 'vitest';

import { r_ } from '../async';

describe.concurrent('intoResult', () => {
  test('with promise resolving to the value', async () => {
    const [result, error] = await r_(Promise.resolve(3));

    expect(result).toBe(3);
    expect(error).toBeUndefined();
  });

  test('with error resolving to the value', async () => {
    const [result, error] = await r_(Promise.reject(new Error('error')));

    expect(result).toBeUndefined();
    expect(error).toBeInstanceOf(Error);
    expect(error).toMatchInlineSnapshot(`[Error: error]`);
  });
});
